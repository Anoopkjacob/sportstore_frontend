import React from 'react'
import {useHistory} from "react-router-dom";
import { Navbar, Nav,Button } from "react-bootstrap"; 



export default function Staffnavbar() {
  const history = useHistory();

  const mainnavbar={
    backgroundColor: "rgb(25, 35, 189)"
   }
   const logout =()=>{
    history.push({pathname:"/"});
    localStorage.clear()
   }
    return (
       <Navbar style={mainnavbar} variant="dark">
        <Navbar.Brand>Delivery</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/delivery/profile">profile</Nav.Link>
          <Nav.Link href="/delivery">orders</Nav.Link>
          <Nav.Link href="/delivery/taken">Taken</Nav.Link>
          <Nav.Link href="/delivery/deliveryhistorey">Delivery Historey</Nav.Link>
        </Nav>
          <Button className="ml-40" variant="danger" onClick={()=>logout()}>logout</Button>
      </Navbar>
    )
}



