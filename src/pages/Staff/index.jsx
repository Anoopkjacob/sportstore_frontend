import React from 'react'
import { Container} from "react-bootstrap";
import {BrowserRouter as Router ,Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import StaffNavbar from './staffnavbar/staffnavbar'
import { StaffRoute } from "../../Routes/StaffRoutes";

import STOCK from './stock/stock';
import PROFILE from '../../componenets/profile';
import BIll from './bill/bill';
import BIllHISTOREY from './historey/Historey';
import NOTFOUND from '../../componenets/404'

export default function index() {
    return (
    <>    
  <StaffNavbar/>
  <Container style={{minHeight:"100vh"}}>

  <Router>
    <Switch>
       <StaffRoute path="/staffhome/profile"  component={PROFILE}/>
       <StaffRoute  path="/staffhome/bill"  component={BIll}/>
       <StaffRoute  path="/staffhome/billhistorey"  component={BIllHISTOREY}/>
       <StaffRoute exact path="/staffhome"  component={STOCK}/>
       <StaffRoute path="*" component={NOTFOUND} />
    </Switch>
    </Router>

</Container>
</>
     
    )
}

