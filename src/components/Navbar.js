import React from "react";
import { useNavigate } from "react-router-dom";

export default function Narbar(props) {
    let navigate = useNavigate();

    return (
        <div className="card m-2">
            <div className="card-header">
                <div className="row">
                    <div className="col-7">
                        <button className="btn btn-success" onClick={() => navigate('/AddUnit')}>Add unit</button>
                        <button className="btn btn-secondary mx-1" onClick={() => navigate('/Bills')}>Bills</button>
                    </div>
                    <div className="col-5">
                        <input className="form-control" type="month" onChange={e => props.handleSetDate(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}