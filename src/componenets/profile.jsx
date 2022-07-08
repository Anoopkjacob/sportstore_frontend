import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image,Spinner } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { MdCloudUpload } from "react-icons/md";
import { storage } from "../utils/firebase";


toast.configure();
export default function Profile() {
  const [username, setName] = useState("");
  const[id,setid]=useState("")
  const [userphone, setPhone] = useState("");
  const [useraddress, setAddress] = useState("");
  const [userzip, setZip] = useState("");
  const [usercity, setCity] = useState("");
  const [usetype, setusetype] = useState("");
  const [hashpass, sethashpass] = useState("");
  const [url, seturl] = useState("");


  const [image, Setimage] = useState(null);
  const [error, Seterror] = useState("");
  const [loading, Setloading] = useState(true);

  useEffect(() => {
    try {
      const sessionemail = localStorage.getItem("myemail");
      async function userdatfetch() {
        await axios({
          method: "Post",
          url: "http://localhost:5000/app/profileGet",
          data: {
            email: sessionemail,
          },
        }).then((resp) => {
          setid(resp.data.email);
          setName(resp.data.name);
          setPhone(resp.data.phone);
          setAddress(resp.data.address);
          setZip(resp.data.zip);
          setCity(resp.data.city);
          setusetype(resp.data.type);
          sethashpass(resp.data.password);
          seturl(resp.data.url);
        });
      }
      userdatfetch();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const initialValues = {
    name: username,
    email: localStorage.getItem("myemail"),
    phone: userphone,
    password: "",
    address: useraddress,
    city: usercity,
    zip: userzip,
    usetype: usetype,
  };

  const onSubmit = (values) => {
    const sendata = { ...values, usetype: usetype, hash: hashpass };
    // axios.post(`http://localhost:5000/app/profileEdit`,values)
    console.log(sendata);
    try {
      axios
        .put(`http://localhost:5000/app/profileEdit`, sendata)
        .then((resp) => {
          if (resp.request.status === 200) {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
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
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().matches(
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
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  });

  const handleChange = (e) => {
    if(e.target.files.length===0)Seterror("Please select image.");
    else{
    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/))  Seterror("Please select valid image.");
    else if(e.target.files[0].name) Setimage(e.target.files[0]);

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/))  Seterror("Please select valid image.");
    else if(e.target.files[0].name) Seterror(""); 
    }
   };

   const handleUpload = async () => {
  
    if(!image){
        Seterror("required")
    } 
    else if(!image.name.match(/\.(jpg|jpeg|png|gif)$/))
    {
        Seterror("Please select valid image.");
    }
    else{
      
    try {
      Setloading(false);
      console.log(image.name);
      const uploadTask = storage.ref(`profileimage/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("profileimage")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              axios
                .put(`http://localhost:5000/app/imageupload`, {
                  url: url,
                  id:localStorage.getItem("loginid"),
                })
                .then((resp) => {
                  console.log(resp);
                  Setloading(true);
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
                    setTimeout(() => {
                      window.location.reload(false);
                    }, 100);
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
            });
        }
      );
    } catch (e) {
      console.log(e.data);
    }
  }
  };

if(loading){
  return (
    <div>
      <Container fluid="sm" className="mainconatiner">
        <Row className="center_row mt-3">
          <Col>
            <Form className="register_form p-5 " onSubmit={formik.handleSubmit}>
              <h1 className="p-3 ">
                PROFILE
                <Image
                  src={url}
                  width="100px"
                  height="100px"
                  roundedCircle
                  style={{ marginLeft: "80vh" }}
                />
                <Button
                  variant="warning"
                  onClick={() => handleUpload()}
                  className="ml-2"
                  style={{ marginTop: "5vh" }}
                > 
                  <MdCloudUpload />
                </Button>
              </h1>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Group style={{ marginLeft: "90vh"}}>
                  <label className="m-1"><strong>Profile pic</strong></label>  
                  <input type="file" onChange={handleChange} placeholder="profile pic"/>
                  {error?<span style={{color:"red"}}>{error}</span>:""}
                  </Form.Group>
                  <Form.Label>NAME</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    //   value={userdata.name}
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
                  <Form.Label>
                    if you want to change password type here,otherwise leave it
                    blank
                  </Form.Label>
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
              <Button variant="danger" type="submit">
                EDIT
              </Button>
              
               {
                localStorage.getItem("role")==="supplier"?
               <Link to={{ pathname:`/supplierhome/companydetails/${id}`}} className="mt-2">
                 EDIT COMPANY DETAILS
               </Link>
               
              :""
             }
             
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
if(!loading){
  return(
    <Container>
      <Row>
        <Col>
      <Spinner animation="border" />
        </Col>
      </Row>
    </Container>
  );
}

}
