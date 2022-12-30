import React from "react";
import axios from "axios";

const URL = "http://localhost:8000/api/units";

export default function Unit(props) {
    function deleteUnit(_id) {
        axios.delete((URL + "/" + _id)).then(() => window.location.reload());
    }

    function handleDelete() {
        if (window.confirm(`Are you sure you want to delete unit #${props.unit.unitNum} ?`)) {
            if (window.confirm(`Double checking! Do you REALLY want to delete unit #${props.unit.unitNum} with tenant '${props.unit.tenant}' ?`)) {
                deleteUnit(props.unit._id);
            }
        }
    }

    return(
        <div className="card my-4 mx-2">
            <div className="card-header d-flex justify-content-between">
                <b>Unit #{props.unit.unitNum}, BR/BA: {props.unit.BRBA}</b>
                <b>{props.unit.tenant}</b>
            </div>
            <div className="card-body text-center">
                <div className="mb-3 d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
                    <button className="btn btn-primary">Edit</button>
                </div>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th>Rent: </th>
                        <td>{props.unit.rent}</td>
                        <th>Deposit: </th>
                        <td>{props.unit.deposit}</td>
                    </tr>
                    <tr>
                        <th>Remote Control Deposit: </th>
                        <td>{props.unit.remoteControlDeposit}</td>
                        <th>Move in Date: </th>
                        <td>{props.unit.moveinDate.slice(0, 10)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}