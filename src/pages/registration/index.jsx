import React,{useState} from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {toast} from 'react-toastify';


import "./registration.css";
import AUTHNAVBAR from '../../componenets/AuthNavbar';
import IMAGE from './Imagefirebase'
toast.configure()

export default function Registration() {
  const [usetype, setusetype] = useState(false);
  const [imagelink, setimagelink] = useState(null);

  const userdropdown = (e) => {
    if (e.target.value === "supplier") {
      setusetype(true);   
    } else {
      setusetype(false);
    }
  };

  // formik staarted here
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    zip: "",
    usetype: "",
    companyname: "",
    branch: "",
    badgge: "",
  };

  const onSubmit = (values, {setSubmitting,resetForm}) => {
    
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
        axios.post(`http://localhost:5000/app/signup`,{...values,licence:imagelink}).then(resp=>{

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
                window.location = "/";
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
    companyname: Yup.string().when('usetype', {
      is: "supplier",
      then: Yup.string()
           .min(2, "Too Short!")
           .max(20, "Too Long!")
           .required('Company Name is required')}),
    branch: Yup.string().when('usetype', {
       is: "supplier",
       then: Yup.string()
            .min(4, "Too Short!")
            .max(16, "Too Long!")
            .required('Branch is required')}), 
    badgge: Yup.string().when('usetype', {
      is: "supplier",
      then: Yup.string()
            .min(4, "Too Short!")
            .max(8, "Too Long!")
            .required('Badge is required')}),       
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

 
  return (
    <div>
      <AUTHNAVBAR/>
    <Container fluid="sm" className="mainconatiner">
      <Row className="center_row mt-2">
        <Col>
          <Form className="register_form p-5 " onSubmit={formik.handleSubmit}>
          <h1 className="p-3 ">REGISTRATION</h1 >
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
                onClick={userdropdown}
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
                <option value="customer">CUSTOMER</option>
                <option value="supplier">SUPPLIER</option>
              </Form.Control>
              {formik.errors.usetype ? (
                  <div className="invalid-feedback usetype">
                    {formik.errors.usetype}
                  </div>
                ) : (
                  ""
                )}
            </Form.Row>

            {/*  render company details only when user type is supplier  */}

            { usetype ? 
             <div>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCompanyname">
                  <Form.Label>COMPANY NAME</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Company Name"
                    name="companyname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.companyname}
                 
                    className={
                      formik.errors.companyname && formik.touched.companyname
                        ? "form-control is-invalid companyname"
                        : "companyname"
                    }
                  />
                  {formik.errors.companyname ? (
                    <div className="invalid-feedback companyname">
                      {formik.errors.companyname}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridBranch">
                  <Form.Label>BRANCH</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Branch"
                    name="branch"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.branch}
                   
                    className={
                      formik.errors.branch && formik.touched.branch
                        ? "form-control is-invalid branch"
                        : "branch"
                    }
                  />
                  {formik.errors.branch ? (
                    <div className="invalid-feedback branch">
                      {formik.errors.branch}
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridRegNo">
                  <Form.Label>Supplier ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Registration No"
                    name="badgge"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.badgge}
                    className={
                      formik.errors.badgge && formik.touched.badgge
                        ? "form-control is-invalid badgge"
                        : "badgge"
                    }
                  />
                  {formik.errors.badgge ? (
                    <div className="invalid-feedback badgge">
                      {formik.errors.badgge}
                    </div>
                  ) : (
                    ""
                  )}
                 
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridRegNo" className="text-center">
                  <Form.Label>LICENCES</Form.Label>
                  <IMAGE setimagelink={setimagelink} />  
                </Form.Group>
              </Form.Row>
            </div>  
             :""}

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Form.Text className="text-muted p-4">
              RESEND <Link to="/otpresend">OTP FOR VERIFICATION</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
