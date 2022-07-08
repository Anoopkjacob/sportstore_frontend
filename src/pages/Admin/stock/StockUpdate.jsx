import React from "react";


import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { toast } from "react-toastify";
toast.configure();

export default function StockUpdate({ Rows }) {
  // console.log(Rows)
  const initialValues = {
    quantity: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values)
    try {
      axios
        .put(`http://localhost:5000/product/stockupdate`, {
          ...values,
          productid: Rows.original.productid,
        })
        .then((resp) => {
          console.log(resp);

          if (resp.data.message === "stock updated") {
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
    quantity: Yup.number("only number allowed")
      .required("please Add quantity")
      .moreThan(0, "positive number"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Form className="login_form" onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          id={Rows.original.productid}
          type="text"
          placeholder="ADD"
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
      <Button variant="primary" type="submit" className="submitbtn m-2">
       update
      </Button>
    </Form>
  );
}
