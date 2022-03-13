import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Menubar from '../../Shared/Menubar/Menubar';

const PurchaseList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://vatdj.herokuapp.com/purchase/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData.result);
                console.log("list", jsonData.result[0].products[0]);
                setList(jsonData.result);
            })
    }, []);

    const goToDetailsPage = (itemProducts, itemNumber) => {
        // console.log(e.target.parentNode);
        // console.log(itemProducts, itemNumber);
        window.location.href = `/productDetails/${itemNumber}`;

    };

    return (
        <div>
            <Menubar />
            <div>
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
                                    <td id='col0' onClick={() => goToDetailsPage(item.products, index)}>{item?.vendor[0]?.vendor}</td>
                                    <td id='col1' onClick={() => goToDetailsPage(item.products, index)}>{item?.vendor[0]?.email}</td>
                                    <td id='col2' onClick={() => goToDetailsPage(item.products, index)}>{item?.vendor[0]?.mobile}</td>
                                    <td id='col3' onClick={() => goToDetailsPage(item.products, index)}>{item?.vendor[0]?.address}</td>
                                    <td id='col4' onClick={() => goToDetailsPage(item.products, index)}>{item?.vendor[0]?.order_deadline}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <div>
                    {/* <Button onClick={() => addTableRow()} variant="secondary" size="sm">
                        Add Product
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default PurchaseList;