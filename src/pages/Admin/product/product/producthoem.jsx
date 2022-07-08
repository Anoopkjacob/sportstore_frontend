import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '../../../../componenets/Table/Table'
import { IoArrowBackCircle } from "react-icons/io5";
import { Button} from "react-bootstrap";

import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

import Product from "./productsubcategorey";

export default function Subcategoreyhome() {
  const [TABLE, setTable] = useState(false);
  const [DataCat, setDataCat] = useState([]);
  const [DataBrand, setDataBrand] = useState([]);
  const [Dataproduct, setDataproduct] = useState([]);

  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios({
          method: "Get",
          url: "http://localhost:5000/product/brandGet",
        }).then((resp) => {
          const response = resp.data;
          setDataBrand(response);
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      async function userdatfetch2() {
        await axios({
          method: "Get",
          url: `http://localhost:5000/product/categoreyGet`,
        }).then((resp) => {
          const response = resp.data;
          setDataCat(response);
        });
      }
      userdatfetch2();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      async function userdatfetch2() {
        await axios({
          method: "Get",
          url: `http://localhost:5000/product/productGet`,
        }).then((resp) => {
          const response = resp.data;
          setDataproduct(response);
        });
      }
      userdatfetch2();
    } catch (e) {
      console.error(e);
    }
  }, []);


  const COLUMNS=[
    {
        Header:'product',
        accessor:'productname'
    },
    {
      Header:'categorey',
      accessor:'categoreyno.categoreyname'
  },
    {
        Header:'brand',
        accessor:'brandno.brandname'
    },
    {
        Header:'subcategorey',
        accessor:'subcatno.subcategoreyname'
    },
    {
      Header:'color',
      accessor:'color'
  },
  {
    Header:'size',
    accessor:'size'
},
    {
        Header: "Action",
        accessor: "productid",
        Cell: ({ row,}) => (
          <span className="d-flex">
            <EditButton Rows={row} />
            <DeleteButton Rows={row}/>
          </span>
        )
      }
  ]

  // 
  return (
    <div>
      <div className="p-4 m-3">
        
      {TABLE ? (
          <div>
            <Button
              variant="info"
              type="button"
              className="submitbtn m-2"
              onClick={() => setTable(!TABLE)}
            >
              <IoArrowBackCircle />
            </Button>
            <Table COLUMNS={COLUMNS} DATA={Dataproduct} />
           </div> 
       ) : (
        <Product
        DataCat={DataCat}
        DataBrand={DataBrand}
        setTable={setTable}
        TABLE={TABLE}
      />  
        )} 
      </div>
    </div>
  );
}

//  table
