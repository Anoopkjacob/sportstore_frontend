import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from "react-bootstrap";
import axios from "axios";

import Card from './Onlineordercard'

  
export default function Onlineorder() {
  const [DATA, setDATA] = useState([])
  useEffect(() => {
    try {
      async function userdatfetch1() {
        await  axios
        .post(`http://localhost:5000/cart/onlineorder`,{customerid:localStorage.getItem("loginid")})
        .then((resp) => {
          const response = resp.data;
          setDATA(response);  
         
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, []);
    return (
            <Container fluid="sm" className="mainconatiner">
          <Row className="mt-2">
              <Col>   
  
            {DATA.length ===0 ?<h1>No orders</h1>:
                DATA.map((item) => {
                    return(
             <Card item={item} key={item._id}/>
                )
              })
              }
        
              </Col>
          </Row>
        </Container>
    )
}
