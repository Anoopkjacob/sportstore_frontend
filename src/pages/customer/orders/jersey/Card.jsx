import React,{useState} from 'react'
import {  Row, Col, Card, Button } from "react-bootstrap";
import { AiOutlineClose  } from "react-icons/ai";
import InputColor from "react-input-color";
import axios from "axios";
import {useHistory } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
  
import Chat from '../../../../componenets/chats/Chats';


// default kits

import One from "../../../../Assets/images/kits/one.png";
import Two from "../../../../Assets/images/kits/two.png";
import Three from "../../../../Assets/images/kits/three.png";
import Four from "../../../../Assets/images/kits/four.png";

import { toast } from "react-toastify";
toast.configure();


export default function Cards({item}) {
  const history = useHistory(); 
  const [message, setmessage] = useState(false)


  const setimage=(defaultimg)=>{
    switch (defaultimg) {
        case "one":return One;
        case "two":return Two;
        case "three":return Three;
        case "four":return Four;
        default:
           return null;
    }
   
   }
 const handlepage=()=>{   
    history.push({pathname:"/sportsstore/payement",state:item.Amount,payfrom:"jersey",reqid:item._id,quantity:"noquantity",cartid:"nill"})
   } 


  const reject=()=>{
    try {
        axios
          .put(`http://localhost:5000/jersey/REJECT`, {
            id: item._id
          })
          .then((resp) => {
            if (resp.data.message === "Reject") {
              toast.success(`${resp.data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.reload(false);
              }, 100);
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
          {
            message ?<Chat id={item._id}  setmessage={setmessage} chattype={"jersey"}/>
            :
          <Card
            border={
                item.status === "pending"
                ? "warning"
                : item.status === "Accept"
                ? "success"
                :
                item.status ==="Reject"?
                 "danger"
                :"info"
            }
            key={item._id}
          >
            {item.status === "pending"?  
            <Card.Header>   
              <Button variant="danger" className="ml-2" onClick={()=>reject()}>
                Cancel <AiOutlineClose />
              </Button>
            </Card.Header>:""}
            {
            item.imageurl!=="not selected"?
            <Card.Img variant="top" height="400px" src={item.imageurl} />
            :
            item.default!=="not selected"?
            <Card.Img variant="top" height="400px"  src={setimage(item.default)} />
            :""
            }
            <Card.Body>
            
             
                primarycolor:{<InputColor className="ml-3" initialValue={item.primarycolor}/>} ||
                Secondarycolor:{<InputColor className="ml-3" initialValue={item.Secondarycolor }/>}
                <br />
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
                payed: {item.payement}

            {
              item.payement==="paid" && 
                <p>
                  shipping address: {` ${item.shippingaddress}, city:${item.city}, pin:${item.pin}`}
                </p>
            }
            {
              item.status==="outfordelivery" && <p>
                Out for delivery <br/>
                contact <FiPhone/> :{item.deliverycontact}
              </p>
            }
            </Card.Body>
            <Card.Footer>
            <span className="p-2">{item.status}</span>
              {
              item.status!=="Reject" ?
              <Button onClick={()=>setmessage(true)} variant="secondary" >message</Button>
              :""
              }
              {
                 item.status==="Accept"&& item.payement!=="paid"?
                 <Button variant="warning" onClick={()=>handlepage()}>Pay</Button>
                 :""
              }
              {
                item.status==="notdelivered"  && <p style={{color:"red" ,padding:"2px"}}>couldn't find the address,Please contact the store....</p>
              }
            </Card.Footer>

          </Card>
          }        
          </Col>
      </Row>
    )
}
