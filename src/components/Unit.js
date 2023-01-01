import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Payment from "./Payment";

const URL = "http://localhost:8000/api/units";

export default function Unit(props) {
    const navigate = useNavigate();

    let paymentFiltered = props.payments.filter(p => {
        return p.unitId === props.unit._id;
    });
    let depositFiltered = props.deposits.filter(d => {
        return d.unitId === props.unit._id;
    });

    let rentSum = getRentSum(paymentFiltered);
    let rentLeft = getRentLeftToPay(props.unit.rent, rentSum);
    let depositSum = getDepositSum(depositFiltered);
    let depositLeft = getRentLeftToPay( (props.unit.deposit + props.unit.remoteControlDeposit), depositSum);


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

    function handleEdit() {
        navigate('/EditUnit/' + props.unit._id);
    }

    function handelNewPayment() {
        navigate('/AddPayment/' + props.unit._id + '/' + props.date.year + '/' + props.date.month);
    }

    function getRentSum(payments) {
        let sum = 0;
        // eslint-disable-next-line
        payments.map( p => {
            if (!p.isDeposit) {
                sum += p.amount;            
            }
        });
        return sum;
    }

    function getDepositSum(deposits) {
        let sum = 0;
        // eslint-disable-next-line
        deposits.map( d => {
            if (d.isDeposit) {
                sum += d.amount
            }
        });
        return sum;
    }

    function getRentLeftToPay(rent, paied) {
        return (rent - paied) <= 0 ? 0 : (rent - paied);
    }

    function rentStatus(rentLeft) {
        if (rentLeft > 0) {
            return ' bg-warning';
        }
        return '';
    }

    return(
        <div className="card my-4 mx-2">
            <div className={"card-header d-flex justify-content-between" + rentStatus(rentLeft)}>
                <b>Unit #{props.unit.unitNum}, BR/BA: {props.unit.BRBA}</b>
                <b>{props.unit.tenant}</b>
            </div>
            <div className="card-body text-center">
                <div className="mb-3 d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
                    <button className="btn btn-info text-light" onClick={() => handleEdit()}>Edit</button>
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
                    <tr>
                        <th>Rent paid this month:</th>
                        <td>{rentSum}</td>
                        <th>Rent left to be paied</th>
                        <td>{rentLeft}</td>
                    </tr>
                    <tr>
                        <th>Deposit paid</th>
                        <td>{depositSum}</td>
                        <th>Deposit left to be paied</th>
                        <td>{depositLeft}</td>
                    </tr>
                    </tbody>
                </table>

                <Payment unitId={props.unit._id} payments={paymentFiltered}/>

                <button className="btn btn-success" onClick={() => {handelNewPayment()}}>New Payment</button>

            </div>
        </div>
    )
}