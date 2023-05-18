import React from 'react';
import { Table } from 'react-bootstrap';

const ProductDetails = ({ details }) => {

    // console.log(details)
    return (
        <div>
            {
                (details?.purchase_data || details?.sales_data) &&
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="text-start">
                        <div className="">{details?.purchase_data?.vendor ? "Vendor:" : "Customer:"}{details?.purchase_data?.vendor || details?.sales_data?.customer}</div>
                        <div className="">Address:{details?.purchase_data?.address || details?.sales_data?.address}</div>
                        <div className="">Email: {details?.purchase_data?.email || details?.sales_data?.email}</div>
                        <div className="">Mobile: {details?.purchase_data?.mobile || details?.sales_data?.mobile}</div>
                        <div className="fw-bold">Invoice Total: {details?.purchase_data?.invoice_total || details?.sales_data?.invoice_total}</div>
                    </div>
                </div>
            }
            {
                (details?.purchase_data_details || details?.sales_data_details) &&
                <div>
                    <h4 className="text-start ms-5">Product Details</h4>
                    <Table id="emptyTable" striped bordered hover className="">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Variant</th>
                                <th>HS Code</th>
                                <th>UOM</th>
                                <th>CD</th>
                                <th>SD</th>
                                <th>VAT</th>
                                <th>AIT</th>
                                <th>RD</th>
                                <th>ATV</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>TTI</th>
                                <th>TTI Amount</th>
                                <th>Total Payable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.purchase_data_details &&
                                details?.purchase_data_details.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.product_id}</td>
                                        <td>{product.product_variant}</td>
                                        <td>{product.hs_code}</td>
                                        <td>{product.uom}</td>
                                        <td>{product.cd}</td>
                                        <td>{product.sd}</td>
                                        <td>{product.vat}</td>
                                        <td>{product.ait}</td>
                                        <td>{product.rd}</td>
                                        <td>{product.atv}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                            {
                                details?.sales_data_details &&
                                details?.sales_data_details.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.product_id}</td>
                                        <td>{product.product_variant}</td>
                                        <td>{product.hs_code}</td>
                                        <td>{product.uom}</td>
                                        <td>{product.cd}</td>
                                        <td>{product.sd}</td>
                                        <td>{product.vat}</td>
                                        <td>{product.ait}</td>
                                        <td>{product.rd}</td>
                                        <td>{product.atv}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    );
};

export default ProductDetails;