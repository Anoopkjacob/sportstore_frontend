import React from 'react'
import {  Row, Col, Card,Button } from "react-bootstrap";
import axios from 'axios';
import { toast } from "react-toastify";
toast.configure();

export default function Cards({item}) {


 const takenhandlechange =async()=>{
    try {
        axios
          .put(`http://localhost:5000/delivery/onlinetaken`, {
            deliveryid:localStorage.getItem("loginid"),
            deliverycontact:localStorage.getItem("contact"),
            _id:item._id
          })
          .then((resp) => {
            if (resp.data.message === "Taken") {
              toast.success(`${resp.data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
         
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
 }   
    return (
         <Row className="p-1">
          <Col>       
          <Card
            border={
                item.status === "cashpayed"
                ? "warning"
                : item.status === "outfordelivery"
                ? "success"
                :
                item.status==="delivered"
                ?
                "primary":"danger"
            }
          key={item._id}
          >  
            <Card.Body>
             product name :{item.productid.productname} ||
             quantity:{item.quantity} ||
             Total amount:{item.totalprice} ||
             <strong>
             Shipping address: {item.shippingaddress} ||
             city: {item.city} ||
             pincode: {item.pin}
             </strong>
            </Card.Body>
            <Card.Footer>
            <span className="p-2">{item.status}</span>       
            {
             item.status==="cashpayed"
             ?  
             <Button onClick={()=>takenhandlechange()}>TAKEN</Button>
             :
             item.status==="delivered"?
             <Card.Text style={{backgroundColor:"green"}}>Delivered</Card.Text>:""
            }
            </Card.Footer>
          </Card>
              
          </Col>
      </Row>
    )
}
