import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import { IoSendSharp } from "react-icons/io5"
import axios from "axios";

import { toast } from "react-toastify";
toast.configure();

export default function Chatbar({id,setrefresh,refresh,chattype}) {
const [term, setterm] = useState(null)
const user =localStorage.getItem("role")

const handlesubmit =async(term)=>{
 try {
    axios.post(`http://localhost:5000/${chattype}/chatinsert`,{requestid:id,user:user,text:term})
     .then((resp) => {
        if(resp.data.message==="message sended") {
          toast.success(`${resp.data.message}`,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined});
        setterm(" ");
        setrefresh(!refresh);
        }else{
          toast.error(`${resp.data.message}`,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined})
        }
      });
  } catch (e) {
    console.error(e);
  }
}

    return (
     
         <span>
           <input type="text" placeholder="Type here....." className="p-2 m-1 inputbar" value={term} onChange={(e)=>setterm(e.target.value)} />
           <Button onClick={()=>handlesubmit(term)}><IoSendSharp/></Button>
         </span>
       
    )
}


