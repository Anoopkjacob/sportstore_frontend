import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import {Customeroute} from  '../../Routes/CustomerRoutes'
import NOTFOUND from '../../componenets/404'

import PROFILE from "../../componenets/profile";
import HOME from "./home/home"

import NAVBAR from "./navbar/navbar";
import CART from "./cart/cart";
import CARTORDER from "./orders/online/onlineorder";
import PAYEMENT from "../../componenets/Payement";
import JERSEY from "./jersey/jersey";
import JERSEYORDER from "./orders/jersey/jerseyorder";
import SIDEBAR from "./sidebar/sidebar"

export default function Index() {

  const [Dataoutside,setDataoutside]=useState("")
  const [menubar, setmenubar] = useState(false);

  return (
    <div style={{minHeight:"100vh"}}>
      <NAVBAR  Dataoutside={Dataoutside} setDataoutside={setDataoutside} setmenubar={setmenubar} menubar={menubar}/>
      <Container fluid className="mt-0">
        <Row className="mt-0 p-0">
        {menubar ? (
            <Col xs={1} className="p-0" style={{backgroundColor: "rgb(134, 197, 230)"}}>
              <SIDEBAR  Dataoutside={Dataoutside}  setDataoutside={setDataoutside}/>
            </Col>
          ) : (
            ""
          )}
          <Col>
            <Router>
              <Switch>
                <Customeroute exact path="/sportsstore" component={props =><HOME {...props} Dataoutside={Dataoutside}/>} />
                <Customeroute exact path="/sportsstore/profile" component={PROFILE} />
                <Customeroute exact path="/sportsstore/cart" component={CART} />
                <Customeroute exact path="/sportsstore/cart/orders" component={CARTORDER} />
                <Customeroute exact path="/sportsstore/jersey" component={JERSEY} />
                <Customeroute exact path="/sportsstore/jersey/orders" component={JERSEYORDER} />
                <Customeroute exact path="/sportsstore/payement" component={PAYEMENT} />
                <Customeroute path="*" component={NOTFOUND} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


