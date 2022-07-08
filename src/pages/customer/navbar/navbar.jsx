import React,{useState,useEffect} from 'react'
import {useHistory } from "react-router-dom";
import { Navbar, Nav,Button ,NavDropdown,Form } from "react-bootstrap"; 
import { TiThMenu } from "react-icons/ti"
import { MdShoppingCart } from   "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";


export default function Suppliernavbar({setDataoutside,setmenubar,menubar}) {
  const history = useHistory();

  const [search, setsearch] = useState("")
  const [bar, setbar] = useState("")

  const historeyone=history.location.pathname
  useEffect(() => {
    if(historeyone!=="/sportsstore")
    {
      setbar(false)
    }
    else{
      setbar(true)
    }
  }, [historeyone])
 

const changehandler=(value)=>{
  setsearch(value);
  searchpro();
}

const searchpro=async()=>{
  try {
      await  axios
      .get(`http://localhost:5000/product/search/?search=${search}`)
      .then((res) => {
        const response = res.data;
        if(response.length===0) {setDataoutside("noproducts")}  
        else {setDataoutside(response)}
      });    
  } catch (e) {
    console.error(e);
  }
}

 const mainnavbar={
  backgroundColor: "rgb(134, 197, 230)"
 }

 const logout =()=>{
  history.push({pathname:"/"});
  localStorage.clear()
 }
 const sidebar=()=>{
  if(historeyone==="/sportsstore")setmenubar(!menubar)
 }
    return (
       <Navbar style={mainnavbar} >
          <Nav.Link onClick={()=>sidebar()}><TiThMenu/></Nav.Link>
        <Navbar.Brand>SPORTSTORE</Navbar.Brand>
        <Nav className="mr-auto " >
        <Nav.Link href="/sportsstore">HOME</Nav.Link>
          <Nav.Link href="/sportsstore/profile">profile</Nav.Link>
          <Nav.Link href="/sportsstore/jersey">custom jersey</Nav.Link>
          <NavDropdown title="my orders" id="basic-nav-dropdown">
              <NavDropdown.Item href="/sportsstore/jersey/orders">jersey order</NavDropdown.Item>
              <NavDropdown.Item href="/sportsstore/cart/orders">online-order</NavDropdown.Item>
         </NavDropdown>
         </Nav>
         {
           bar?
         <Nav className="mr-auto " >
         <Nav.Link >
        <Form inline className="mb-1" style={{padding:"0px"}}>
          <Form.Group style={{padding:"0px"}}>
            <Form.Label className="mr-2"><AiOutlineSearch/></Form.Label>
            <Form.Control
             size="sm" 
            type="text" 
            placeholder="  Type Product name.." 
            value={search} 
            onChange={(e)=>changehandler(e.target.value)}
              htmlSize="80"
    />
          </Form.Group>
        </Form>
        </Nav.Link>
        </Nav>
           :""}
        <Nav className="ml-40">
       <Nav.Link className="pr-4" href="/sportsstore/cart">CART <MdShoppingCart/> </Nav.Link>  
       <Button  variant="danger" onClick={()=>logout()}>logout</Button>
       </Nav>
      </Navbar>
    )
}



