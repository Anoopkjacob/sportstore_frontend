import React,{useState,useEffect} from "react";
import axios from "axios";

import { Card } from "react-bootstrap";


export default function Message({id,refresh,chattype}) {
 const [messagedata, setmessagedata] = useState([])

useEffect(() => {
  try {
    async function userdatfetch1() {
      await axios({
        method: "post",
        url: `http://localhost:5000/${chattype}/chatget`,
        data:{
          requestid:id
        }
      }).then((resp) => {
        const response = resp.data;
        setmessagedata(response);
      });
    }
    userdatfetch1();
  } catch (e) {
    console.error(e);
  }
  

}, [id,refresh,chattype])

  return (
    <div>
      {messagedata.length!==0 ? messagedata[0].message.map(item=>{
                  
        return (
             <Card.Text className={item.user==="Admin"?"senderside":"reciverside"} key={item._id}>
                 <strong> {item.user}</strong>
                     <br/>
               <span className={item.user==="Admin"?"sender":"reciver"}>{item.content}</span>
             </Card.Text>
        );
      })
      :
      ""}
    </div>
  );
}
