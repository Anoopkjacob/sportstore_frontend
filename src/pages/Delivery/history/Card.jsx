import React from 'react'
import {  Row, Col, Card } from "react-bootstrap";

export default function Cards({item}) {
 


    return (
         <Row className="p-1">
          <Col>       
          <Card
       border={
         item.status==="delivered"
         ?
         "success":"danger"
     }
          key={item._id}
          >  
            <Card.Body>
             product name :{item.productid.productname} ||
             quantity:{item.quantity} ||
             Total amount:{item.totalprice} <br/>
             <strong>
             Shipping address: {item.shippingaddress} ||
             city: {item.city} ||
             pincode: {item.pin} 
             </strong>
            </Card.Body>
            <Card.Footer>
            <span className="p-2">{item.status}</span>       
            </Card.Footer>
          </Card>
          </Col>
      </Row>
    )
}
