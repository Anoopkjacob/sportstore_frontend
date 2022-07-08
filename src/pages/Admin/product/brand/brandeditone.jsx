import React from "react";

import { Container, Row, Col,Form,Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from 'react-router-dom'


import {toast} from 'react-toastify';
toast.configure()

export default function BRANDEDITONE(props) {
  let history =useHistory()

  const test = props.location.state;
 const brandid=test.brandid

  const initialValues = {
    brandname: "" || test.brandname,
    
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values)
    if(values.brandname===test.brandname)
    {
        toast.error("please enter new value",{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined}) 
    }
    else{
    try {
      axios
        .put(`http://localhost:5000/product/brandUpdate`,{...values,brandid})
        .then((resp) => {
          console.log(resp);

          if(resp.data.message==="brand updated") {
            toast.success(`${resp.data.message}`,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined});
              resetForm({})
              history.push({pathname:"/home/product/brand"});
          }else{
            toast.error(`${resp.data.message}`,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined})
          }
        });
    } catch (e) {
      console.log(e.data);
    }
  } 
  };

  const validationSchema = Yup.object({
    brandname: Yup.string()
      .required("please Add Brand")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
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
                <Form.Label>EDIT BRAND</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="EDIT BRAND"
                  name="brandname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.brandname}
                  className={
                    formik.errors.brandname && formik.touched.brandname
                      ? "form-control is-invalid categorey"
                      : "categorey"
                  }
                />
                {formik.errors.brandname ? (
                  <div className="invalid-feedback categorey">
                    {formik.errors.brandname}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Button variant="success" type="submit" className="submitbtn m-2">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
