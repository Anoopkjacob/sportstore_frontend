import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";
toast.configure();

export default function Productdetails(props) {
  const previouspage = props.location.state;
  const brandid = previouspage.brandinput;
  const categoreyid = previouspage.categoreyinput;
  const subcatid = previouspage.subcategoreyinput;
  const DataCat = previouspage.DataCat;
  const DataSubCat = previouspage.DataSubCat;
  const DataBrand = previouspage.DataBrand;

 
  const categoreyarray =DataCat.filter(data=>{ return data._id=== categoreyid })
  const subcategoreyarray =DataSubCat.filter(data=>{ return data._id=== subcatid })
  const brandarray =DataBrand.filter(data=>{return  data._id=== brandid }) 



  const categoreyload=categoreyarray[0].categoreyname
  const brandload=subcategoreyarray[0].subcategoreyname
  const subcatload=brandarray[0].brandname
 



  const initialValues = {
    categoreydrop: "" || categoreyload,
    branddrop: "" || brandload,
    subcatdrop: "" || subcatload,
    product: "",
    size: "",
    units: "",
    unitprice:"",
    quantity: "",
    color: "",
    date: "",
    description: "",
  };


  const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          axios
            .post(`http://localhost:5000/product/productAdd`,{...values,categoreyid,brandid,subcatid})
            .then((resp) => {
              console.log(resp);
              if (resp.data.message === "product added") {
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
                setTimeout(() => {
                  window.location.reload(false);
                }, 3000);
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
    categoreydrop: Yup.string().required("please Add categorey"),
    branddrop: Yup.string().required("please Add brand"),
    subcatdrop: Yup.string().required("please Add subcatdrop"),
    product: Yup.string().required("please Add categorey"),
    size: Yup.string()
      .required("please Add size")
      .matches(/^[0-9.\s]+$/, "Only Numbers are allowed for this field "),
    units: Yup.string().required("please Add units").max(6, "invalid"),
    quantity: Yup.number().positive().required(),
    unitprice: Yup.number().positive().required(),
    color: Yup.string()
      .required("please Add color")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    description: Yup.string().required("please Add description"),
    date: Yup.date()
      .min(new Date(), "Date must be later than today.")
      .typeError("Please provide a valid date")
      .required("Please specify the expiry date"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <Form className="login_form" onSubmit={formik.handleSubmit}>
         <Form.Label>ADD PRODUCT</Form.Label>
        {/* categoreyu */}
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>categorey</Form.Label>
          <Form.Control
            readOnly
            name="categoreydrop"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoreydrop}
            className={
              formik.errors.categoreydrop && formik.touched.categoreydrop
                ? "form-control is-invalid categorey"
                : "categorey"
            }
          ></Form.Control>
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
            readOnly
            name="branddrop"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.branddrop}
            className={
              formik.errors.branddrop && formik.touched.branddrop
                ? "form-control is-invalid brand"
                : "brand"
            }
          ></Form.Control>
          {formik.errors.branddrop ? (
            <Form.Control.Feedback type="invalid">
              {formik.errors.branddrop}
            </Form.Control.Feedback>
          ) : (
            ""
          )}
        </Form.Group>
        {/* subcat */}
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>subcategorey</Form.Label>
            <Form.Control
             readOnly
              name="subcatdrop"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcatdrop}
              className={
                formik.errors.subcatdrop && formik.touched.subcatdrop
                  ? "form-control is-invalid subcatdrop"
                  : "subcatdrop"
              }
            ></Form.Control>
            {formik.errors.subcatdrop ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.subcatdrop}
              </Form.Control.Feedback>
            ) : (
              ""
            )}
          </Form.Group>
        </Form.Row>
        {/* product name */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>ADD PRODUCT</Form.Label>
          <Form.Control
            type="text"
            placeholder="ADD PRODUCT"
            name="product"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.product}
            className={
              formik.errors.product && formik.touched.product
                ? "form-control is-invalid product"
                : "product"
            }
          />
          {formik.errors.product ? (
            <div className="invalid-feedback product">
              {formik.errors.product}
            </div>
          ) : (
            ""
          )}
        </Form.Group>
        {/*  size,color ,quantity */}
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>size</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADD size"
              name="size"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcatname}
              className={
                formik.errors.size && formik.touched.size
                  ? "form-control is-invalid size"
                  : "size"
              }
            />
            {formik.errors.size ? (
              <div className="invalid-feedback size">{formik.errors.size}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>units</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADD units "
              name="units"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.units}
              className={
                formik.errors.units && formik.touched.units
                  ? "form-control is-invalid units"
                  : "units"
              }
            />
            {formik.errors.units ? (
              <div className="invalid-feedback units">
                {formik.errors.units}
              </div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>color</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADD color "
              name="color"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
              className={
                formik.errors.color && formik.touched.color
                  ? "form-control is-invalid color"
                  : "color"
              }
            />
            {formik.errors.color ? (
              <div className="invalid-feedback color">
                {formik.errors.color}
              </div>
            ) : (
              ""
            )}
          </Form.Group>
        </Form.Row>
        {/* exipariy date ,quantity */}
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>date</Form.Label>
            <Form.Control
              type="date"
              placeholder="ADD Date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className={
                formik.errors.date && formik.touched.date
                  ? "form-control is-invalid date"
                  : "date"
              }
            />
            {formik.errors.date ? (
              <div className="invalid-feedback date">{formik.errors.date}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>qunatity</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADD quantity"
              name="quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              className={
                formik.errors.quantity && formik.touched.quantity
                  ? "form-control is-invalid quantity"
                  : "quantity"
              }
            />
            {formik.errors.quantity ? (
              <div className="invalid-feedback quantity">
                {formik.errors.quantity}
              </div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>unitprice</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADD quantity"
              name="unitprice"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.unitprice}
              className={
                formik.errors.unitprice && formik.touched.unitprice
                  ? "form-control is-invalid quantity"
                  : "quantity"
              }
            />
            {formik.errors.unitprice ? (
              <div className="invalid-feedback quantity">
                {formik.errors.unitprice}
              </div>
            ) : (
              ""
            )}
          </Form.Group>
        </Form.Row>
      
        {/* text area */}
        <Form.Group controlId="desciption">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="ADD Description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={
              formik.errors.description && formik.touched.description
                ? "form-control is-invalid description"
                : "description"
            }
          />
          {formik.errors.description ? (
            <div className="invalid-feedback description">
              {formik.errors.description}
            </div>
          ) : (
            ""
          )}
        </Form.Group>
        <Button variant="success" type="submit" className="submitbtn m-2">
          Submit
        </Button>
      </Form>
    </div>
  );
}
