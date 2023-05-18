import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UrlContext } from '../../../../App';
import Menubar from '../../../Shared/Menubar/Menubar';

const CategoryList = () => {
    const [productCategoryList, setProductCategoryList] = useState([]);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}product/product_variant/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                setProductCategoryList(jsonData);
            })
    }, [apiDomain]);
    return (
        <div>
            <Menubar />
            <div>
                <h4 className="text-start ms-5 my-4">CategoryList</h4>
                <Table id="table" striped bordered hover className="sm">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>HS Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productCategoryList?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.hs_code}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default CategoryList;