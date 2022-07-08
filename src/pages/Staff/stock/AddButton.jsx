import React,{useState} from 'react';


import {Button} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {toast} from 'react-toastify';
import axios from "axios";


toast.configure()


export default function AddButton({Rows}) {

 const [stockless, setstockless] = useState(Rows.values.quantity)

const userid =localStorage.getItem('loginid');
const productid= Rows.values._id;
const price= Rows.values.unitprice;





    const handlepage=()=>{
      setstockless(Rows.values.quantity)
        try {
            axios
              .post(`http://localhost:5000/bill/billAdd`,{userid,productid,price})
              .then((resp) => {
                console.log(resp);
      
                if(resp.data.message==="bill added") {
                  toast.success(`${resp.data.message}`,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined});
                   
                    setTimeout(() => {
                      window.location.reload(false)
                    }, 3000);
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
            console.log(e.data);
          }
    }
   

     

    return (
        <div>
         {   stockless!==0 ?
     
        <Button variant="primary" type="submit" className="m-2 " onClick={()=>handlepage(Rows)}  >
           <FaPlus/>
        </Button>
        :null
        }
        </div>
    )
}


