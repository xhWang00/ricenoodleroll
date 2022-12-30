import React from "react";
import { useParams } from 'react-router-dom';

export default function EditUnit() {
    let { _id } = useParams();

    return(
        <p>{_id}</p>
    )
}