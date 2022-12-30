import React from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

export default function EditUnit() {
    const { _id } = useParams();
    const URL = 'http://localhost:8000/api/units/' + _id
    let navigate = useNavigate();

    const [unit, setUnit] = React.useState({});

    React.useEffect(() => {
        axios.get((URL)).then(res => {
            setUnit(res.data);
        });
        // eslint-disable-next-line
    }, []);

    function handleChange(key, value) {
        let temp = unit;
        temp[key] = value;
        setUnit(temp);
    }

    function handleSubmit(e) {
        // Prevent from refreshing.
        e.preventDefault();

        axios.patch(URL, unit).then( () => {
            setUnit({});
            navigate('/');
        });
    }

    return(
        <div className="card m-2">
            <h5 className="card-header bg-info text-light">Edit unit #{unit.unitNum}</h5>
            <div className="card-body">

                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <small><b>Unit Number:</b></small>
                        <input className="form-control border-0" type="number" value={unit.unitNum || ''} readOnly></input>
                    </div>
                    <div className="form-group">
                        <small><b>Tenant Name:</b></small>
                        <input className="form-control" type="text" placeholder={unit.tenant} onChange={e => handleChange('tenant', e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <small><b>BR/BA:</b></small>
                        <input className="form-control" type="text" placeholder={unit.BRBA} onChange={e => handleChange('BRBA', e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <small><b>Rent:</b></small>
                        <input className="form-control" type="number" placeholder={unit.rent} onChange={e => handleChange('rent', e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <small><b>Deposit:</b></small>
                        <input className="form-control" type="number" placeholder={unit.deposit} onChange={e => handleChange('deposit', e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <small><b>Remote Control Deposit:</b></small>
                        <input className="form-control" type="number" placeholder={unit.remoteControlDeposit} onChange={e => handleChange('remoteControlDeposit', e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <small><b>Date:</b></small>
                        <input className="form-control" type="date" onChange={e => handleChange('moveinDate', e.target.value)}></input>
                    </div>
                    <div className="form-group">
                        <button className="form-control mt-4 btn btn-info" type="submit">Edit</button>
                        <button className="form-control mt-4 btn btn-danger" onClick={() => { setUnit({}); navigate('/'); }}>Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    )
}