import React,{useState} from 'react';


import {Button} from "react-bootstrap";
import { FaPlus,FaMinus } from "react-icons/fa";
import {toast} from 'react-toastify';
import axios from "axios";


toast.configure()


export default function AddButton({Rows}) {

 const [quantity, setquantity] = useState(Rows.noofitems)

const productid= Rows.productId._id;
const billid= Rows.billid;
const unitprice= Rows.productId.unitprice;
const stock= Rows.productId.quantity;


    const plusaction=()=>{
      setquantity(Rows.noofitems)
        if(quantity>stock)
        {
          toast.error(`no more items in stock`,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined})
        }else{
     
        try {
            axios
              .put(`http://localhost:5000/bill/plusquantity`,{unitprice,productid,billid})
              .then((resp) => {
                console.log(resp);
      
                if(resp.data.message==="Total updated") {
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
                    }, 2000);
                    
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
    }
   
    const minusaction=()=>{
      if(quantity<=1)
      {
        toast.error(`Atleast one no of item`,{
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined})
      }else{
        try {
            axios
              .put(`http://localhost:5000/bill/minusquantity`,{unitprice,productid,billid})
              .then((resp) => {
                console.log(resp);
                if(resp.data.message==="Total updated") {
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
                    }, 2000);
              
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
    }
   
     

    return (
        <div>
      
       <span> 
     
    <Button variant="danger" type="submit" className="m-2 minus" onClick={()=>minusaction()}  >
       <FaMinus/>
    </Button>  
    <input type="text" value={quantity} readOnly />
    <Button variant="success" type="submit" className="m-2 plus" onClick={()=>plusaction()}   >
       <FaPlus/>
    </Button> 
    </span>
     
    
        </div>
    )
}


