import React,{useEffect,useState} from 'react'
import {Container ,Row,Col} from "react-bootstrap";
import {Doughnut} from 'react-chartjs-2'
import axios from "axios"

export default function Chart() {
const [DATA, setDATA] = useState([])

useEffect(() => {
    try {
      async function userdatfetch1() {
        await axios({
          method: "Get",
          url: "http://localhost:5000/supplier/totalcount",
        }).then((resp) => {
          const response = resp.data;
          setDATA(response);
        });
      }
      userdatfetch1();
    } catch (e) {
      console.error(e);
    }
  }, []);

    return (
        <Container>
        <Row>
        <h1>REQUEST HISTORY</h1>
        <Col>

            <Doughnut
             data={{
                labels: DATA.map(item=>{return item._id.status}),
                datasets: [{
                    label: '# of Votes',
                    data: DATA.map(item=>{return item.count}),
                    backgroundColor: [
                        'red',
                        'blue',
                        'green'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 2
                }]
             }}
             height={400}
             width={600}
             options={{
                 maintainAspectRatio:false,
                 
             }}
            />
       </Col>
        </Row>
      </Container>
    )
}
