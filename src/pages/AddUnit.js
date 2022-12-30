import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUnit() {
    const [units, setUnits] = React.useState([]);
    const [unit, setUnit] = React.useState({});

    let navigate = useNavigate();

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/units').then(res => {
            setUnits(res.data);
        })
    }, []);

    function handleChange(key, value) {
        let temp = unit;
        temp[key] = value;
        setUnit(temp);
    }

    function handleSubmit(e) {
        // Prevent from refreshing.
        e.preventDefault();

        axios.post('http://localhost:8000/api/units', unit).then( () => {
            setUnit({});
            navigate('/');
        });
    }

    function getAvailableUnum(units) {
        let arr = Array.from({length: 50}, (_, i) => i + 1);
        for (let i = 0; i < units.length; i++) {
            let index = arr.indexOf(units[i].unitNum);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        return arr;
    }

    return (
        <div className="card m-2">
        <h5 className="card-header bg-success text-light">Add a new unit</h5>
        <div className="card-body">

            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <small><b>Unit Number:</b></small>
                    <select className="form-control" required onChange={e => handleChange('unitNum', e.target.value)}>
                        <option value=""></option>
                        {getAvailableUnum(units).map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                <small><b>Tenant Name:</b></small>
                <input className="form-control" type="text" required onChange={e => handleChange('tenant', e.target.value)}></input>
                </div>
                <div className="form-group">
                    <small><b>BR/BA:</b></small>
                    <input className="form-control" type="text" required onChange={e => handleChange('BRBA', e.target.value)}></input>
                </div>
                <div className="form-group">
                    <small><b>Rent:</b></small>
                    <input className="form-control" type="number" required onChange={e => handleChange('rent', e.target.value)}></input>
                </div>
                <div className="form-group">
                    <small><b>Deposit:</b></small>
                    <input className="form-control" type="number" required onChange={e => handleChange('deposit', e.target.value)}></input>
                </div>
                <div className="form-group">
                    <small><b>Remote Control Deposit:</b></small>
                    <input className="form-control" type="number" required onChange={e => handleChange('remoteControlDeposit', e.target.value)}></input>
                </div>
                <div className="form-group">
                    <small><b>Date:</b></small>
                    <input className="form-control" type="date" required onChange={e => handleChange('moveinDate', e.target.value)}></input>
                </div>
                <div className="form-group">
                    <button className="form-control mt-4 btn btn-primary" type="submit">Submit</button>
                    <button className="form-control mt-4 btn btn-danger" onClick={() => { setUnit({}); navigate('/'); }}>Cancel</button>
                </div>
            </form>

        </div>
    </div>
    )
}