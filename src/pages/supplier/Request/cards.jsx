import React,{useState} from 'react'
import {  Row, Col, Card, Button } from "react-bootstrap";
import { AiOutlineClose ,AiOutlineCheck } from "react-icons/ai";
import axios from "axios";

import Chat from '../../../componenets/chats/Chats'

import { toast } from "react-toastify";
toast.configure();

export default function Cards({item}) {

  const [message, setmessage] = useState(false)

  const accept=()=>{
    try {
        axios
          .put(`http://localhost:5000/supplier/ACCEPT`, {
            id: item._id
          })
          .then((resp) => {
            if (resp.data.message === "Accepted") {
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


  const reject=()=>{
    try {
        axios
          .put(`http://localhost:5000/supplier/REJECT`, {
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
            message ?<Chat id={item._id}  setmessage={setmessage} chattype={"chat"}/>
            :
          <Card
            bg={
                item.status === "pending"
                ? "warning"
                : item.status === "Accept"
                ? "success"
                : "danger"
            }
            border="success"
            key={item._id}
          >
            {item.status === "pending"?  
            <Card.Header>   
              <Button variant="success" className="ml-4" onClick={()=>accept()}>
                ACCEPT <AiOutlineCheck />
              </Button>
              <Button variant="danger" className="ml-2" onClick={()=>reject()}>
                REJECT <AiOutlineClose />
              </Button>
            </Card.Header>:""}
            <Card.Body>
              <Card.Title>{item.productname}</Card.Title>
              <Card.Text>
                subcategorey:{item.subcategorey}
                <br />
                brand:{item.brand}
                <br />
                size:{item.size}
                {item.units}
                <br />
                color:{item.color}
                <br />
                unit price:{item.unitprice} <br />
                <strong>stock requested:{item.Stockrequired}</strong>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <span className="p-2">{item.status}</span>
              {
              item.status==="pending" ||  item.status==="Accept" ?
              <Button onClick={()=>setmessage(true)} variant="secondary" >message</Button>
              :""
              }
            </Card.Footer>

          </Card>
          }        
          </Col>
      </Row>
    )
}
