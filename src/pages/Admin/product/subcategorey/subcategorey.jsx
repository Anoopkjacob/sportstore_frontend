import React from "react";

import { Button, Form, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";
toast.configure();

export default function Subcategorey({ DataBrand, DataCat,setTable,TABLE }) {

 

  const initialValues = {
    subcatname: "",
    categoreydrop:"",
    branddrop:"",
  };

  const onSubmit = async (values, {setSubmitting,resetForm}) => {
    console.log(values);
      try{

        axios.post(`http://localhost:5000/product/subcategoreyAdd`, {...values,catone:DataCat[0]._id,brandone:DataBrand[0]._id}).then(resp=>{

          console.log(resp)

          if(resp.data.message==="subcategorey added") {
            toast.success(`${resp.data.message}`,{
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined});
              resetForm({})
              setTimeout(() => {
                window.location.reload(false)
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
          }
        });

      }catch(e){

        console.log(e.data)
      }
  };



  const validationSchema = Yup.object({
    subcatname: Yup.string().required("please Add sub-categorey").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <Form className="login_form" onSubmit={formik.handleSubmit}>

      <Form.Group controlId="formBasicEmail">
          <Form.Label>ADD SUBCATEGOREY</Form.Label>
          <Form.Control
            type="text"
            placeholder="ADD subcatname"
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
          <Form.Label>categorey</Form.Label>
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
                  // <option key={1} defaultValue={DataCat[0]._id}>{DataCat[0].categoreyname}</option>,
                  <option key={item.categoreyid} value={item._id}>
                    {item.categoreyname}
                  </option>
                );
              })
              }
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
          <Form.Label>Brand</Form.Label>
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
                  // <option key={1} defaultValue={DataBrand[0]._id}>{DataBrand[0].brandname}</option>,
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


       
        <Button variant="success" type="submit" className="submitbtn m-2">
          Submit
        </Button>
        <Button variant="info" type="button" className="submitbtn m-2" onClick={()=>setTable(!TABLE)}>
                 EDIT PAGE
          </Button> 
    
        
      </Form>
    </div>
  );
}

