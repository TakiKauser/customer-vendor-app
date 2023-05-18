import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UrlContext } from '../../../../App';
import Menubar from '../../../Shared/Menubar/Menubar';

const VendorList = () => {
    const [vendorList, setVendorList] = useState([]);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}parties/list/vendors/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                setVendorList(jsonData);
            })
    }, [apiDomain]);
    return (
        <div>
            <Menubar />
            <div>
                <h4 className="text-start ms-5 my-4">Vendor List</h4>
                <Table id="table" striped bordered hover className="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Tax ID</th>
                            <th>Is Customer</th>
                            <th>Is Vendor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vendorList?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    <td>{item?.customer_type}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.mobile}</td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.address}</td>
                                    <td>{item?.Tax_ID}</td>
                                    <td>{(item?.is_customer) ? 'Yes' : 'No'}</td>
                                    <td>{(item?.is_vendor) ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default VendorList;