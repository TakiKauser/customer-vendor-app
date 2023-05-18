import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UrlContext } from '../../../App';
import Menubar from '../../Shared/Menubar/Menubar';
import ProductDetails from '../ProductDetails/ProductDetails';

const PurchaseList = () => {
    const [list, setList] = useState([]);
    const [details, setDetails] = useState(false);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}purchase/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                setList(jsonData.result);
            })
    }, [apiDomain]);

    const goToDetailsPage = (itemProducts) => {
        // console.log(itemProducts?.vendor[0]?.id);

        // get item details
        fetch(`${apiDomain}purchase/details/${itemProducts?.vendor[0]?.id}/`)
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
                <h4 className="text-start ms-5 my-4">Purchase Invoice List</h4>
                <Table id="table" striped bordered hover className="sm">
                    <thead>
                        <tr>
                            <th>Vendor Name</th>
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
                                    <td id='col0' onClick={() => goToDetailsPage(item)}>{item?.vendor[0]?.vendor}</td>
                                    <td id='col1' onClick={() => goToDetailsPage(item)}>{item?.vendor[0]?.email}</td>
                                    <td id='col2' onClick={() => goToDetailsPage(item)}>{item?.vendor[0]?.mobile}</td>
                                    <td id='col3' onClick={() => goToDetailsPage(item)}>{item?.vendor[0]?.address}</td>
                                    <td id='col4' onClick={() => goToDetailsPage(item)}>{item?.vendor[0]?.order_deadline}</td>
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

export default PurchaseList;