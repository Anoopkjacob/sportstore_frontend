import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TiArrowRightThick } from "react-icons/ti";
import Producteditsubcat from "./producteditsubcat";

import { toast } from "react-toastify";
toast.configure();

export default function SUBCATEDITONE(props) {
  const test = props.location.state;
  const categoreydrop = test.categoreyno.categoreyname;
  const branddrop = test.brandno.brandname;

  const productid = test.productid;
  const brandid = test.brandno._id;
  const catid = test.categoreyno._id;

  const [DataBrand, setDataBrand] = useState([]);
  const [DataCat, setDataCat] = useState([]);
  const [subcatone, setsubcat] = useState(test.subcatno._id);
  const [DataSubCat, setDatasubCat] = useState([]);
  const [nextbutton, setnextbutton] = useState(true);

  const [buttonrender, setbuttonrender] = useState(false);

  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios({
          method: "Get",
          url: "http://localhost:5000/product/brandGet",
        }).then((resp) => {
          const response = resp.data;
          setDataBrand(response);
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      async function userdatfetch2() {
        await axios({
          method: "Get",
          url: `http://localhost:5000/product/categoreyGet`,
        }).then((resp) => {
          const response = resp.data;
          setDataCat(response);
        });
      }
      userdatfetch2();
    } catch (e) {
      console.error(e);
    }
  }, []);


 
  useEffect(() => {
          try {
            async function userdatfetch2() {
              await axios
                .post("http://localhost:5000/product/subcategoreyGetOne", {
                  catone: catid,
                  brandone: brandid,
                  categoreydrop: "",
                  branddrop: "",
                })
                .then((resp) => {
                  console.log(resp);
                  const response = resp.data.data;
                  setDatasubCat(response);
                });
            }
            userdatfetch2();
          } catch (e) {
            console.error(e);
          }
        }, [brandid, catid]);
 
  const initialValues = {
    categoreydrop: "" || catid,
    branddrop: "" || brandid,
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.categoreydrop === catid && values.branddrop === brandid) {
      toast.error("please enter new value", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        axios
          .put(`http://localhost:5000/product/productstep1`, {
            ...values,
            productid,
          })

          .then((resp) => {
            if (resp.data.message === "updated") {
                       
               axios
                    .post("http://localhost:5000/product/subcategoreyGetOne", {
                      catone: values.categoreydrop,
                      brandone: values.branddrop,
                      categoreydrop: "",
                      branddrop: "",
                    })
                    .then((resp) => {

                      const response = resp.data.data;
                      setDatasubCat(response);
                      toast.success(`${resp.data.message}`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                      });
                      setsubcat(resp.data.data[0]._id)
                      setbuttonrender(true);
                      setnextbutton(false)
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
    }
  };

  const validationSchema = Yup.object({
    categoreydrop: Yup.string().required("please Add categorey").nullable(),
    branddrop: Yup.string().required("please Add brand").nullable(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      {buttonrender === true ? (
        <Producteditsubcat
          test={test}
          DataSubCat={DataSubCat}
          nextbutton={nextbutton}
          subcatone={subcatone}
        />
      ) : (
        <Container>
          <Row>
            <Col>
              <Form className="login_form" onSubmit={formik.handleSubmit}>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>STEP 1</Form.Label>
                  <Form.Control
                    as="select"
                    name="categoreydrop"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.categoreydrop}
                    className={
                      formik.errors.categoreydrop &&
                      formik.touched.categoreydrop
                        ? "form-control is-invalid categorey"
                        : "categorey"
                    }
                  >
                    {DataCat.length &&
                      DataCat.map((item) => {
                        return (
                          (
                            <option
                              key={categoreydrop}
                              values={formik.values.categoreydrop}
                            >
                              {categoreydrop}
                            </option>
                          ),
                          (
                            <option key={item.categoreyid} value={item._id}>
                              {item.categoreyname}
                            </option>
                          )
                        );
                      })}
                  </Form.Control>
                  {formik.errors.categoreydrop ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.categoreydrop}
                    </Form.Control.Feedback>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Edit Brand</Form.Label>
                  <Form.Control
                    as="select"
                    name="branddrop"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.branddrop}
                    className={
                      formik.errors.branddrop && formik.touched.branddrop
                        ? "form-control is-invalid brand"
                        : "brand"
                    }
                  >
                    {DataBrand.length &&
                      DataBrand.map((item) => {
                        return (
                          (
                            <option
                              key={branddrop}
                              values={formik.values.branddrop}
                            >
                              {branddrop}
                            </option>
                          ),
                          (
                            <option key={item.brandid} value={item._id}>
                              {item.brandname}
                            </option>
                          )
                        );
                      })}
                  </Form.Control>
                  {formik.errors.branddrop ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.branddrop}
                    </Form.Control.Feedback>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="submitbtn m-2"
                >
                  update
                </Button>
                <Button
                  variant="warning"
                  type="button"
                  className="submitbtn m-2"
                  onClick={() => setbuttonrender(true)}
                >
                  Next <TiArrowRightThick/>
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
