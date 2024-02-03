"use client"
import {useState,useEffect} from "react"
import Script from "next/script"
import {indicateContext,pageContext,dataContext,loadContext,apiContext} from "./context/indicatecontext"
import Indicate from "./components/indicator"
import Step1 from "./components/step1"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function Register(){
    const [batches,setBatches] = useState({data:[]});
    const [status,setStatus] = useState({step1:true,step2:false,step3:false})
    const [page,setPage] = useState(<Step1/>)
    const [data,setData] = useState({});
    const [load,setLoad] = useState("");
    useEffect(()=>{
        fetch('/api/institute/batch').then(res=>res.json())
        .then(data=>{
            if(!data.error){
                setBatches(data)
            }
        })
    },[])
    return(
        <>
        <apiContext.Provider value={{batches,setBatches}}>
        <loadContext.Provider value={{load,setLoad}}>
        <dataContext.Provider value={{data,setData}}>
        <pageContext.Provider value={{page,setPage}}>
        <indicateContext.Provider value={{status,setStatus}}>
        {load}
            <Indicate/>
            {page}
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Script id="lottie" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></Script>
        </indicateContext.Provider>
        </pageContext.Provider>
        </dataContext.Provider>
        </loadContext.Provider>
        </apiContext.Provider>
        </>
    )
}