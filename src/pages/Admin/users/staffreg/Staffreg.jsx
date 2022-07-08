import React,{useState} from "react";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {toast} from 'react-toastify';


import "../../../registration/registration.css";
import IMAGE from "../../../registration/Imagefirebase"

toast.configure()

export default function Registration() {

  const [imagelink, setimagelink] = useState(null);

  // formik staarted here
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    zip: "",
    usetype:""
  };

  const onSubmit = (values, {setSubmitting,resetForm}) => {
      console.log(values)
      try{
        if(imagelink===null)
       {
         toast.error(`please upload Documents`,{
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: false,
           draggable: true,
           progress: undefined})
       }else{

        axios.post(`http://localhost:5000/app/staffreg`,{...values,licence:imagelink}).then(resp=>{

           console.log(resp)
          if(resp.data.message==="user registered") {
            toast.success(`${resp.data.message}`,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined});
              resetForm({});
              setTimeout(() => {
                window.location.reload(false)
                window.location = "/home/";
              }, 3000);
            
          }else{
            toast.error(`${resp.data.message}`,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined})
          
          };
          setSubmitting(false)
        });
      }
      }catch(e){
     console.log(e.data)
      }   
    };


  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    phone: Yup.string()
      .required("phone no. is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "please enter 10 digit No")
      .max(10, "please enter 10 digit No"),
    address: Yup.string()
      .min(6, "Address is to Short")
      .max(50, "Address is to Long!")
      .required("Address required"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("city is Required"),
    zip: Yup.string()
      .min(4, "Too Short!")
      .max(8, "Too Long!")
      .required("zip is Required"),
   usetype: Yup.string().required("select user type"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

 
  return (
    <div>
    <Container fluid="sm" className="mainconatiner">
      <Row className="center_row">
        <Col>

          <Form className="register_form p-5 " onSubmit={formik.handleSubmit}>
          <h1 className="p-3 ">STAFF REGISTRATION</h1 >
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>NAME</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={
                    formik.errors.name && formik.touched.name
                      ? "form-control is-invalid name"
                      : "name"
                  }
                />
                {formik.errors.name ? (
                  <div className="invalid-feedback name">
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={
                    formik.errors.email && formik.touched.email
                      ? "form-control is-invalid email"
                      : "email"
                  }
                />
                {formik.errors.email ? (
                  <div className="invalid-feedback email">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className={
                    formik.errors.phone && formik.touched.phone
                      ? "form-control is-invalid phone"
                      : "phone"
                  }
                />
                {formik.errors.phone ? (
                  <div className="invalid-feedback phone">
                    {formik.errors.phone}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={
                    formik.errors.password && formik.touched.password
                      ? "form-control is-invalid Password"
                      : "Password"
                  }
                />
                {formik.errors.password ? (
                  <div className="invalid-feedback phone">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="Enter Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
                className={
                  formik.errors.address && formik.touched.address
                    ? "form-control is-invalid address"
                    : "Password"
                }
              />
              {formik.errors.address ? (
                <div className="invalid-feedback address">
                  {formik.errors.address}
                </div>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="Enter City"
                  name="city"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className={
                    formik.errors.city && formik.touched.city
                      ? "form-control is-invalid city"
                      : "city"
                  }
                />
                {formik.errors.city ? (
                  <div className="invalid-feedback city">
                    {formik.errors.city}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  placeholder="Enter Zip"
                  name="zip"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.zip}
                  className={
                    formik.errors.zip && formik.touched.zip
                      ? "form-control is-invalid zip"
                      : "zip"
                  }
                />
                {formik.errors.zip ? (
                  <div className="invalid-feedback zip">
                    {formik.errors.zip}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Form.Row>
            <Form.Row className="usertyperow">
              <Form.Label>Type Of User</Form.Label>
              <Form.Control
                as="select"
                name="usetype"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.usetype}
                className={
                  formik.errors.usetype && formik.touched.usetype
                    ? "form-control is-invalid zip"
                    : "zip"
                }
              >
                {/* onChange={userdropdown}  */}
                <option value=''>select an option</option>
                <option value="staff">Staff</option>
                <option value="delivery">Delivery</option>
              </Form.Control>
              {formik.errors.usetype ? (
                  <div className="invalid-feedback usetype">
                    {formik.errors.usetype}
                  </div>
                ) : (
                  ""
                )}
            </Form.Row>
            <Form.Row>
               <Form.Group as={Col} controlId="formGridRegNo" className="text-center">
                 <Form.Label>AADHAAR CARD</Form.Label>
                 <IMAGE setimagelink={setimagelink} />  
               </Form.Group>
             </Form.Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}



