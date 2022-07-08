import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";
import { MdEdit } from "react-icons/md";


export default function EditButton({Rows}) {

const history = useHistory();
 const [RowTerm, setRowTerm] = useState(Rows.original)

   const handlepage=(Rows)=>{
      
    setRowTerm(Rows.original);
 
    history.push({pathname:"/home/SubcatEditOne",state:RowTerm});

   }     



    return (
        <div>
         
        <Button variant="warning" className="m-2 " onClick={()=>handlepage(Rows)}  >
            Edit <MdEdit/>
        </Button>
     
        </div>
    )
}


    