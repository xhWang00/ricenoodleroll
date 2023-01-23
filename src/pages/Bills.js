import React from "react";
import axios from "axios";
import BillsTable from "../components/BillsTable";
import { useParams, useNavigate } from 'react-router-dom';

export default function Bills() {
    const year = useParams().year;
    const [units, setUnits] = React.useState([]);
    let navigate = useNavigate();

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/units').then(res => {
            setUnits(res.data);
        });
    }, []);

    return (
        <div className="container">
            <button className="btn btn-primary mt-4" onClick={() => {navigate('/')}}>Return to Home</button>

            {units.map(unit => (
                <BillsTable unit={unit} year={year} key={unit._id}/>
            ))}
        </div>
    )
}