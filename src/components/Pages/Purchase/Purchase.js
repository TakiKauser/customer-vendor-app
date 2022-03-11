import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Purchase.css';
import Menubar from '../../Shared/Menubar/Menubar';
import { Button, Table } from 'react-bootstrap';

const Purchase = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState();
    const [productDetails, setProductDetails] = useState();

    useEffect(() => {
        fetch(`https://vatdj.herokuapp.com/parties/list/vendors/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log(jsonData);
                setVendors(jsonData);
            })
    }, []);

    useEffect(() => {
        fetch(`https://vatdj.herokuapp.com/product/product_list/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log(jsonData);
                setProducts(jsonData);
            })
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //       setValue("country", "India");
    //     }, 2000);
    //   }, [setValue]);

    const handleOnChangeVendor = (e) => {
        setSelectedVendor(e.target.value);

        let currentVendor = vendors?.find(vendor => vendor.id == e.target.value);

        const mobile = document.getElementById("mobile");
        mobile.value = currentVendor.mobile;

        const email = document.getElementById("email");
        email.value = currentVendor.email;

        const address = document.getElementById("address");
        address.value = currentVendor.address;

        // console.log(currentVendor);
    }
    const handleOnChangeProduct = (e) => {
        setSelectedProducts(e.target.value);
        // console.log(selectedProducts.id);

        const url = `https://vatdj.herokuapp.com/purchase/product_details/${e.target.value}/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.value })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setProductDetails(result);
                if (result.insertedId) {
                    alert("Got product successfully!");
                    reset();
                }
            });
        console.log("Det", productDetails);
        // let currentProduct = products?.find(vendor => vendor.id == e.target.value);

        const variant = document.getElementById("col1");
        variant.innerHTML = productDetails?.product_variant;

        const hs_code = document.getElementById("col2");
        hs_code.innerHTML = productDetails?.hs_code;

        const uom = document.getElementById("col3");
        uom.innerHTML = productDetails?.uom;

        const cd = document.getElementById("col4");
        cd.innerHTML = productDetails?.cd;

        const sd = document.getElementById("col5");
        sd.innerHTML = productDetails?.sd;

        const vat = document.getElementById("col6");
        vat.innerHTML = productDetails?.vat;

        const ait = document.getElementById("col7");
        ait.innerHTML = productDetails?.ait;

        const rd = document.getElementById("col8");
        rd.innerHTML = productDetails?.rd;

        const atv = document.getElementById("col9");
        atv.innerHTML = productDetails?.atv;

    }

    const addTableRow = () => {
        const table = document.getElementById("emptyTable");
        const rowCount = table.rows.length;
        const cellCount = table.rows[0].cells.length;
        const row = table.insertRow(rowCount);

        for (let i = 0; i < cellCount; i++) {
            let cell = 'cell' + i;
            cell = row.insertCell(i);
            const copyCell = document.getElementById('col' + i).innerHTML;
            cell.innerHTML = copyCell;
            // if (i == 0) {

            // }
        }
    }

    const onSubmit = data => {
        // data.vendor = selectedVendor;
        const url = ``;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.insertedId) {
                    alert("Purchase invoice is added successfully.");
                    reset();
                }
            });
        // console.log(data);
    };
    return (
        <div>
            <Menubar />
            <h2 className="my-3">Purchase Invoice</h2>
            <h4 className="text-start ms-5">Vendor Info</h4>
            <form className="purchase-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-around">
                    <select onChange={(e) => handleOnChangeVendor(e)} value={selectedVendor?.id} name="vendor" id="vendor">
                        {/* <option value="">vendor</option> */}
                        {
                            vendors?.map((vendor, index) => (
                                // console.log("vendor", vendor.description, index);
                                <option value={`${vendor?.id}`} key={index}>{`${vendor?.name}`} </option>
                            ))
                        }
                    </select>
                    <input id="mobile" type="tel" placeholder="Mobile" value={selectedVendor?.mobile} {...register("mobile", { required: true, maxLength: 12 })} />
                </div>
                <div className="d-flex">
                    <input id="email" type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    <input id="address" type="text" placeholder="Address" {...register("address", { required: true })} />
                    <input type="datetime-local" placeholder="order_deadline" {...register("order_deadline", { required: true })} />
                </div>

                {/* <input type="submit" value="Purchase" /> */}
            </form>
            <div>
                <h4 className="text-start ms-5">Products</h4>
                <Table id="emptyTable" striped bordered hover className="">
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <td>1</td> */}
                            <td id="col0">
                                <select onChange={(e) => handleOnChangeProduct(e)} value={selectedProducts?.id} name="product" id="product">
                                    {
                                        products?.map((product, index) => (
                                            <option value={`${product?.id}`} key={index}>{`${product?.name}`} </option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td id="col1"></td>
                            <td id="col2"></td>
                            <td id="col3"></td>
                            <td id="col4"></td>
                            <td id="col5"></td>
                            <td id="col6"></td>
                            <td id="col7"></td>
                            <td id="col8"></td>
                            <td id="col9"></td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <Button onClick={() => addTableRow()} variant="secondary" size="sm">
                        Add Product
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Purchase;


{/* <tr> */ }
{/* <td>Jacob</td> */ }
{/* <td>Thornton</td> */ }
{/* <td>@fat</td> */ }
{/* <td>Jacob</td> */ }
{/* <td>Thornton</td> */ }
{/* <td>@fat</td> */ }
{/* <td>Jacob</td> */ }
{/* <td>Thornton</td> */ }
{/* <td>@fat</td> */ }
{/* <td>@fat</td> */ }
// </tr>