import React from "react";

import {useHistory} from 'react-router-dom'
import { Container,Row, Col,Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";
toast.configure();

export default function Producteditdetails({test}) {
let history =useHistory()
  
const productid = test.productid;



  const initialValues = {

    product: ""||test.productname,
    size: ""||test.size,
    units: ""||test.units,
    unitprice:""||test.unitprice,
    quantity: ""||test.quantity,
    color: ""||test.color,
    description: ""||test.description,
  };

  // console.log(initialValues)

  const onSubmit = (values) => {
        try {
          axios
            .put (`http://localhost:5000/product/productstep3`,{...values,productid})
            .then((resp) => {
              console.log(resp);
              if (resp.data.message === "updated") {
                toast.success(`${resp.data.message}`, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
                history.push({pathname:"/home/product/product"});
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
    description: Yup.string().required("please Add description")
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
          <Form className="login_form" onSubmit={formik.handleSubmit} >
         <Form.Label>STEP 3</Form.Label>
        <Form.Group controlId="formBasicEmail">

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
              value={formik.values.size}
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
        <Button variant="success" type="submit" className="submitbtndetails m-2">
          update
        </Button>
        </Form>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}
