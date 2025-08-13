import React from 'react'
import {toast} from 'react-hot-toast'
import apiConnector from '../apiconnector';
import { catalogData } from '../api';
export const PageAndComponets = async(categoryId) => {
    const toastId = toast.loading("Loading...");
    // console.log("Id is here also",categoryId)
    let result = [];
    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});

        if(!response?.data?.success)
            throw new Error("Could not featch category page data");

        result = response?.data;
    }
    catch(err){
        console.log("CATALOG PAGE DATA API ERROR...",err);
        toast.error(err.message);
        result = err.response?.data;
    }

    toast.dismiss(toastId);
    return result;
 
  
  
}

export default PageAndComponets
