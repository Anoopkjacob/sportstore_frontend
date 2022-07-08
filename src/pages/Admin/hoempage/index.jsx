import React from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router ,Switch} from 'react-router-dom';

import AdminNavbar from '../../../componenets/AdminNavbar'
import {AdminRoute} from  '../../../Routes/AdminRoutes'


import STOCK from '../stock/stock';
import USERS from '../users/users';
import STAFFREG from '../users/staffreg/Staffreg';
import REQUEST from '../Request/Request';
import JERSEYREQUEST from '../Request/jerseyrequest/Request';
import PROFILE from '../../../componenets/profile';
import CHART from './chart'


import NOTFOUND from '../../../componenets/404'
import CATEGOREYHOME from '../product/categorey/categoreyhome';
import SUBCATEGOREY from '../product/subcategorey/subcategoreyhome';
import BRANDHOME from '../product/brand/brandhome';
import PRODUCTHOME from '../product/product/producthoem';
import PRODUCTHOMEDETAILS from '../product/product/productdetails';
import CATEGOREYEDITONE from  '../product/categorey/categoreyeditone';
import BRANDEDITONE from  '../product/brand/brandeditone';
import SUBCATEDITONE from  '../product/subcategorey/subcategoreyeditone';
import PRODUCTEDIONE from  '../product/product/productedit/producteditfirstpage';
import REQUESTDETAILS from  '../stock/Requestdetails';



export default function Homepage() {

  
  return (
    <div style={{minHeight:"100vh"}}>
      <AdminNavbar/>
      <Container>
      <Router>
    <Switch>
       <AdminRoute exact path="/home"  component={CHART}/>
       <AdminRoute exact path="/home/profile"  component={PROFILE}/>
       <AdminRoute exact path="/home/stock"  component={STOCK}/>
       <AdminRoute exact path="/home/users"  component={USERS}/>
       <AdminRoute exact path="/home/staffreg"  component={STAFFREG}/>
       <AdminRoute exact path="/home/product/categorey"  component={CATEGOREYHOME}/>
       <AdminRoute exact path="/home/product/brand"  component={BRANDHOME}/>
       <AdminRoute exact path="/home/product/subcategorey"  component={SUBCATEGOREY}/>
       <AdminRoute exact path="/home/product/product"  component={PRODUCTHOME}/>
       <AdminRoute exact path="/home/product/productdetails"  component={PRODUCTHOMEDETAILS}/>
       <AdminRoute exact path="/home/categoreyEditOne"  component={CATEGOREYEDITONE}/>
       <AdminRoute exact path="/home/brandEditOne"  component={BRANDEDITONE}/>
       <AdminRoute exact path="/home/SubcatEditOne"  component={SUBCATEDITONE}/>
       <AdminRoute exact path="/home/ProductEditOne"  component={PRODUCTEDIONE}/>
       <AdminRoute exact path="/home/Request"  component={REQUEST}/>
       <AdminRoute exact path="/home/jerseyRequest"  component={JERSEYREQUEST}/>
       <AdminRoute exact path="/home/Requestdetails"  component={REQUESTDETAILS}/>
       <AdminRoute path="*" component={NOTFOUND} />
    </Switch>
    </Router>
      </Container>
    </div>
  );
}


