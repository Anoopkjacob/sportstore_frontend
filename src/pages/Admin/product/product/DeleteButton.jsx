import React from "react";
import { Button } from "react-bootstrap";
import { IoTrashSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";

export default function DeleteButton({ Rows }) {
 
  toast.configure();

  const handlepage = async () => {
      try {
          await axios
          .delete(
              `http://localhost:5000/product/productdelete?proid=${Rows.original._id}`
              )
              .then((res) => {
                  const response = res.data;
                  if (response.message === "Product deleted") {
                      toast.success(`${response.message}`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                        });
                        window.location.reload(false)
                    } else {
            toast.error(`${response.message}`, {
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
      console.error(e);
    }
  };
  return (
    <div>
      <Button variant="danger" className="m-2 " onClick={() => handlepage()}>
        <IoTrashSharp />
      </Button>
    </div>
  );
}
