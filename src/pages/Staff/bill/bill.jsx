import React, { useState, useEffect } from "react";
import { Container, Row, Table, Button, Col, Spinner } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";

import axios from "axios";
import DeletButton from "./DeletButton";
import QuantityButton from "./QuantityButton";

import easyinvoice from "easyinvoice";
import { v4 as uuidv4 } from "uuid";

toast.configure();
export default function Bill() {
  const userid = localStorage.getItem("loginid");
  const [DATA, setData] = useState([]);
  const [finavalues, setvalues] = useState(0);
  const [spinner, setspinner] = useState(true);

  const [zip, setzip] = useState("");
  const [name2, setname] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");

  // console.log(DATA)

  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios({
          method: "post",
          url: "http://localhost:5000/bill/billGet",
          data: { userid },
        }).then((resp) => {
          const response = resp.data;
          //  console.log(response)
          setData(response);
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, [userid]);

  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios
          .post(`http://localhost:5000/bill/total`, { userid })
          .then((resp) => {
            const response = resp.data;
            setvalues(response);
          });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, [userid]);

  // invoice
  const generate = async () => {
    setspinner(false);
    const product = DATA.map((item) => {
      return {
        quantity: item.noofitems,
        description: item.productId.productname,
        tax: 0,
        price: item.productId.unitprice,
      };
    });
    console.log(product);
    const name = uuidv4();
    const data = {
      currency: "INR",
      taxNotation: "vat", //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,

      sender: {
        company: "Royal Sports",
        address: "2nd floor Wilson tower,kottyam",
        zip: "686011",
        city: "kottayam",
        country: "india",
      },
      client: {
        company: name2,
        address: address,
        zip: zip,
        city: city,
        country: "India",
      },

      invoiceNumber: Date.now(),
      invoiceDate: new Date().toDateString(),
      products: product,
      bottomNotice: "thank you for choosing us",
    };
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`${name}.pdf`, result.pdf);
    await onsubmithandlechange();
  };

  // submit form

  const onsubmithandlechange = async () => {
    try {
      axios
        .put(`http://localhost:5000/bill/billsubmit`, { userid })
        .then((resp) => {
          if (resp.data.message === "billed") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setspinner(true);
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
            setspinner(true);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  if (DATA.length === 0) {
    return <h1>Sorry! No products added to bill section</h1>;
  }

  if (DATA.length !== 0) {
    return (
      <div style={{ height: "100vh" }}>
        <Container>
          <h1>Bill Section</h1>
          <Row className="row mt-5">
            <form className="d-flex justify-content-center">
              <p className="p-1 m-1">
                <strong>Customer information</strong>
              </p>
              <label className="p-1 m-1" htmlFor="name">
                Name
              </label>
              <input
                className="p-1 m-1"
                type="text"
                name="name"
                placeholder="name"
                onChange={(e) => setname(e.target.value)}
              />
              <label className="p-1 m-1" htmlFor="address">
                Address
              </label>
              <input
                className="p-1 m-1"
                type="text"
                name="address"
                placeholder="address"
                onChange={(e) => setaddress(e.target.value)}
              />
              <label className="p-1 m-1" htmlFor="zip">
                Zip
              </label>
              <input
                className="p-1 m-1"
                type="text"
                name="zip"
                placeholder="zip"
                onChange={(e) => setzip(e.target.value)}
              />
              <label className="p-1 m-1" htmlFor="city">
                City
              </label>
              <input
                className="p-1 m-1"
                type="text"
                name="city"
                placeholder="city"
                onChange={(e) => setcity(e.target.value)}
              />
            </form>
            <div>
              <form>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>size</th>
                      <th>Color</th>
                      <th>price</th>
                      <th>quantity</th>
                      <th>Total price</th>
                      <th>DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.productId.productname}</td>
                          <td>{item.productId.size}</td>
                          <td>{item.productId.color}</td>
                          <td>{item.productId.unitprice}</td>
                          <td>
                            <QuantityButton Rows={item} />
                          </td>
                          <td>{item.Totalprice}</td>
                          <td>
                            <DeletButton Rows={item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <input
                          type="text"
                          readOnly
                          value={`TOTAL:  ${finavalues}`}
                        />
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </Table>
                <Row>
                  <Col xs={12} md={8}>
                    {" "}
                  </Col>
                  <Col xs={6} md={4}>
                    {name2 !== "" &&
                      zip !== "" &&
                      address !== "" &&
                      city !== "" && (
                        <Button variant="danger" onClick={() => generate()}>
                          {spinner ? (
                            "PAY & INVOICE "
                          ) : (
                            <Spinner animation="border" />
                          )}
                          <FaFilePdf />{" "}
                        </Button>
                      )}
                  </Col>
                </Row>
              </form>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
