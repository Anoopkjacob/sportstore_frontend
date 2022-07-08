import React from 'react'
import {  Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
toast.configure();


export default function Cards({item}) {

    const takenhandlechange =async()=>{
        try {
            axios
              .put(`http://localhost:5000/delivery/jerseytaken`, {
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
    <Row className="p-4">
          <Col>
          <Card
          border={
                item.status === "jerseymade"
                ? "warning"
                : item.status === "outfordelivery"
                ? "success"
                :
                item.status ==="delivered"?
                "primary"
                :
                "danger"
            }
          >
            <Card.Body>
                orderid:{item._id}<br/>
                discrption:{item.discrption}
                <br />
                size xl :{item.sizexl}  ||
                size xxl :{item.sizexxl} ||
                size xxxl :{item.sizexxxl} || 
                size S :{item.sizeS} || 
                size M :{item.sizeM} || 
                size L :{item.sizeL} || 
                <br/>
                Amount: {item.Amount}  <br />  
            {
              item.payement==="paid" && 
                <p>
                  <strong>
                  shipping address: {` ${item.shippingaddress}, city:${item.city}, pin:${item.pin}`}
                  </strong>
                </p>
            }
            </Card.Body>
            <Card.Footer>
            <span className="p-2">{item.status}</span>
              {
                 item.status==="jerseymade" && item.payement==="paid"?
                 <Button onClick={()=>takenhandlechange()}>TAKEN</Button>
                 :item.status==="delivered"?
                 <Card.Text style={{backgroundColor:"green"}}>Delivered</Card.Text>:""
              }
            </Card.Footer>
          </Card>       
          </Col>
      </Row>
    )
}
