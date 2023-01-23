import React from "react";
import axios from "axios";

export default function BillsTable(props) {
    const [bills, setBills] = React.useState([]);
    const URL = 'http://localhost:8000/api/bills/' + props.unit._id + '/' + props.year;

    let total = 0;
    bills.forEach(bill => {
        total += bill.amount;
    });

    React.useEffect(() => {
        axios.get(URL).then(res => {
            setBills(res.data);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="card my-4">
            <div className={"card-header d-flex justify-content-between"}>
                <b>Unit #{props.unit.unitNum}</b>
                <b>{props.unit.tenant}</b>
            </div>

            <div className="card-body">
                <table className="table table-sm table-bordered">
                    <thead className="bg-light">
                        <tr>
                            <th>Amount</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bills.map(bill => (
                                <tr key={bill._id}>
                                    <td>{bill.amount}</td>
                                    <td>{bill.comment}</td>
                                    <td>{bill.year}-{bill.month + 1}-{bill.day}</td>
                                    <td>{bill.isDeposit ? 'Deposit' : 'Rent'}</td>
                                </tr>
                        ))}
                    </tbody>

                </table>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Total</th>
                            <th>{total}</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    );
}