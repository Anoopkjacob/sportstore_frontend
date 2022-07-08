import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FiPhone } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
toast.configure();

export default function Cards({ item }) {
  const deliveredhandlechange = async (e) => {
    if (e.target.name === "delivered") {
      var Deliverystatus = "delivered";
    } else if (e.target.name === "notdelivered") {
      Deliverystatus = "notdelivered";
    }
    try {
      axios
        .put(`http://localhost:5000/delivery/deliveredjersey`, {
          deliveryid: localStorage.getItem("loginid"),
          _id: item._id,
          status:Deliverystatus
        })
        .then((resp) => {
          if (resp.data.message === "updated") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } catch (e) {
      console.log(e.data);
    }
  };

  return (
    <Row className="p-4">
      <Col>
        <Card
          border={
            item.status === "outfordelivery"
              ? "warning"
              : item.status === "delivered"
              ? "success"
              : "danger"
          }
        >
          <Card.Body>
            orderid:{item._id}
            <br />
            discrption:{item.discrption}
            <br />
                size xl :{item.sizexl}  ||
                size xxl :{item.sizexxl} ||
                size xxxl :{item.sizexxxl} || 
                size S :{item.sizeS} || 
                size M :{item.sizeM} || 
                size L :{item.sizeL} || 
                <br/>
            Amount: {item.Amount} <br />
            {item.payement === "paid" && (
              <p>
                <strong>
                  shipping address:{" "}
                  {` ${item.shippingaddress}, city:${item.city}, pin:${item.pin}`}
                </strong>
                <br />
                <strong>
                  contact <FiPhone />: {item.userid.phone}
                </strong>
              </p>
            )}
          </Card.Body>
          <Card.Footer>
            <span className="p-2">{item.status}</span>
            {item.status === "outfordelivery" && (
              <>
                <Button
                  variant="success"
                  name="delivered"
                  onClick={(e) => deliveredhandlechange(e)}
                >
                  Delivered
                </Button>
                <Button
                  variant="danger"
                  name="notdelivered"
                  className="ml-2"
                  onClick={(e) => deliveredhandlechange(e)}
                >
                  Notdelivered
                </Button>
              </>
            )}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
