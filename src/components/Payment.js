import React from "react";
import axios from "axios";

export default function Payment(props) {

    function handleDeletePayment(_id) {
        if (window.confirm("Do you really want to delet this payment?")) {
            axios.delete(('http://localhost:8000/api/payments/' + _id)).then(() => window.location.reload());
        }
    }

    return (
        <div>
            
            <table className="table border">
                <thead className="bg-secondary text-light">
                    <tr>
                        <th>Delete</th>
                        <th>Amount</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {props.payments.map( p => (
                        <tr key={p._id}>
                            <td><button className="btn btn-danger btn-sm" onClick={() => handleDeletePayment(p._id)}>🗙</button></td>
                            <td>{p.amount}</td>
                            <td>{p.comment}</td>
                            <td>{p.year}-{p.month + 1}-{p.day}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}