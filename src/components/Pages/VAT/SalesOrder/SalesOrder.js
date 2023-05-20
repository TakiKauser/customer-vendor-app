import React, { useContext, useEffect, useState } from 'react';
import Menubar from '../../../Shared/Menubar/Menubar';
import { Button, Table } from 'react-bootstrap';
import { UrlContext } from '../../../../App';

const SalesOrder = () => {

    const [salesData, setSalesData] = useState([]);
    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}vat/so/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log(jsonData);
                setSalesData(jsonData.result);
            })
    }, []);
    console.log("purchaseData", salesData)   
    return (
        <div>
            <Menubar />
            <div>
                <h4 className="text-start ms-5">VAT on Sale Order</h4>
                <Table id="emptyTable" striped bordered hover className="">
                    <thead>
                        <tr>
                            <th>SO ID</th>
                            <th>Customer</th>
                            <th>Total Amount</th>
                            <th>VAT Receivable</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salesData.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.customer}</td>
                                    <td>{product.so_id}</td>
                                    <td>{product.so_total}</td>
                                    <td>{product.vat_total}</td>
                                    <td>{product.date}</td>
                                    
                                </tr>
                            ))
                    
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SalesOrder;