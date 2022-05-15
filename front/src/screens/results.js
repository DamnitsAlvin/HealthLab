import React from "react";

export default function Results(){
    return(
        <div className="tableform">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                <div className="col-sm-6">
                    <h2>Online Results Page</h2>
                </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Lab Request ID</th>
                    <th>Doctor ID</th>
                    <th>Field</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>PDF File</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                </tr>
                <tr>
                    <td>
                    Ex APP ID
                    </td>
                    <td>ex DOC ID</td>
                    <td>ex FIELD</td>
                    <td>ex DATE</td>
                    <td>ex TIME</td>
                    <td>ex STATUS</td>
                    <td><button>Print</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    );
}