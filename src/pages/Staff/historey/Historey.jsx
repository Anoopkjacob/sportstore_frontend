import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from "react-bootstrap";
import axios from "axios";

import HistoreyCard from './HistoreyCard'

export default function Historey() {
const [DATA,setData] = useState([])
console.log(DATA)
useEffect( () => {
  try {
async function userdatfetch () {
  await axios.get( `http://localhost:5000/bill/historey`,  
     { params: {
        userid:localStorage.getItem('loginid')
      }
     }
    ).then(resp=>{   
      const response=resp.data;
      setData(response)
    });
 }
 userdatfetch();
  } catch (e) {
      console.error(e);
  }
}, []);

    return (
        <div>
   <Container>
      <Row className="mt-3">
      <Col className="mt-2">
        <h1>Bill History</h1>
          <div>
            {DATA.length!==0 ?
                DATA.map(i=>{return(<HistoreyCard data={i} key={i.billid}/>)})
               :<h1>NO Bill history Found</h1> 
          }
        </div>
      </Col>
      </Row>  
      </Container>
        </div>
    )
}
