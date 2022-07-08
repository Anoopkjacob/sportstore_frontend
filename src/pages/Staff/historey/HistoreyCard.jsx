import React from 'react'
import {Card} from "react-bootstrap";

export default function HistoreyCard({data}) {
 let Date =data.date

   let options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: 'Asia/Kolkata'
};

    return (
        <Card
      style={{ width: "70rem" }}
      text="dark"
      className="text-center p-4 m-4"
      bg="warning"
    >
      <Card.Body className="p-2">
        <Card.Title className="p-1">{data.productId.productname}</Card.Title>
        <Card.Text className="text-center">
         <span> Unit Price:: {data.productId.unitprice} ||</span>
          <span>Quantity:: {data.noofitems} ||</span>
          <span>Total amount:: {data.Totalprice} ||</span>
          <span>DATE:: {new Intl.DateTimeFormat('en-US',options).format(Date)} ||</span>
          
        </Card.Text>
      </Card.Body>
    </Card>
    )
}
