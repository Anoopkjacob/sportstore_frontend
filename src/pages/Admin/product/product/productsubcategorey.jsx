import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import { TiArrowRightThick } from "react-icons/ti";
import { useFormik } from "formik";
import axios from "axios";
import { MdSearch,MdEdit } from "react-icons/md";

import { toast } from "react-toastify";
toast.configure();

export default function Product({ DataCat, DataBrand,setTable,TABLE }) {
  const history = useHistory();
  const [DataSubCat, setDataSubCat] = useState("");
  const [nextbutton, setnextbutton] = useState(true);

  const nextpagehandleClick = () => {
    let categoreyinput;
    let subcategoreyinput;
    let brandinput;
 
    if(formik.values.categoreydrop==="")
    {
     categoreyinput=DataCat[0]._id
   }
   else{
     categoreyinput=formik.values.categoreydrop
    }
 
    if(formik.values.branddrop==="")
    {
     brandinput=DataBrand[0]._id
   }
   else{
     brandinput=formik.values.branddrop
    }
 
    if(formik.values.subcatdrop==="")
    {
     subcategoreyinput=DataSubCat[0]._id
   }
   else{
     subcategoreyinput=formik.values.subcatdrop
    }
    
   

    history.push({
      pathname: "/home/product/productdetails",
      state: {
        categoreyinput:categoreyinput,
        subcategoreyinput:subcategoreyinput,
        brandinput:brandinput,
        DataCat,
        DataSubCat,
        DataBrand,
      },
    });
    setnextbutton(true);
   
  };

  const initialValues = {
    categoreydrop: "",
    branddrop: "",
    subcatdrop: "",
  };



  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios
        .post("http://localhost:5000/product/subcategoreyGetOne",  {...values,catone:DataCat[0]._id,brandone:DataBrand[0]._id})
        .then((resp) => {
          console.log(resp);
          if (
            resp.data.message === "subcategorey list" &&
            resp.data.data.length !== 0
          ) {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            const response = resp.data;
            setDataSubCat(response.data);
            setnextbutton(false);
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
            setDataSubCat("");
            formik.errors.subcatdrop = "No choice available";
          }
        });
    } catch (e) {
      console.log(e.data);
    }
  };



  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div>
      <Form className="login_form" onSubmit={formik.handleSubmit}>
        <Form.Label>select subcategorey</Form.Label>

        {/* categoreyu */}
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
                  <option key={1} value="" >choose categorey</option>,
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
        {/* brand */}
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
                  <option key={1} value="" >choose brand</option>,
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

        {/* subcat */}

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>subcategorey</Form.Label>
          <Form.Control
            as="select"
            name="subcatdrop"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subcatdrop}
            className={
              formik.errors.subcatdrop && formik.touched.subcatdrop
                ? "form-control is-invalid subcatdrop"
                : "subcatdrop"
            }
          >
            {DataSubCat.length &&
              DataSubCat.map((item) => {
                return (
                  <option key={1} value="" >choose subcategorey</option>,
                  <option key={item.subcategoreyid} value={item._id}>
                    {item.subcategoreyname}
                  </option>
                );
              })}
          </Form.Control>
          {formik.errors.subcatdrop ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.subcatdrop}
            </Form.Control.Feedback>
          ) : (
            ""
          )}
        </Form.Group>
        {nextbutton ? (
          <Button variant="success" type="submit" className="submitbtn m-2">
            search <MdSearch/>
          </Button>
        ) : (
          <Button
            variant="info"
            type="button"
            className="submitbtn m-2"
            onClick={() =>
              nextpagehandleClick(
                formik.values.categoreydrop,
                formik.values.branddrop,
                formik.values.subcatdrop,
                DataCat,
                DataBrand,
                DataSubCat
              )
            }
          >
            next <TiArrowRightThick />
          </Button>
        )}
         <Button variant="secondary" type="button" className="submitbtn m-2" onClick={()=>setTable(!TABLE)}>
                 EDIT PAGE <MdEdit/>
         </Button> 
    
      </Form>
    </div>
  );
}


