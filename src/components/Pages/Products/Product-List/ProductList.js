import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UrlContext } from '../../../../App';
import Menubar from '../../../Shared/Menubar/Menubar';

const ProductList = () => {
    const [productList, setProductList] = useState([]);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}product/product_list/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                setProductList(jsonData);
            })
    }, [apiDomain]);
    return (
        <div>
            <Menubar />
            <div>
                <h4 className="text-start ms-5 my-4">Product List</h4>
                <Table id="table" striped bordered hover className="sm">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Product Type</th>
                            <th>Manufacturer</th>
                            <th>Available in po</th>
                            <th>Available in so</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.product_category}</td>
                                    <td>{item?.product_type}</td>
                                    <td>{item?.manufacturer}</td>
                                    <td>{(item?.available_in_po) ? 'Yes' : 'No'}</td>
                                    <td>{(item?.available_in_so) ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ProductList;