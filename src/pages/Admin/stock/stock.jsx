import React,{useState,useEffect} from 'react';
import { Container,Row} from "react-bootstrap";
import axios from "axios";

import './stock.css'

import Table from '../../../componenets/Table/Table'
import StockUpdate from './StockUpdate'
import Imagefirebase from './Imagefirebase'
import RequestButton from './RequestButton'
import  ProductImage from './productimage'


export default function STOCK() {

  const [DATA, setData] = useState([]);

    useEffect(() => {
        try {
          async function userdatfetch1() {
            await axios({
              method: "Get",
              url: "http://localhost:5000/product/productGet",
            }).then((resp) => {

              const response = resp.data;
    
              setData(response);
            });
          }
          userdatfetch1();
        } catch (e) {
          console.error(e);
        }
      }, []);


   const COLUMNS=[
        {
            Header:'PRODUCT',
            accessor:'productname'
        },
        {
            Header:'Categorey',
            accessor:'categoreyno.categoreyname'
        },
        {
            Header:'sub-Categorey',
            accessor:'subcatno.subcategoreyname'
        },
        {
            Header:'brand',
            accessor:'brandno.brandname'
        },
        {
            Header:'size',
            accessor:'size'
        },
        {
            Header:'units',
            accessor:'units'
        },
        {
            Header:'color',
            accessor:'color'
        },
        {
          Header:'image',
          Cell: ({ row}) => (
            <ProductImage Rows={row} />)
        },
        {
            Header:'stock',
            accessor:'quantity'
        },
     
        {
            Header:'Stock update',
            accessor:'_id',
            Cell: ({ row}) => (
              <StockUpdate Rows={row} />)
        },
        {
          Header:'Image Upload',
          accessor: "productid",
          Cell:({row})=>(
            <Imagefirebase Rows={row}/>
          )
       },
        {
          Header:'Request',
          accessor: "expdate",
         Cell:({row})=>(
            <RequestButton Rows={row.original}/>
          )
       }    
      ]  

    return (
  <div>
<Container>
<Row  className="row mr-4">
 <h1>PRODUCT STOCK</h1>
<div className="mt-4">
<Table  COLUMNS={COLUMNS} DATA={DATA}  />
</div>
</Row>
</Container>
</div>
    )
}
