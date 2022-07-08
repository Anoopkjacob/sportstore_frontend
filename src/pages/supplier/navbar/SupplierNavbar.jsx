import React from 'react'
import {useHistory } from "react-router-dom";
import { Navbar, Nav,Button } from "react-bootstrap"; 


export default function Suppliernavbar() {
  const history = useHistory();

  
 const mainnavbar={
  backgroundColor: "rgb(147, 88, 21)"
 }
 const logout =()=>{
  history.push({pathname:"/"});
  localStorage.clear()
 }

    return (
       <Navbar style={mainnavbar} variant="dark">
        <Navbar.Brand>SupplierPanel</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/supplierhome/profile">profile</Nav.Link>
          <Nav.Link href="/supplierhome">Request</Nav.Link>
        </Nav>
    <Button className="ml-40" variant="danger" onClick={()=>logout()}>logout</Button>
      </Navbar>
    )
}



