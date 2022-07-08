import React from 'react'
import {Image} from "react-bootstrap";

export default function Productimage({Rows}) {
    return (
        <div>
            <a href={Rows.original.licence}>
            <Image src={Rows.original.licence} height="50px" width="50px" alt="no image" />
            </a>
            
        </div>
    )
}
