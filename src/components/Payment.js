import React from "react";

export default function Payment(props) {

    let paymentFilterd = props.payments.filter(p => {
        return p.unitId === props.unitId;
    })

    return (
        <div>
            
            <table className="table border">
                <thead className="bg-dark text-light">
                    <tr>
                        <th>Delete</th>
                        <th>Amount</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {paymentFilterd.map( p => (
                        <tr>
                            <td><button className="btn btn-danger btn-sm">🗙</button></td>
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