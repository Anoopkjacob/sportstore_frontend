import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import InputColor from "react-input-color";

// default kits

import One from "../../../../Assets/images/kits/one.png";
import Two from "../../../../Assets/images/kits/two.png";
import Three from "../../../../Assets/images/kits/three.png";
import Four from "../../../../Assets/images/kits/four.png";

import JerseyChat from "../../../../componenets/chats/Chats";

import { toast } from "react-toastify";

export default function JerseyRequestCard({ item }) {
  toast.configure();
  const [message, setmessage] = useState(false);

  const setimage = (defaultimg) => {
    switch (defaultimg) {
      case "one":
        return One;
      case "two":
        return Two;
      case "three":
        return Three;
      case "four":
        return Four;
      default:
        return null;
    }
  };

  const accept = () => {
    try {
      axios
        .put(`http://localhost:5000/jersey/ACCEPT`, {
          id: item._id,
        })
        .then((resp) => {
          if (resp.data.message === "Accepted") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 100);
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
  const jerseymade = () => {
    try {
      axios
        .put(`http://localhost:5000/jersey/jerseymade`, {
          id: item._id,
        })
        .then((resp) => {
          if (resp.data.message === "jerseymade") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 100);
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
  const reject = () => {
    try {
      axios
        .put(`http://localhost:5000/jersey/REJECT`, {
          id: item._id,
        })
        .then((resp) => {
          if (resp.data.message === "Reject") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 100);
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
    <Container>
      <Row className="p-4">
        <Col>
          {message ? (
            <JerseyChat
              id={item._id}
              setmessage={setmessage}
              chattype={"jersey"}
            />
          ) : (
            <Card
              bg={
                item.status === "pending"
                  ? "warning"
                  : item.status === "Accept"
                  ? "success"
                  : item.status === "Reject"
                  ? "damger"
                  : "info"
              }
              border="success"
              key={item._id}
            >
              {item.status === "pending" ? (
                <Card.Header>
                  <Button
                    variant="success"
                    className="ml-4"
                    onClick={() => accept()}
                  >
                    ACCEPT <AiOutlineCheck />
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => reject()}
                  >
                    REJECT <AiOutlineClose />
                  </Button>
                </Card.Header>
              ) : (
                ""
              )}
              {item.imageurl !== "not selected" ? (
                <Card.Img variant="top" height="400px" src={item.imageurl} />
              ) : item.default !== "not selected" ? (
                <Card.Img
                  variant="top"
                  height="400px"
                  src={setimage(item.default)}
                />
              ) : (
                ""
              )}
              <Card.Body>
                customer name:{item.userid.name}
                <br />
                email:{item.userid.email}
                <br />
                phone no:{item.userid.phone}
                <br />
                Address:{item.userid.address} ,{item.userid.city},pincode
                {item.userid.zip}
                <br />
                primarycolor:
                {
                  <InputColor
                    className="ml-3"
                    initialValue={item.primarycolor}
                  />
                }{" "}
                || Secondarycolor:
                {
                  <InputColor
                    className="ml-3"
                    initialValue={item.Secondarycolor}
                  />
                }
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
                payed: {item.payement}
                {item.payement === "paid" && (
                  <p>
                    shipping address:{" "}
                    {` ${item.shippingaddress}, city:${item.city}, pin:${item.pin}`}{" "}
                    <br />
                    payed: {item.payement}
                  </p>
                )}
              </Card.Body>
              <Card.Footer>
                <span className="p-2">{item.status}</span> <br />
                {item.status !== "Reject" ? (
                  <Button onClick={() => setmessage(true)} variant="secondary">
                    message
                  </Button>
                ) : (
                  ""
                )}
                {item.status === "Accept" && item.payement==="paid" ? (
                  <Button
                    variant="success"
                    className="ml-4"
                    onClick={() => jerseymade()}
                  >
                    jerseymade
                  </Button>
                ) : (
                  ""
                )}
              </Card.Footer>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
