import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading({load=false} : {load : boolean}) {
  
    return load ? <AiOutlineLoading3Quarters/> : <div></div>
  
}
