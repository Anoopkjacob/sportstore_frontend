import React,{useState} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

import Chat from '../../../componenets/chats/Chats'

import { toast } from "react-toastify";

export default function RequestCard({ item }) {
  toast.configure();
  const [message, setmessage] = useState(false)

  const deletrequest = () => {
    try {
      axios
        .post(`http://localhost:5000/supplier/reqtblDelete`, {
          id: item._id,
        })
        .then((resp) => {
          if (resp.data.message === "deleted") {
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
  };

  return (
    <Container>
      <Row className="p-4">
        <Col>
        {
            message ?<Chat id={item._id}  setmessage={setmessage} chattype={"chat"}/>
            :
          <Card bg={
                item.status === "pending"
                  ? "warning"
                  : item.status === "Accept"
                  ? "success"
                  : "info"
              }
               border="success" key={item._id}>
           {item.status!=="Accept" ? <Card.Header>
              <Button variant="danger" onClick={() => deletrequest()}>
                <AiOutlineClose />
              </Button>
            </Card.Header>:""}
            <Card.Body>
              <Card.Title>{item.productname}</Card.Title>
              <Card.Text>
                suppliername:{item.supplierid.name}<br/>
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
              item.status==="pending" ||  item.status==="Accept"?
              <Button onClick={()=>setmessage(true)} variant="secondary" >message</Button>
              :""
              }
            </Card.Footer>
          </Card>
         
          }
        </Col>
      </Row>
    </Container>
  );
}
