import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AuthNavbar from './componenets/AuthNavbar'
import landing from './Assets/images/landing.jpg'

export default function landingpage() {
    return (
      <div
        style={{
          backgroundImage: `URL(${landing})`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <AuthNavbar />
        <Container>
          <Row>
            <Col style={{ color: "aqua" }} xs lg="5">
              <h1>Royal Sports Store</h1>
              <br />
              <h3>WELCOME...</h3>
              <br/>
              <p style={{ color: "white",display:"flex" }}>
                You can select sports accessories and order when you wish we
                will be deliver it in your door step, you can order customize the jersey in our
                site or you can upload the image we will deliver the product in reasonable
                price.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
}
