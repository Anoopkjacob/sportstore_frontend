import React from 'react'
import { Container, Row, Col,Image} from "react-bootstrap";


import notfound from '../Assets/images/404.jpg'

export default function Notfound() {
    return (
     <Container>
         <Row>
             <Col>
              <Image src={notfound} alt="404 NOT FOUND"/>
             </Col>
         </Row>
     </Container>
    )
}
