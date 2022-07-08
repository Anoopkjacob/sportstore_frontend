import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Jumbotron, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Payement(props) {
  const total = props.location.state;
  const payfrom = props.location.payfrom;
  const reqid = props.location.reqid;
  const cartid = props.location.cartid;
  const quantity = props.location.quantity;

  toast.configure();
  let history = useHistory();

  const [rps, setrps] = useState(0);
  const [addressline, setaddressline] = useState("");
  const [pin, setpin] = useState("");

  useEffect(() => {
    setrps(total);
  }, [total]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/payment/orders", {
      rps,
      loginid: localStorage.getItem("loginid"),
    });
    console.log(result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency, receipt } = result.data;

    const options = {
      key: "rzp_test_N9l2s3jV81wyyP", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Royal Sports",
      description: "Thank you for choosing us..",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          addressline: addressline,
          pin: pin,
          user: receipt,
          payfrom: payfrom,
          reqid: reqid,
          quantity:quantity,
          cartid:cartid,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        console.log(response);

        const result2 = await axios.post(
          "http://localhost:5000/payment/success",
          data
        );
        toast.success(`${result2.data.msg}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        if (
          result2.data.msg === "succeffully payed" &&
          result2.data.payfrom === "cart"
        )
          history.push({ pathname: "/sportsstore" });
        if (
          result2.data.msg === "succeffully payed" &&
          result2.data.payfrom === "jersey"
        )
          history.push({ pathname: "/sportsstore/jersey/orders" });
      },
      prefill: {
        name: "Royal Sports",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <Container>
      <Row>
        <Col>
          {rps !== 0 ? (
            <Jumbotron>
              <h1>Billing Details.</h1>
              <Form>
                <Form.Row>
                <Form.Label>ADDRESS</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=" Shipping Address"
                    value={addressline}
                    onChange={(e) => setaddressline(e.target.value)}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Label>District</Form.Label>
                  <Form.Control type="text" value="kottayam" readOnly />
                </Form.Row>
                <Form.Row>
                <Form.Label>PIn</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PIN"
                    value={pin}
                    onChange={(e) => setpin(e.target.value)}
                  />
                </Form.Row>
              </Form>

              <p>Total price : {rps}</p>
              <p>
                {rps !== 0 && pin !== "" && addressline !== "" && (
                  <Button className="App-link" onClick={displayRazorpay}>
                    Click to Continue{" "}
                  </Button>
                )}
              </p>
            </Jumbotron>
          ) : (
            <h1>zero cant be added</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
}
