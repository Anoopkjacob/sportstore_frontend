import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import InputColor from "react-input-color";
import { toast } from "react-toastify";
import { storage } from "../../../utils/firebase";
import { IoIosCloudUpload } from "react-icons/io";
import axios from "axios";

// default kits

import one from "../../../Assets/images/kits/one.png";
import two from "../../../Assets/images/kits/two.png";
import three from "../../../Assets/images/kits/three.png";
import four from "../../../Assets/images/kits/four.png";

export default function Jersey() {
  const history = useHistory();
  toast.configure();
  const initial = "#18ededb8";

  const [defaultkit, setdefaultkit] = useState("");
  const [primarycolor, setPrimaryColor] = useState({});
  const [Secondarycolor, setSecondaryColor] = useState({});
  const [imageurl, setimageurl] = useState("");
  const [discrption, setdiscrption] = useState("");
  const [xl, setxl] = useState(0);
  const [xxl, setxxl] = useState(0);
  const [xxxl, setxxxl] = useState(0);
  const [S, setS] = useState(0);
  const [L, setL] = useState(0);
  const [M, setM] = useState(0);

  // image
  const [image, Setimage] = useState(null);
  const [error, Seterror] = useState("");
  const [loading, Setloading] = useState(true);

  // errors
  const [imageerror, Setimageerror] = useState("");
  const [colorerror, setcolorerr] = useState("");
  const [sizeerror, setsizeerror] = useState("");
  const [descerror, setdescerror] = useState("");



  const selected = {
    borderColor: "red",
    borderWidth: "3px",
  };
  const nonselected = {
    borderColor: "blue",
    borderWidth: "0px",
  };

 

  const handleChange2 = (e) => {
    if (e.target.files.length === 0) {
      Seterror("No image selected");
    } else {
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/))
        Seterror("Please select valid image.");
      else if (e.target.files[0].name);
      Setimage(e.target.files[0]);
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/))
        Seterror("Please select valid image.");
      else if (e.target.files[0].name) Seterror("");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Seterror("required");
    } else if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      Seterror("Please select valid image.");
    } else {
      try {
        Setloading(false);
        console.log(image.name);
        const uploadTask = storage
          .ref(`jerseyorderimages/${image.name}`)
          .put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("jerseyorderimages")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setimageurl(url);
                Setloading(true);
              });
          }
        );
      } catch (e) {
        console.log(e.data);
      }
    }
  };


  const onsubmit = () => {
    if (imageurl === "" && defaultkit === "") {
      Setimageerror("upload jersey image or select one of the default design");
      return;
    } else Setimageerror("");

    if (
      primarycolor.hex === "#18ededb8" &&
      Secondarycolor.hex === "#18ededb8"
    ) {
      setcolorerr("select primary and secondary color from color picker");
      return;
    } else if (primarycolor.hex === Secondarycolor.hex) {
      setcolorerr("primary and secondary should be different");
      return;
    } else setcolorerr("");



    if (xl === "") {
      setxl(0);
      return;
    }else if(!(/^\+?(0|[1-9]\d*)$/.test(xl)))
    {
      setsizeerror("xl is a number only feild");
      return;
    }
     else setsizeerror("");

    if (xxl === "") {
      setxxl(0);
      return;
    }else if(!(/^\+?(0|[1-9]\d*)$/.test(xxl)))
    {
      setsizeerror("xxl is a number only feild");
      return;
    } else setsizeerror("");

    if (xxxl === "") {
      setxxxl(0);
      return;
    }else if(!(/^\+?(0|[1-9]\d*)$/.test(xxxl)))
    {
      setsizeerror("xxxl is a number only feild");
      return;
    } else setsizeerror("");

    if (S === "") {
    setS(0);
      return;
    }else if(!(/^\+?(0|[1-9]\d*)$/.test(S)))
    {
      setsizeerror("S is a number only feild");
      return;
    } else setsizeerror("");
    if (M === "") {
     setM(0);
      return;
    }else if(!(/^\+?(0|[1-9]\d*)$/.test(M)))
    {
      setsizeerror("M is a number only feild");
      return;
    } else setsizeerror("");
    if (L === "") {
     setL(0);
      return;
    }else if(!(/^\+?(0|[1-9]\d*)$/.test(L)))
    {
      setsizeerror("L is a number only feild");
      return;
    } else setsizeerror("");

  if(xl<=0 && xxl<=0 && xxxl<=0  && S<=0 && M<=0 && L<=0)
  {
   setsizeerror("please add no of jersey to respective inputs");
    return;
   }

    if (discrption === "") {
      setdescerror("please enter discription");
      return;
    } else setdescerror("");

    try {
      axios
        .post(`http://localhost:5000/jersey/add`, {
          loginid: localStorage.getItem("loginid"),
          default: defaultkit,
          imageurl: imageurl,
          primarycolor: primarycolor.hex,
          Secondarycolor: Secondarycolor.hex,
           xl:xl,
           xxl:xxl,
           xxxl:xxxl,
          S:S,
          L:L,
          M:M,
          discrption: discrption,
        })
        .then((resp) => {
          if (resp.data.message === "successfull") {
            toast.success(`${resp.data.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            history.push({ pathname: "/sportsstore" });
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

  return (
    <Container fluid="sm" className="mainconatiner">
      <Row className="center_row">
        <Col>
          <Form className="register_form p-5 ">
            <h1 className="p-3 ">Custom jesrey</h1>
            <Form.Label>Default jersey select one</Form.Label>
            <Form.Row className="ml-4">
              <Form.Group as={Col} controlId="formGridjeserykit">
                <Button
                  onClick={() => setdefaultkit("one")}
                  onDoubleClick={() => setdefaultkit("")}
                  style={defaultkit === "one" ? selected : nonselected}
                >
                  <Image src={one} width="100vh" height="100vh" rounded />
                  <Form.Text>ONE</Form.Text>
                </Button>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridjeserykit">
                <Button
                  onClick={() => setdefaultkit("two")}
                  onDoubleClick={() => setdefaultkit("")}
                  style={defaultkit === "two" ? selected : nonselected}
                >
                  <Image src={two} width="100vh" height="100vh" rounded />
                  <Form.Text>TWO</Form.Text>
                </Button>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridjeserykit">
                <Button
                  onClick={() => setdefaultkit("three")}
                  onDoubleClick={() => setdefaultkit("")}
                  style={defaultkit === "three" ? selected : nonselected}
                >
                  <Image src={three} width="100vh" height="100vh" rounded />
                  <Form.Text>THREE</Form.Text>
                </Button>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridjeserykit">
                <Button
                  onClick={() => setdefaultkit("four")}
                  onDoubleClick={() => setdefaultkit("")}
                  style={defaultkit === "four" ? selected : nonselected}
                >
                  <Image src={four} width="100vh" height="100vh" rounded />
                  <Form.Text>FOUR</Form.Text>
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Text className="text-center" style={{ color: "red" }}>
              {imageerror}
            </Form.Text>
            <Form.Row className="text-center">
              <Form.Group as={Col} controlId="formGridprimarycolor">
                <Form.Text>primary color</Form.Text>
                <InputColor initialValue={initial} onChange={setPrimaryColor} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSecondarycolor">
                <Form.Text>secondarycolor</Form.Text>
                <InputColor
                  initialValue={initial}
                  onChange={setSecondaryColor}
                />
              </Form.Group>
            </Form.Row>
            <Form.Text className="text-center" style={{ color: "red" }}>
              {colorerror}
            </Form.Text>
            <Form.Row className="text_left">
              <Form.Label>Upload Jersey Image</Form.Label>
              {loading ? (
                <Form.Group as={Col} controlId="formGridimageupload">
                  <input type="file" onChange={handleChange2} />
                  {error ? <span style={{ color: "red" }}>{error}</span> : ""}
                  {
                    <span style={{ color: "green", fontSize: "15px" }}>
                      {imageurl !== "" ? "one file uploaded success" : ""}
                    </span>
                  }
                  {error === "" ? (
                    <Button
                      variant="dark"
                      type="submit"
                      className="submitbtn p-2 m-4"
                      onClick={handleUpload}
                    >
                      <span>
                        upload <IoIosCloudUpload />
                      </span>
                    </Button>
                  ) : (
                    ""
                  )}
                </Form.Group>
              ) : (
                <Spinner className="ml-4 p-2" animation="border" />
              )}
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>XL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No of Jersey"
                  name="xl"
                  onChange={(e) => setxl(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>XXL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No of Jersey"
                  name="xl"
                  onChange={(e) => setxxl(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>XXXL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No of Jersey"
                  name="xl"
                  onChange={(e) => setxxxl(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>S</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No of Jersey"
                  name="xl"
                  onChange={(e) => setS(e.target.value)}
                />
                     </Form.Group>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>M</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No of Jersey"
                  name="xl"
                  onChange={(e) => setM(e.target.value)}
                />
                 </Form.Group>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>L</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="No of Jersey"
                  name="xl"
                  onChange={(e) => setL(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Text className="text-center" style={{ color: "red" }}>
              {sizeerror}
            </Form.Text>
            <Form.Row>
              <Form.Group as={Col} controlId="desciption">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="Add Description"
                  name="description"
                  onChange={(e) => setdiscrption(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Text className="text-center pb-4" style={{ color: "red" }}>
              {descerror}
            </Form.Text>

            <Button variant="success" type="button" onClick={() => onsubmit()}>
              Submit
            </Button>
            <Form.Text style={{ color: "red" }}>
              Warning * The unit price for Customi jersey is 100rps 
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
