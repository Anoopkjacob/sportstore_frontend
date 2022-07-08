import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import IMAGE from "../../registration/Imagefirebase";
toast.configure();

export default function Company(props) {
  const [imagelink, setimagelink] = useState("");
  const [Data, setData] = useState(true);
  const [Companyname, setcompanyname] = useState("");
  const [Branch, setbranch] = useState("");
  const [Badgge, setbadgge] = useState("");


  useEffect(() => {
    try {
      if(props.match.params.id===localStorage.getItem("myemail"))
      {
      async function userdatfetch() {
        await axios({
          method: "Post",
          url: "http://localhost:5000/app/profileGet",
          data: {
            email: localStorage.getItem("myemail"),
          },
        }).then((resp) => {
          // console.log(resp.data)
          setcompanyname(resp.data.companyname);
          setbranch(resp.data.branch);
          setbadgge(resp.data.badge);
          setimagelink(resp.data.licence);
          
        });
      }
      userdatfetch();
    }else{
      setData(false)
    }
    } catch (e) {
      console.error(e);
    }
  }, [props.match.params.id]);


  const initialValues = {
    companyname: Companyname,
    branch: Branch,
    badgge: Badgge,
  };



  const onSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      if (imagelink === null) {
        toast.error(`please upload Documents`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        axios
          .put(`http://localhost:5000/app/companyEdit`, {
            ...values,
            licence: imagelink,
            email: localStorage.getItem("myemail"),
          })
          .then((resp) => {
            if (resp.data.message === "profile updated") {
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
      }
    } catch (e) {
      console.log(e.data);
    }
  };

  const validationSchema = Yup.object({
    companyname: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Company Name is required"),

    branch: Yup.string()
      .min(4, "Too Short!")
      .max(16, "Too Long!")
      .required("Branch is required"),

    badgge: Yup.string()
      .min(4, "Too Short!")
      .max(8, "Too Long!")
      .required("Badge is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  });

  if (Data) {
    return (
      <Container>
        <Row>
          <Col>
            <Form className="register_form p-5 " onSubmit={formik.handleSubmit}>
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
                <Form.Group
                  as={Col}
                  controlId="formGridRegNo"
                  className="text-center"
                >
                  <Form.Label>LICENCES</Form.Label>
                  <IMAGE setimagelink={setimagelink} />
                </Form.Group>
              </Form.Row>
              <Button variant="danger" type="submit">
                Edit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Its Not a Valid user ( please use your email )</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}
