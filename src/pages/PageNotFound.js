import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    let navigate = useNavigate();

    return (
        <div className="card m-2">
            <h5 className="card-header bg-danger">404: Page Not Found.</h5>
            <div className="card-body">
                <h5 className="card-title">Page Not Found.</h5>
                <p className="card-text">This page does not exist.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Return to Home page</button>
            </div>
        </div>
    )
}