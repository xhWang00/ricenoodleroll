import React from "react";
import axios from "axios";

import Narbar from "../components/Navbar";
import Unit from "../components/Unit";

export default function Home() {
    const [units, setUnits] = React.useState([]);
    const [payments, setPayments] = React.useState([]);
    const [deposits, setDeposits] = React.useState([]);
    const [date, setDate] = React.useState({});

    function handleSetDate(selectedDate) {
        let year = parseInt(selectedDate.substring(0, 4));
        let month = parseInt(selectedDate.substring(5, 7) - 1);
        setDate(() => {
            return (
                {
                    year: year,
                    month: month
                }
            );
        });
        axios.get('http://localhost:8000/api/payments/byDate/' + year + "/" + month).then(res => {
            setPayments(res.data);
        });
    }

    React.useEffect(() => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        setDate(() => {
            return (
                {
                    year: year,
                    month: month
                }
            );
        });
        axios.get('http://localhost:8000/api/units').then(res => {
            setUnits(res.data);
        });
        axios.get('http://localhost:8000/api/payments/byDate/' + year + "/" + month).then(res => {
            setPayments(res.data);
        });
        axios.get('http://localhost:8000/api/payments/deposit/all').then(res => {
            setDeposits(res.data);
        })
    }, []);

    return (
        <div>
            <Narbar handleSetDate={handleSetDate}/>
            
            {units.map(unit => (
                <Unit key={unit._id} unit={unit} date={date} payments={payments} deposits={deposits}/>
            ))}

        </div>
    )
}