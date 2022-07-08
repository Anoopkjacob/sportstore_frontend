import React from "react";

import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

toast.configure();

export default function DeleteButton({ Rows }) {
  // const userid =localStorage.getItem('loginid');
  const billid = Rows.billid;
  console.log( Rows.productId.productid);
  console.log( Rows.noofitems);

  const handlepage = () => {
    try {
      axios
        .post(`http://localhost:5000/bill/billitemDelete`, {
          billid,
          productid: Rows.productId.productid,
          quantity: Rows.noofitems,
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
    <div>
      <Button
        variant="danger"
        type="submit"
        className="m-2 "
        onClick={() => handlepage()}
      >
        <FaTimes />
      </Button>
    </div>
  );
}
