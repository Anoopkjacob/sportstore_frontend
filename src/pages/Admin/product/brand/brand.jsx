import React from 'react'
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {toast} from 'react-toastify';
toast.configure()

export default function Brand( {setTable,TABLE}) {



    const initialValues = {
        brandname: "",
      };
      
      const onSubmit = async (values , {setSubmitting,resetForm}) => {
      
        // console.log(values)
        try{
      
          axios.post(`http://localhost:5000/product/brandAdd`, values).then(resp=>{
         
            console.log(resp)

            if(resp.data.message==="brand added") {
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
        brandname: Yup.string().required("please Add categorey").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
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
          <Form.Label>ADD BRAND</Form.Label>
          <Form.Control
            type="text"
            placeholder="ADD BRAND"
            name="brandname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brandname}
            className={
              formik.errorsbrandname && formik.touched.brandname
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
                 <Button variant="info" type="button" className="submitbtn m-2" onClick={()=>setTable(!TABLE)}>
                 EDIT PAGE
               </Button> 
    
   
      </Form>
        </div>
    )
}
