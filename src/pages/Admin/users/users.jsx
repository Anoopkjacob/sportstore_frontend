import React,{useEffect,useState} from 'react';
import Table from '../../../componenets/Table/Table'
import {Container,Row,Col,Form} from "react-bootstrap";
import axios from "axios";



import  { CustomerCOLUMNS, SupplierCOLUMNS,StaffCOLUMNS,DeliveryCOLUMNS} from './Columns'

export default function Users() {

const [DATA,setData] = useState([])
 const [user, setuser] = useState("customer")


 const valuedropdown=(e)=>{
  if (e.target.value === "supplier") {
    setuser("supplier");   
  } 
  if (e.target.value === "staff"){
    setuser("staff");
  }
  if (e.target.value === "customer"){
    setuser("customer");
  }
  if (e.target.value === "delivery"){
    setuser("delivery");
  }
 }
  
useEffect( () => {
  try {
async function userdatfetch () {
  await axios.get( `http://localhost:5000/app/userdata`,  
     { params: {
       usertype:user
      }
     }
    ).then(resp=>{   
      const response=resp.data;
      setData(response)
    });
 }
 userdatfetch();
  } catch (e) {
      console.error(e);
  }
}, [user]);

    return (
        <div>
      <Container>
      <Row className="mt-3">
      <Col className="mt-2">
      <Form className="register_form p-0 m-2">
        <Form.Row className="usertyperow">
        <Form.Label>Type Of User</Form.Label>
        <Form.Control
          as="select"
          name="usetype"
          onClick={valuedropdown}
        >
          <option value="customer">CUSTOMER</option>
          <option value="supplier">SUPPLIER</option>
          <option value="staff">STAFF</option>
          <option value="delivery">DELIVERY</option>
        </Form.Control>
        </Form.Row>
        </Form>
        <div >
     {DATA.length!==0 ?
               <div>
                 <h1 className="p-2 mb-2">{user} list</h1>
                {
                user==="customer"? <Table  COLUMNS={CustomerCOLUMNS} DATA={DATA} /> : 
                user==="supplier"? <Table style={{width:"100vh"}} COLUMNS={SupplierCOLUMNS} DATA={DATA} /> : 
                user==="staff" ? <Table  COLUMNS={StaffCOLUMNS} DATA={DATA} /> :
                user==="delivery" ? <Table  COLUMNS={DeliveryCOLUMNS} DATA={DATA} /> :<h1>select one</h1>
               }
               </div>
               :<h1>loading...</h1>
       } 
        </div>
      </Col>
      </Row>
     
      </Container>
      
        </div>
    )
}
