import React from 'react'
import {useHistory} from "react-router-dom";
import { Navbar, Nav,Button } from "react-bootstrap"; 
 

export default function Staffnavbar() {
  const history = useHistory();

  const mainnavbar={
    backgroundColor: "rgb(15, 84, 140)"
   }
   const logout =()=>{
    history.push({pathname:"/"});
    localStorage.clear()
   }
    return (
       <Navbar style={mainnavbar} variant="dark">
        <Navbar.Brand>Staffpanel</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/staffhome/profile">profile</Nav.Link>
          <Nav.Link href="/staffhome">Stock</Nav.Link>
          <Nav.Link href="/staffhome/bill">Bill</Nav.Link>
          <Nav.Link href="/staffhome/billhistorey">Bill History</Nav.Link>
        </Nav>
          <Button className="ml-40" variant="danger" onClick={()=>logout()}>logout</Button>
      </Navbar>
    )
}



