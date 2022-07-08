import React from 'react';


import {Route,BrowserRouter as Router ,Switch} from 'react-router-dom';


import { AdminRoute } from "./Routes/AdminRoutes";
import { StaffRoute } from "./Routes/StaffRoutes";
import { SupplierRoute } from "./Routes/SupplierRoutes";
import { Customeroute } from "./Routes/CustomerRoutes";
import { Deliveryroute } from "./Routes/DeliveryRoutes";


import LANDINGPAGE from './landingpage' 
import LOGIN from './pages/login/';
import REGISTRATION from './pages/registration/';
import OTPRESEND from './pages/registration/resendotp';
import FORGOTPASS from './pages/login/forgotpassword';
import NEWPASSWORD from './pages/login/newpass';
import HOME from './pages/Admin/hoempage/';
import STAFF from './pages/Staff/';
import CUSTOMER from './pages/customer/';
import SUPPLIER from './pages/supplier/';
import DELIVERY from './pages/Delivery'
import NOTFOUND from '../src/componenets/404'


function App() {
  return (
    <div style={{backgroundColor:"rgb(119,221,128)"}}>
    <Router>
    <Switch>
       <Route path="/registration"  component={REGISTRATION}/>
       <AdminRoute path="/home"  component={HOME}/>
       <StaffRoute path="/staffhome"  component={STAFF}/>
       <SupplierRoute path="/supplierhome"  component={SUPPLIER}/>
       <Customeroute path="/sportsstore"  component={CUSTOMER}/>
       <Deliveryroute path="/delivery"  component={DELIVERY}/>
       <Route path="/login"  component={LOGIN}/>
       <Route path="/otpresend" exact component={OTPRESEND}/>
       <Route path="/forgotpassword" exact component={FORGOTPASS}/>
       <Route path="/forgotpassword/newpassword" exact component={NEWPASSWORD}/>
       <Route path="/" exact component={LANDINGPAGE}/>
       <Route path="*" component={NOTFOUND} />
    </Switch>
    </Router>
    </div>
  );
}
export default App;

