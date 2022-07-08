import React,{useState} from "react";
import { Container, Row, Col, Card,Button } from "react-bootstrap";


import { IoRefreshOutline,IoArrowBackCircleSharp } from "react-icons/io5"


import "./chat.css";

import Chatbar from "./chatbar";
import Message from "./message";

export default function Chats({id,setmessage,chattype}) {

const [refresh, setrefresh] = useState(true)


  return (
    <Container>
        <h1>Chat Box</h1>
      <Row>
        <Col>
          <Card className="p-2 ">
             <Card.Header>
               <Button className="m-2" onClick={()=>setrefresh(!refresh)} ><IoRefreshOutline/></Button>
               <Button className="m-2" variant="danger" onClick={()=>setmessage(false)}><IoArrowBackCircleSharp/></Button>
             </Card.Header> 
            <Card.Body className="chatwindow overflow-auto">
              <Message className="message" id={id} refresh={refresh} chattype={chattype} />
            </Card.Body>
            <Card.Footer className="chatfooter">
              <Chatbar  id={id} setrefresh={setrefresh} refresh={refresh} chattype={chattype}/>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
