import React,{useState,useEffect} from "react";
import EditButton from './EditButton' ;
import Table from '../../../../componenets/Table/Table'
import { IoArrowBackCircle } from "react-icons/io5";
import { Button} from "react-bootstrap";
import axios from "axios";

import Brand from './brand'

export default function Brandhome() {
  const [DATA, setData] = useState("data");
  const [TABLE, setTable] = useState(false);

  useEffect(() => {
    try {
      async function userdatfetch() {
        await axios({
          method: "Get",
          url: "http://localhost:5000/product/brandGet",
        }).then((resp) => {
          const response = resp.data;
          setData(response);
        });
      }
      userdatfetch();
    } catch (e) {
      console.error(e);
    }
  }, []);


  const COLUMNS=[
    {
        Header:'Brand',
        accessor:'brandname'
    },
    {
        Header: "Action",
        accessor: "brandid",
        Cell: ({ row}) => (
          <EditButton Rows={row} />        
        )
      }
  ]

  return (
    <div>
      <div className="p-4 m-3">
            {
            TABLE ?
          <div>
          <Button variant="info" type="button" className="submitbtn m-2" onClick={()=>setTable(!TABLE)}>
         <IoArrowBackCircle />    
         </Button>  
            <Table  COLUMNS={COLUMNS} DATA={DATA} />
          </div>
        :   
        <Brand  setTable={setTable} TABLE={TABLE} />
     } 
      </div>
   
    </div>

  );
}

//  table





