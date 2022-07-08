import React from 'react'
import {Image} from "react-bootstrap";

export default function Productimage({Rows}) {
    return (
        <div>
            <Image src={Rows.original.url} height="50px" width="50px" alt="no image" />
        </div>
    )
}
