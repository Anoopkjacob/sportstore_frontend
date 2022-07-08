import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from "react-bootstrap";
import axios from "axios";

import ProductCard from './productcard'


export default function Home({Dataoutside}) {
    const [Dataproduct, setproduct] = useState([])
 
    useEffect(() => {
      if( Dataoutside==="noproducts"){
        setproduct("nosearchproduct")
      }else if(Dataoutside!==""){
        setproduct(Dataoutside)
      }
      else{
        try {
          async function userdatfetch() {
            await axios({
              method: "Get",
              url: "http://localhost:5000/product/productGet",
            }).then((resp) => {
              const response = resp.data;
              setproduct(response)
            });
          }
          userdatfetch();
        } catch (e) {
          console.error(e);
        }
      }
      }, [Dataoutside]);

   if(Dataproduct==="nosearchproduct")
   {
    return (
      <Container style={{minHeight:"100vh"}}>
          <Row>
              <Col>
               <h1>Sorryy !!! NO  Such Product available</h1>
              </Col>
          </Row>
      </Container>
   )
  }    
  else if(Dataproduct!==""){
    return (
        <Container style={{minHeight:"100vh"}}>
        <Row className="ml-4 pl-4 pb-3 mb-3">
  {Dataproduct.length &&
              Dataproduct.map((item) => {
                return (
                  <ProductCard data={item} key={item._id}/> 
                );
              })}
           
           </Row>
       </Container>
    )
  }else{
    return (
       <Container>
           <Row>
               <Col>
                <h1>currently  not available</h1>
               </Col>
           </Row>
       </Container>
    )
  }
   
}
