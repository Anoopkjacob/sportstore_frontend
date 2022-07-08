import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button,Image } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import axios from "axios";

export default function Cartcards({ data }) {
  const dbquntity = data.quantity;
  const history = useHistory();
  const [plusminusbutton, setplusminusbutton] = useState(true);
  const [qtnityinp, setqtnityinp] = useState(dbquntity);
  const [error, seterror] = useState(false);


  const inputhandlechange = (value) => {
    // if(qtnityinp===undefined)  setqtnityinp(dbquntity)
    if (/^\+?(0|[1-9]\d*)$/.test(value)) {
      setqtnityinp(value);
      seterror(false);
    } else {
      setqtnityinp(value);
      seterror(true);
    }
  };

  const updateqty = () => {
    try {
      if (qtnityinp ===""){
        toast.error("please add quantity", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
        else if(qtnityinp <= 0)
        {
          toast.error("Quantity must be greater than 0", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        
      }
       else {
        axios
          .post(`http://localhost:5000/cart/update`, {
            id: data._id,
            qunatity: qtnityinp,
            productid:data.productid.productid,
          })
          .then((resp) => {
            console.log(resp);
            if (resp.data.message === "cart updated") {
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
              }, 2000);
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

  const closeupdate = () => {
    setplusminusbutton(!plusminusbutton);
    setqtnityinp(data.quantity);
    seterror(false);
  };

  const handlepage = () => {
    try {
      axios
        .post(`http://localhost:5000/cart/singlestockcheck`, {
          id: data._id,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.message === "stock") {
            history.push({
              pathname: "/sportsstore/payement",
              state: data.totalprice,
              payfrom: "cart",
              reqid: data.productid.productid,
              quantity:dbquntity,
              cartid:data._id,
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

  const minusaction = () => {
    if (data.quantity === 1) {
      toast.error("atleast 1", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        axios
          .post(`http://localhost:5000/cart/minus`, {
            unitprice: data.productid.unitprice,
            productid: data.productid.productid,
            quantity: data.quantity,
            _id: data._id,
          })
          .then((resp) => {
            console.log(resp);

            if (resp.data.message === "cart updated") {
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
              }, 2000);
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
    }
  };

  const plusaction = () => {
    if (data.productid.quantity === 0) {
      toast.error("stocke is less", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      // }else if(data.quantity===4){
      //   toast.error("your limit has exceed", {
      //     position: "bottom-right",
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     progress: undefined,
      //   });
    } else {
      try {
        axios
          .post(`http://localhost:5000/cart/plus`, {
            unitprice: data.productid.unitprice,
            productid: data.productid.productid,
            quantity: data.quantity,
            _id: data._id,
          })
          .then((resp) => {
            console.log(resp);

            if (resp.data.message === "cart updated") {
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
              }, 2000);
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
    }
  };

  const cartdelete = (_id) => {
    try {
      axios
        .post(`http://localhost:5000/cart/delete`, {
          _id,
          quantity: data.quantity,
          productid: data.productid.productid,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.message === "deleted") {
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

  return (
    <Card
      style={{ width: "70rem" }}
      text="dark"
      className="text-center p-4 m-4"
    >
      <Card.Header style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="danger" onClick={() => cartdelete(data._id)}>
          <GrClose />
        </Button>
      </Card.Header>
      <Card.Body className="p-2">
        <Card.Title className="p-1">{data.productid.productname}</Card.Title>
        <Card.Text className="text-center">
          <span>
          <Image width="100vh" height="100vh" className="m-1" src={data.productid.url} alt="image"/>
          <strong>
            size:{data.productid.size}
            {data.productid.units} || Color:
            {data.productid.color} || Price:{data.productid.unitprice}
            {" || "}
          </strong>
          </span>
          <span>
            <strong>Quantity</strong>
            {plusminusbutton ? (
              <Button
                variant="danger"
                type="submit"
                className="m-2 minus"
                onClick={() => minusaction()}
              >
                <FaMinus />
              </Button>
            ) : (
              <Button
                variant="danger"
                type="submit"
                className="m-2 plus"
                onClick={() => closeupdate()}
              >
                <GrClose />
              </Button>
            )}
           
            <input
              type="text"
              style={{width:"100px"}}
              value={qtnityinp}
              onClick={() => setplusminusbutton(false)}
              onChange={(e) => inputhandlechange(e.target.value)}
            />

            {plusminusbutton ? (
              <Button
                variant="success"
                type="submit"
                className="m-2 plus"
                onClick={() => plusaction()}
              >
                <FaPlus />
              </Button>
            ) : (
              <Button
                variant="warning"
                type="submit"
                className="m-2 plus"
                onClick={() => updateqty()}
              >
                update
              </Button>
            )}
            <strong>|| price: </strong>
            <input type="text" value={data.totalprice} readOnly style={{width:"100px"}} />

            <Button className="ml-4 p-2" onClick={() => handlepage()}>
              Buy
            </Button>
          </span>
          {error && <small style={{ color: "red" }}>number only allowed</small>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
