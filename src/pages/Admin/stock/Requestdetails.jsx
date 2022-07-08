import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";


import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Requestdetails(props) {
  toast.configure();
  const test = props.location.state;
  const [DATASUPPLIER, setDATASUPPLIER] = useState([]);

  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios({
          method: "Get",
          url: "http://localhost:5000/app/supplierprofile",
        }).then((resp) => {
          const response = resp.data;
          setDATASUPPLIER(response);
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const initialValues = {
    Stockrequired: "",
    supplier: "",
  };

  const onSubmit = async (values) => {
    try {
      axios
        .post(`http://localhost:5000/supplier/requestadd`, {
          ...values,
          supplierone: DATASUPPLIER[0]._id,
          productid: test._id,
          productname: test.productname,
          subcategorey: test.subcatno.subcategoreyname,
          brand: test.brandno.brandname,
          size: test.size,
          units: test.units,
          color: test.color,
          unitprice: test.unitprice,
        })
        .then((resp) => {
          console.log(resp);

          if (resp.data.message === "Requested") {
            toast.success("requested", {
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

  const validationSchema = Yup.object({
    Stockrequired: Yup.number()
      .required("Required")
      .max(1000, "you cant request more than 1000"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Card className="p-6 ml-30">
            <Card.Body>
              <Card.Title>{test.productname}</Card.Title>
              <Card.Text>
                subcategorey:{test.subcatno.subcategoreyname}
                <br />
                brand:{test.brandno.brandname}
                <br />
                size:{test.size}
                {test.units}
                <br />
                color:{test.color}
                <br />
                unit price:{test.unitprice}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={8}>
          <div>
            <Form className="login_form" onSubmit={formik.handleSubmit}>
              <Form.Group controlId="REQUEST STOCK">
                <Form.Label>REQUEST STOCK</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Stock required"
                  name="Stockrequired"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={
                    formik.errors.Stockrequired && formik.touched.Stockrequired
                      ? "form-control is-invalid Stockrequired"
                      : "Stockrequired"
                  }
                />
                {formik.errors.Stockrequired ? (
                  <div className="invalid-feedback Stockrequired">
                    {formik.errors.Stockrequired}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Supplier list</Form.Label>
                <Form.Control
                  as="select"
                  name="supplier"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.supplier}
                  className={
                    formik.errors.supplier && formik.touched.supplier
                      ? "form-control is-invalid categorey"
                      : "supplier"
                  }
                >
                  {DATASUPPLIER.length &&
                    DATASUPPLIER.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          Name: {item.name} || companyname:{item.companyname} ||
                          branch:{item.branch}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>

              <Button variant="success" type="submit" className="submitbtn">
                REQUEST
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
