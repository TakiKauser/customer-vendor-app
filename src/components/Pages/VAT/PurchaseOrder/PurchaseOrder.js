import React, { useContext, useEffect, useState } from 'react';
import Menubar from '../../../Shared/Menubar/Menubar';
import { Button, Table } from 'react-bootstrap';
import { UrlContext } from '../../../../App';

const PurchaseOrder = () => {
    const [purchaseData, setPurchaseData] = useState([]);
    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}vat/po/`)
            .then(response => response.json())
            .then(jsonData => {
                setPurchaseData(jsonData.result);
            })
    }, []);

    return (
        <div>
            <Menubar />
            <div>
                <h4 className="text-center py-3 ms-5">VAT on Purchase Order</h4>
                <Table id="emptyTable" striped bordered hover className="">
                    <thead>
                        <tr>
                            <th>PO ID</th>
                            <th>Vendor</th>
                            <th>Total Amount</th>
                            <th>VAT Payable</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchaseData.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.po_id}</td>
                                    <td>{product.vendor}</td>
                                    <td>{product.po_total}</td>
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

export default PurchaseOrder;