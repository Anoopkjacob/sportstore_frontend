import React,{useState,useEffect} from 'react'
import axios from "axios";
import {  Container,Row } from "react-bootstrap";

import CARD from './Card';
import JERSEYCARD from './jerseycard'

export default function Historey() {

    const [DATACART, setDATACART] = useState([])
    const [DATAJERSEY, setDATAJERSEY] = useState([])
 
    useEffect(() => {
      try {
        async function userdatfetch1() {
          await  axios
          .get(`http://localhost:5000/delivery/onlinedeliveryhist/?id=${localStorage.getItem('loginid')}`)
          .then((resp) => {
            const response = resp.data;
            setDATACART(response);
          });
        }
        async function userdatfetch2() {
          await  axios
          .get(`http://localhost:5000/delivery/jerseydeliveryhist/?id=${localStorage.getItem('loginid')}`)
          .then((resp) => {
            const response = resp.data;
            setDATAJERSEY(response);
          });
        }
        userdatfetch2();
        userdatfetch1();
      } catch (e) {
        console.error(e);
      }
    }, []);



    return (
        <Container>
          <Row>
          <h1>DELIVERED ONLINE ORDERS</h1>
          {
            DATACART.length ===0 ?<h4>No online orders</h4>:
            DATACART.map((item) => {
              return(
                <CARD item={item} key={item._id}/>
                )
              })
            }
        </Row>
 <hr/>
 <hr/>
 <Row>
          <h1>DELIVERED JERSEY ORDERS</h1>
         {
           DATAJERSEY.length ===0 ?<h4>No jersey orders</h4>:
           DATAJERSEY.map((item) => {
             return(
               <JERSEYCARD item={item} key={item._id}/>
               )
              })
            }
    </Row>
    </Container>
    )
}


// .get(`http://localhost:5000/product/search/?search=${search}`)