import React from 'react'
import {useHistory } from "react-router-dom";
import {Button,Card} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

toast.configure();


export default function Productcard({data}) {
  const history = useHistory(); 

  const addtocarthandlechange =()=>{
    try {
      axios
        .post(`http://localhost:5000/cart/add`, {
          productid: data._id,
          loginid:localStorage.getItem("loginid"),
          quantity:1,
          totalprice:data.unitprice,
        })
        .then((resp) => {
          if (resp.data.message === "successfull") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            history.push({pathname:"/sportsstore/cart"});
          } else {
            toast.error(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } catch (e) {
      console.log(e.data);
    }


  };
    return (
        <Card style={{ width: '18rem' }} text="dark" border={data.quantity===0?"danger":"info"} className="text-center p-4 m-4">
        <Card.Img style={{width:"13rem",height:"10rem"}} variant="top" src={data.url} className="p-3 m-2" />
        <Card.Body className="p-2">
          <Card.Title className="p-1">{data.productname}</Card.Title>
          <Card.Text className="text-left">
           {data.description}<br/>
            <strong>
            categorey:{data.categoreyno.categoreyname}<br/>
            brand:{data.brandno.brandname}<br/>
            subcategorey:{data.subcatno.subcategoreyname}<br/>
             {/* expdate:{data.expdate}<br/> */}
            </strong>
            <span>size:{data.size} {data.units}, Color:{data.color} </span>
          
          </Card.Text>
          {
            data.noofpeople===0?
            <Card.Text className="p-1">Rate:<span style={{color:"green"}}>new</span></Card.Text>:
            <Card.Text className="p-1">Rate:
            <span className="p-2 m-2">{data.Totalrating}<AiOutlineStar />
            <span style={{backgroundColor:"yellow"}} className="p-2 m-2">{data.noofpeople}</span>
            </span>
            </Card.Text>

          }
          <Card.Text className="p-1">Price:{data.unitprice}</Card.Text>{
              data.quantity!==0 ?
          <Button variant="primary" className="p-2 m-2" onClick={()=>addtocarthandlechange()}>ADD TO CART <FaShoppingCart/> </Button>
          :""
           }
        </Card.Body>
        <Card.Footer className="text-muted p-1">{data.quantity} stock left</Card.Footer>
      </Card>
    )
}

