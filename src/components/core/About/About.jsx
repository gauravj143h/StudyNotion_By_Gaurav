import React from "react";
import HighlightText from "../HomePage/HighlightText";
import img1 from "../../../assets/Images/aboutus1.webp";
import img2 from "../../../assets/Images/aboutus2.webp";
import img3 from "../../../assets/Images/aboutus3.webp";
import Quote from "./Quote";
import foundingimg from "../../../assets/Images/FoundingStory.png";
import Stats from "./Stats";
import LearningGrid from "./LearningGrid";
import Form from "./Form";
import Fotter from "../../common/Footer";
import Footer from "../../common/Footer";
const About = () => {
  return (
    <div>
      <div className="mx-auto text-white">
        {/* section 1 */}
        <section>
          <div className=" text-white flex flex-col items-center justify-center p-10 text-center  bg-richblack-700 ">
            <header className="">
              <h1 className="text-[30px] font-bold">
                Driving Innovation in online Eduction for a
                <HighlightText text={"Bright Future"} />
              </h1>
              <p className="w-[55%] text-center m-auto mb-0 text-richblack-300">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses. leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </header>
            <div className="flex gap-3 relative ">
              <img src={img1} alt="" className="translate-y-20 w-[350px]" />
              <img src={img2} alt="" className="translate-y-20 w-[350px]" />
              <img src={img3} alt="" className="translate-y-20 w-[350px]" />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section>
          <div className=" text-white flex flex-col items-center justify-center m-auto p-10 text-center gap-8  relative w-[70%] text-[30px] font-bold mt-[50px]">
            <Quote />
          </div>
        </section>

        {/* section 3 */}
        <section>
          <div className="flex flex-col gap-24 text-white items-center justify-center p-10 m-[80px]">
            {/* first section */}
            <div className="flex gap-12 items-center justify-center ">
              {/* fpounding story left box */}
              <div className="w-[30%] flex flex-col text-richblack-200">
                <h1 className="text-[40px] font-bold text-pink-400 mb-5">Our Founding Story</h1>

                <p className="text-[14px] mb-6">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and Lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>

                <p className="text-[14px] mb-6">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>

              <img src={foundingimg} alt=""  className="h-[250px] ml-20 shadow-[0_4px_20px_pink]" />
            </div>

            {/* second section */}
            <div className="flex  gap-20 text-white items-center justify-center p-10 ">
              {/* first-box */}
              <div className="w-[36%] ">
                <h1 className="text-[40px] font-bold text-blue-400 mb-5">Our Vision</h1>

                <p className="text-[14px] mb-6 text-richblack-400">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.{" "}
                </p>
              </div>
              {/* second box */}
              <div className="w-[36%]">
                <h1 className="text-[40px] font-bold text-yellow-400 mb-5">Our Mission</h1>

                <p className="text-[14px] mb-6 text-richblack-400">
                  Our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, Live Isessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* section 4 */}
        <section>
          <Stats />
        </section>

        {/* section 5 */}
        <section className="mx-auto flex flex-col items-center justify-between gap-5 mb-[140px] mt-[50px] w-[85%]">
          <LearningGrid />
          <Form />
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
