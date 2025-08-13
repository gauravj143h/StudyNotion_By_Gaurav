import { toast } from "react-hot-toast";
import { studentEndpoints } from "../api";
import apiConnector from "../apiconnector";
import { resetCart } from "../../slice/cartslice";
// import rzpLogo from "../../assets/Logo/"
const { COURSE_VERIFY_API, COURSE_PAYMENT_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    console.log("Env Key Direct Access:", process.env.REACT_APP_RAZORPAY_KEY);

    const toastId = toast.loading("Loading.....");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay SDK failed to load");
            toast.dismiss(toastId);
            return;
        }

        // Create order from backend
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`,
        });

        console.log("**************Order Response******************:", orderResponse.data);

        console.log("**************Order Response******************:", orderResponse);

         console.log("**************Order Response******************:", orderResponse.data.currency);

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const orderData = orderResponse.data.message; // ✅ backend sends in "message"

//         console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY);
// console.log("Order Data:", orderResponse.data);

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, // ✅ Frontend env variable
            currency: orderData.currency,
            amount: orderData.amount,
            order_id: orderData.id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            // image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                console.log("Payment Success Response:", response);
                 dispatch(resetCart());
                sendPaymentSuccessEmail(response, orderData.amount, token);
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open(); // ✅ Open payment window
        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment Failed. Please try again.");
            console.error("Payment Failed:", response.error);
        });

    } catch (err) {
        console.log("Payment API error:", err);
        toast.error("Could not make payment");
    } finally {
        toast.dismiss(toastId);
    }
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment successful! You are added to the course.");
        navigate("/dashboard/enrolled-courses"); // ✅ Fixed typo "endrolled"
        // dispatch(resetCart());
    } catch (err) {
        console.log("Payment Verify Error:", err);
        toast.error("Could not verify payment");
    }
}
