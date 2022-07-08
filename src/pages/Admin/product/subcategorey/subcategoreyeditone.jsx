import React,{useState,useEffect} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from 'react-router-dom'


import { toast } from "react-toastify";
toast.configure();

export default function SUBCATEDITONE(props) {
  let history =useHistory()

  const test = props.location.state;
  const categoreydrop =test.categoreyno.categoreyname;
  const branddrop = test.brandno.brandname;
  const brandid = test.brandno._id;
  const catid = test.categoreyno._id;
  const subcategoreyid = test.subcategoreyid;

  const [DataBrand, setDataBrand] = useState([])
  const [DataCat, setDataCat] = useState([])

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



  const initialValues = {
    subcatname: "" || test.subcategoreyname,
    categoreydrop:""||catid,
    branddrop:""||brandid,
  };
 
  const onSubmit = async (values, { setSubmitting, resetForm }) => {

    if (values.subcatname === test.subcategoreyname && values.categoreydrop===catid && values.branddrop===brandid) {
      toast.error("please enter new value", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } 
    else {
      try {
        axios
          .put(`http://localhost:5000/product/subcategoreyUpdate`, { ...values,subcategoreyid })
     
          .then((resp) => {
          

            if (resp.data.message === "subcategorey updated") {
              toast.success(`${resp.data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
              resetForm({});
              history.push({pathname:"/home/product/subcategorey"});
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
    subcatname: Yup.string()
      .required("please Add sub-categorey")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
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
      <Container>
        <Row>
          <Col>
            <Form className="login_form" onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit SUBCATEGOREY</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit subcatname"
                  name="subcatname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subcatname}
                  className={
                    formik.errors.subcatname && formik.touched.subcatname
                      ? "form-control is-invalid subcatname"
                      : "subcatname"
                  }
                />
                {formik.errors.subcatname ? (
                  <div className="invalid-feedback subcatname">
                    {formik.errors.subcatname}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Edit Categorey</Form.Label>
                <Form.Control
                  as="select"
                  name="categoreydrop"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoreydrop}
                  className={
                    formik.errors.categoreydrop && formik.touched.categoreydrop
                      ? "form-control is-invalid categorey"
                      : "categorey"
                  }
                >
                  
                  {DataCat.length &&
                  DataCat.map((item) => {
                      return (
                        <option key={categoreydrop} values={formik.values.categoreydrop}>{categoreydrop}</option>,
                        <option key={item.categoreyid} value={item._id}>
                          {item.categoreyname}
                        </option>
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
                        <option key={branddrop} values={formik.values.branddrop}>{branddrop}</option>,
                        <option key={item.brandid} value={item._id}>
                          {item.brandname}
                        </option>
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
              <Button variant="danger" type="submit" className="submitbtn m-2">
                EDIT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
