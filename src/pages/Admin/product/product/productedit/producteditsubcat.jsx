import React, { useState} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { TiArrowRightThick } from "react-icons/ti";
import axios from "axios";

import Productdetails from './producteditdetails'

import { toast } from "react-toastify";
toast.configure();

export default function Producteditsubcat({test,DataSubCat,nextbutton,subcatone}) {
    const [buttonrender, setbuttonrender] = useState(false)
    const productid = test.productid;

   
    // const subcatdropname=test.subcatno.subcategoreyname;
    // let subcatdropid=test.subcatno.subcategoreyid;

   
    

    
  const initialValues = {
    subcatdrop: "" ||subcatone
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {

    console.log(values)
      try {
        axios
          .put(`http://localhost:5000/product/productstep2`, {
            ...values,
            productid,
          })

          .then((resp) => {
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
              setbuttonrender(true)
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

  const formik = useFormik({
    initialValues,
    onSubmit,

  });
  return (
    <div>
        {buttonrender === true ?( 
        <Productdetails test={test}/>
        ):(
      <Container>
        <Row>
          <Col>
            <Form className="login_form" onSubmit={formik.handleSubmit}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>STEP 2</Form.Label>
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
              <Button variant="success" type="submit" className="submitbtn m-2">
              update
              </Button>
 {nextbutton  ?
              <Button variant="warning" type="button" className="submitbtn m-2" onClick={()=>setbuttonrender(true)}>
                Next <TiArrowRightThick/>
              </Button>:""}
   

            </Form>
          </Col>
        </Row>
      </Container>
        )}
    </div>
  );
}
