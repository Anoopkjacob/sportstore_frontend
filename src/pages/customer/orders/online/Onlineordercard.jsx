import React,{useState} from 'react'
// import logo from '../../../../Assets/images/billlogo.png';
import {  Row, Col, Card,Spinner,Button } from "react-bootstrap";
import Rate from './Rating'
import { FaFilePdf } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";


import easyinvoice from 'easyinvoice';
import { v4 as uuidv4 } from 'uuid';

export default function Cards({item}) {
  const [spinner,setspinner] = useState(true)

  const generate =async()=>{
    setspinner(false);
  const name=uuidv4()
  const data = {
  
   "currency": "INR",
   "taxNotation": "vat", //or gst
   "marginTop": 25,
   "marginRight": 25,
   "marginLeft": 25,
   "marginBottom": 25,
   "sender": {
       "company": "Royal Sports",
       "address": "2nd floor Wilson tower,kottyam",
       "zip": "686011",
       "city": "kottayam",
       "country": "india"
    
   },
   "client": {
    "company": localStorage.getItem("myemail"),
    "address": localStorage.getItem("address"),
    "zip": localStorage.getItem("zip"),
    "city": localStorage.getItem("city"),
    "country": "India"
},
  
  "invoiceNumber": Date.now(),
  "invoiceDate": new Date().toDateString(),
   "products": [
    {
  "quantity": item.quantity,
  "description":item.productid.productname,
  "tax": 0,
  "price": item.productid.unitprice
  }
  ],
   "bottomNotice": "thank you for choosing us"
  };
  const result = await easyinvoice.createInvoice(data);                       
  easyinvoice.download(`${name}.pdf`, result.pdf);
  setspinner(true);
  }
    return (
         <Row className="p-1 mb-3">
          <Col>       
          <Card
            border={
                item.status === "cashpayed"
                ? "warning"
                : item.status === "delivered"
                ? "success"
                :
                item.status==="outfordelivery"
                ?
                "info":"danger"
            }
          key={item._id}
          >  
            <Card.Body>
             product name :{item.productid.productname} ||
             quantity:{item.quantity} ||
             Total amount:{item.totalprice} ||
             Shipping address: {item.shippingaddress} ||
             city: {item.city} ||
             pincode: {item.pin}
            </Card.Body>
            <Card.Footer>
            <span className="p-2">{item.status}</span>       
            {item.status==="outfordelivery"
             &&
             <Card.Text>

               contact <FiPhone/> :{item.deliverycontact}
             </Card.Text> 
            }
            {
             item.status==="delivered" && item.rated!=="rated"?
             <div className="inline">
                 <Rate item={item}/>
             </div>:""
            }
             {
                item.status==="notdelivered"  && <p style={{color:"red" ,padding:"2px"}}>couldn't find the address,Please contact the store....</p>
             }
           <Button variant="danger" className="ml-4" onClick={()=>generate()}>{spinner ?"INVOICE":<Spinner animation="border" />}<FaFilePdf/> </Button>
            </Card.Footer>
          </Card>
              
          </Col>
      </Row>
    )
}




