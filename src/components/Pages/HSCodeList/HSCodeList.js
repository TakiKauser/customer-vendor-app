import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UrlContext } from '../../../App';
import Menubar from '../../Shared/Menubar/Menubar';

const HSCodeList = () => {
    const [codeList, setCodeList] = useState([]);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}product/hs_code/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                setCodeList(jsonData);
            })
    }, [apiDomain]);
    return (
        <div>
            <Menubar />
            <div>
                <h4 className="text-start ms-5 my-4">Customs Tariff</h4>
                <Table id="table" striped bordered hover className="sm">
                    <thead>
                        <tr>
                            <th>HS Code</th>
                            <th>Description</th>
                            <th>uom</th>
                            <th>ait</th>
                            <th>atv</th>
                            <th>cd</th>
                            <th>sd</th>
                            <th>rd</th>
                            <th>vat</th>
                            <th>tti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            codeList?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.hs_code}</td>
                                    <td>{item?.description}</td>
                                    <td>{item?.uom}</td>
                                    <td>{item?.ait}</td>
                                    <td>{item?.atv}</td>
                                    <td>{item?.cd}</td>
                                    <td>{item?.sd}</td>
                                    <td>{item?.rd}</td>
                                    <td>{item?.vat}</td>
                                    <td>{item?.tti}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default HSCodeList;