import React from "react";

import { Container, Row, Col,Form,Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useHistory} from 'react-router-dom'


import {toast} from 'react-toastify';
toast.configure()

export default function CATEGOREYEDITONE(props) {
  const test = props.location.state;
  let history =useHistory()

 const categoreyid=test.categoreyid

  const initialValues = {
    categoreyname: "" || test.categoreyname,
    
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values)
    if(values.categoreyname===test.categoreyname)
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
        .put(`http://localhost:5000/product/categoreyUpdate`,{...values,categoreyid})
        .then((resp) => {
          console.log(resp);

          if(resp.data.message==="categorey updated") {
            toast.success(`${resp.data.message}`,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined});
              resetForm({})
              history.push({pathname:"/home/product/categorey"});
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
    categoreyname: Yup.string()
      .required("please Add categorey")
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
                <Form.Label>EDIT CATEGOREY</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="EDIT CATEGOREY"
                  name="categoreyname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoreyname}
                  className={
                    formik.errors.categoreyname && formik.touched.categoreyname
                      ? "form-control is-invalid categorey"
                      : "categorey"
                  }
                />
                {formik.errors.categoreyname ? (
                  <div className="invalid-feedback categorey">
                    {formik.errors.categoreyname}
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
