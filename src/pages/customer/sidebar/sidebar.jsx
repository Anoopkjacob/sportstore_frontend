import React, { useState, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { Form } from "react-bootstrap";
// import { useFormik } from "formik";
import axios from "axios";


export default function Sidebar({setDataoutside,Dataoutside}) {
  const uicss = {
    backgroundColor: "rgb(134, 197, 230)",
    // backgroundColor:"red",
    display: "flex",
    aligItems: "center",
    justifyContent: "center",
    marginLeft: "-20px",
    marginTop: "50px",

  };

  const [DataBrand, setDataBrand] = useState([]);
  const [DataCat, setDataCat] = useState([]);
  
  
  const [catselect, setcatselect] = useState(null)
  const [brandselect, setBrandselect] = useState(null)


  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios({
          method: "Get",
          url: "http://localhost:5000/product/brandGet",
        }).then((resp) => {
          const response = resp.data;
          setDataBrand(response)
          setBrandselect(response[0]._id)
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      async function userdatfetch2() {
        await axios({
          method: "Get",
          url: `http://localhost:5000/product/categoreyGet`,
        }).then((resp) => {
          const response = resp.data
          setDataCat(response)
          setcatselect(response[0]._id)
        });
      }
      userdatfetch2();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios
          .post("http://localhost:5000/product/filterporduct", {
            categoreydrop: catselect,
            branddrop: brandselect,
          })
          .then((resp) => {
            const response = resp.data;
            setDataoutside(response)
            if(response.length===0)setDataoutside("noproducts")
      
          });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }

  }, [catselect,brandselect,setDataoutside]);

  // const initialValues = {
  //   categoreydrop: "",
  //   branddrop: "",
  //   subcatdrop: "",
  // };

  // const formik = useFormik({
  //   initialValues,
  // });

  return (
    <aside
      style={uicss}
      className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left pr-4 "
    >
      <ul
        style={{ listStyleType: "none", marginTop: "150px" ,width:"10rem"}}
        className="mr-4"
      >
        <IoFilterSharp /> Filter
      <li
       style={{ listStyleType: "none", marginTop: "10px" }}
       className="mr-4"
      >
      <Form>
            <Form.Row>
          <Form.Group controlId="exampleForm.SelectCustomSizeSm" >
            <Form.Control as="select"
             size="sm" 
            custom  
            style={{width:"10rem"}}
            onClick={(e)=>setcatselect(e.target.value)}
            >
              {DataCat.length &&
                DataCat.map((item) => {
                  return (
                    (
                      <option key={1} value="">
                        choose categorey
                      </option>
                    ),
                    (
                      <option key={item.categoreyid} value={item._id}>
                        {item.categoreyname}
                      </option>
                    )
                    );
                  })}
               </Form.Control>
            </Form.Group>
         </Form.Row>
         </Form>
      </li>
        
      <li
       style={{ listStyleType: "none", marginTop: "10px",maxWidth:"100%" }}
       className="mr-4"
      >
      <Form>
            <Form.Row>
          <Form.Group controlId="exampleForm.SelectCustomSizeSm">
            <Form.Control as="select" 
            size="md" 
            custom 
            style={{width:"10rem" }}
            onClick={(e)=>setBrandselect(e.target.value)}
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
            </Form.Group>
        </Form.Row>
        </Form>
      </li>
     

      </ul>
    </aside>
  );
}



 

  