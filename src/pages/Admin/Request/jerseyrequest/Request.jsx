import React,{useState,useEffect} from 'react';
import { Container} from "react-bootstrap";

import JerseyRequestCard from "./jerseyrequestcard";

import axios from "axios"


export default function Request(props) {
    const [DATA, setData] = useState([]);

    useEffect(() => {
        try {
          async function userdatfetch1() {
            await axios({
              method: "Get",
              url: "http://localhost:5000/jersey/jerseyrequestget",
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




      if(DATA.length===0)
      {
        return (
            <div>
                <div className="m-10 h1">NO REQUEST ADDED</div>
            </div>         
        )
      }else{
          return(
            <Container className="m-4" >
     
                    {DATA.length &&
              DATA.map((item) => {
                  return(
                      <JerseyRequestCard item={item} key={item._id}/>
                  )
                })}
          </Container>
          )
      }
}
