import React from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

export default function AddPayment() {
    const {unitId, year, month} = useParams();
    let navigate = useNavigate();

    let dateList = getDateList(year, month);

    const [payment, setPayment] = React.useState({
        year: year,
        month: month,
        unitId: unitId,
        isDeposit: "false"
    });

    function handleChange(key, value) {
        let temp = payment;
        temp[key] = value;
        setPayment(temp);
    }

    function handleSubmit(e) {
        // Prevent from refreshing.
        e.preventDefault();

        console.log(payment);

        axios.post('http://localhost:8000/api/payments', payment).then( () => {
            setPayment({
                year: year,
                month: month,
                unitId: unitId,
                isDeposit: "false"
            });
            navigate('/');
        });
    }

    function getDateList(year, month) {
        if (month === 2) {
            if (year % 4 === 0) {
                return Array.from({length: 29}, (_, i) => i + 1);
            }
            else return Array.from({length: 28}, (_, i) => i + 1);
        }
        else if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1) {
            return Array.from({length: 30}, (_, i) => i + 1);
        }

        return Array.from({length: 31}, (_, i) => i + 1);
    }

    return (
        <div className="card m-2">
            <h5 className="card-header bg-success text-light">Add a payment</h5>
            <div className="card-body">

                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <small><b>Amount:</b></small>
                        <input className="form-control" type="number" onChange={e => {handleChange('amount', e.target.value)}} required></input>
                    </div>
                    <div className="form-group">
                        <small><b>Comment:</b></small>
                        <input className="form-control" type="text" onChange={e => {handleChange('comment', e.target.value)}} required></input>
                    </div> 
                    <div className="form-group">
                        <small><b>This payment is a ...</b></small>
                        <select className="form-control" onChange={e => {handleChange('isDeposit', e.target.value)}} required>
                            <option value="false">Rent</option>
                            <option value="true">Deposit</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <small><b>Date: </b></small>
                        <select className="form-control" onChange={e => {handleChange('day', e.target.value)}} required>
                            <option value=''></option>
                            
                            {dateList.map( day => (
                                <option value={day}>{year}-{parseInt(month) + 1}-{day}</option>
                            ))}

                        </select>

                    </div>
                    <div className="form-group">
                        <button className="form-control mt-4 btn btn-success" type="submit">Add</button>
                        <button className="form-control mt-4 btn btn-danger" onClick={() => { setPayment({}); navigate('/'); }}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    )
}