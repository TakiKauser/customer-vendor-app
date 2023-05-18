import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UrlContext } from '../../../App';
import Menubar from '../../Shared/Menubar/Menubar';
import ProductDetails from '../ProductDetails/ProductDetails';

const SalesList = () => {
    const [list, setList] = useState([]);
    const [details, setDetails] = useState(false);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}sales/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                // console.log("list", jsonData.result[0].products[0]);
                setList(jsonData.result);
            })
    }, [apiDomain]);

    const goToDetailsPage = (itemProducts) => {
        // console.log(itemProducts);

        // get item details
        fetch(`${apiDomain}sales/details/${itemProducts?.customer[0]?.id}/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("details", jsonData);
                setDetails(jsonData);
            })
    };

    return (
        <div>
            <Menubar />
            <div className={details ? "d-none" : "d-flex flex-column"}>
                <h4 className="text-start ms-5 my-4">Sales Invoice List</h4>
                <Table id="table" striped bordered hover className="sm">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Adress</th>
                            <th>Order Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list?.map((item, index) => (
                                <tr key={index}>
                                    <td id='col0' onClick={() => goToDetailsPage(item)}>{item?.customer[0]?.customer}</td>
                                    <td id='col1' onClick={() => goToDetailsPage(item)}>{item?.customer[0]?.email}</td>
                                    <td id='col2' onClick={() => goToDetailsPage(item)}>{item?.customer[0]?.mobile}</td>
                                    <td id='col3' onClick={() => goToDetailsPage(item)}>{item?.customer[0]?.address}</td>
                                    <td id='col4' onClick={() => goToDetailsPage(item)}>{item?.customer[0]?.order_deadline}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <div className={details?.puchase_data && ""}>
                <ProductDetails details={details} />
            </div>
        </div>
    );
};

export default SalesList;