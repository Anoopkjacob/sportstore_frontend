import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Jumbotron} from "react-bootstrap";
import axios from "axios";



import Cartcard from './cartcards'


export default function Cart() {

    const [Data, setDATA] = useState([])
    const [Totalprice, setTotalprice] = useState(0)
    const [stockstatus,setstockstatus]=useState([])
    console.log(stockstatus)

    useEffect(() => {
        try {
          async function userdatfetch1() {
            await  axios
            .post(`http://localhost:5000/cart/get`,{customerid:localStorage.getItem("loginid"),status:"cart"})
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
   
      useEffect(() => {
        try {
          async function userdatfetch1() {
            await  axios
            .post(`http://localhost:5000/cart/total`,{customerid:localStorage.getItem("loginid")})
            .then((resp) => {
              const response = resp.data;
              setTotalprice(response);  
            });
          }
          userdatfetch1();
        } catch (e) {
          console.error(e);
        }
      }, []);

    
  if(Data.length!==0){
    return (
        <Container>
        <Row className="justify-content-center my-2 pb-3">
     {Data.length &&
              Data.map((item) => {
                return (
                  <Cartcard data={item} key={item._id} setstockstatus={setstockstatus} stockstatus={stockstatus} /> 
                  
                );
              })}
              <span style={{marginLeft:"100vh" ,marginBottom:"5px"}}>
               TotalAmount: <input value={Totalprice} readOnly/>
              </span>    
             
           </Row>
       </Container>
     
   
    )
  }else{
    return (
       <Container>
           <Row>
               <Col>
               <Jumbotron>
                <p>Add products to cart</p>
               </Jumbotron>
               </Col>
           </Row>
       </Container>
    )
  }
   
}




  