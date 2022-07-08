import React,{useState} from 'react'
import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

export default function Rating({item}) {
const [rate, setrate] = useState(0)

console.log(item)
const submit=()=>{
try {
      axios
        .post(`http://localhost:5000/product/rateinsert`, {
          cartid:item._id,
          prodid:item.productid._id,
          rates:rate
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.message === "rate added") {
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
}

  
const ratingChanged = (newRating) => {
    setrate(newRating)
  };
   
    return (
        <span>
      Product rating: 
      <ReactStars
            value={rate}
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
        />
      {
  rate!==0 ?
  <Button variant="success"className="m-2" onClick={()=>submit()}>submit</Button>:""}
        </span>

    )
}
