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

    const [submitDataFormat, setSubmitDataFormat] = useState({
        result: [
            {
                vendor: [
                    {
                        vendor: "mahin",
                        email: "xsdfsf@google.com",
                        address: "habijabi",
                        order_deadline: "2022-03-10",
                        mobile: "1236486"
                    }
                ],
                products: []
            }
        ]
    });

    const [products, setProducts] = useState([]);
    // const [productDetails, setProductDetails] = useState();
    const [selectedProducts, setSelectedProducts] = useState();

    const [selectedProductsData, setSelectedProductsData] = useState({});

    useEffect(() => {
        findSelectProductData(selectedProducts)
    }, [selectedProducts]);

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
                // console.log("all product", jsonData);
                setProducts(jsonData);
            })
    }, []);

    useEffect(() => {
        setSelectedVendor(vendors[0]);
    }, [vendors]);

    useEffect(() => {
        setSelectedProducts(products[0]?.id);
    }, [products]);

    const handleOnChangeVendor = (e) => {
        setSelectedVendor(e.target.value);

        let currentVendor = vendors?.find(vendor => vendor.id == e.target.value);
        // console.log("currentVendor", currentVendor);
        setSelectedVendor(currentVendor);
        // setProductDetails(currentVendor);

        const mobile = document.getElementById("mobile");
        mobile.value = currentVendor.mobile;

        const email = document.getElementById("email");
        email.value = currentVendor.email;

        const address = document.getElementById("address");
        address.value = currentVendor.address;

        // console.log(currentVendor);
    }

    const addTableRow = () => {
        const newData = { ...submitDataFormat };
        newData.result[0].products.unshift(selectedProductsData);
        console.log("spd",selectedProductsData);
        setSubmitDataFormat(newData);
        console.log("sdf",submitDataFormat);
    }
    
    const findSelectProductData = (id) => {
        const url = `https://vatdj.herokuapp.com/purchase/product_details/${id}/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(result => {
                console.log("result", result);
                setSelectedProductsData(result);
                if (result.insertedId) {
                    alert("Got product successfully!");
                    reset();
                }
            });
    }

    const onSubmit = data => {
        data.vendor = selectedVendor.name;

        submitDataFormat.result[0].vendor = data;

        const url = `https://vatdj.herokuapp.com/purchase/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitDataFormat)
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.insertedId) {
                    alert("Purchase invoice is added successfully.");
                    reset();
                }
            });
        console.log("data", submitDataFormat);
    };
    return (
        <div>
            <Menubar />
            <h2 className="my-3">Purchase Invoice</h2>
            <h4 className="text-start ms-5">Vendor Info</h4>
            <form className="purchase-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="submit" value="Purchase" className="" />
                <div className="d-flex justify-content-around">
                    <select onChange={(e) => handleOnChangeVendor(e)} value={selectedVendor?.id} name="vendor" id="vendor">
                        {/* <option value="">vendor</option> */}
                        {
                            vendors?.map((vendor, index) => (
                                // console.log("vendor", vendor.description, index);
                                <option value={vendor?.id} key={index}>{`${vendor?.name}`} </option>
                            ))
                        }
                    </select>
                    <input id="mobile" type="tel" placeholder="Mobile" {...register("mobile", { required: true, maxLength: 12 })} />
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
                        {
                            submitDataFormat.result[0].products.map((product, index) => (
                                <tr key={index}>
                                    <td id="col0">{product.product_name}</td>
                                    <td id="col1">{product.product_variant}</td>
                                    <td id="col2">{product.hs_code}</td>
                                    <td id="col3">{product.uom}</td>
                                    <td id="col4">{product.cd}</td>
                                    <td id="col5">{product.sd}</td>
                                    <td id="col6">{product.vat}</td>
                                    <td id="col7">{product.ait}</td>
                                    <td id="col8">{product.rd}</td>
                                    <td id="col9">{product.atv}</td>
                                </tr>
                                // console.log(product)
                            ))
                        }
                        <tr>
                            <td id="col0">
                                <select onChange={(e) => setSelectedProducts(e.target.value)} value={selectedProducts?.id} name="product" id="product">
                                    {
                                        products?.map((product, index) => <option value={product?.id} key={index}>{product?.name}</option>)
                                    }
                                </select>
                            </td>
                            <td id="col1">{selectedProductsData.product_variant}</td>
                            <td id="col2">{selectedProductsData.hs_code}</td>
                            <td id="col3">{selectedProductsData.uom}</td>
                            <td id="col4">{selectedProductsData.cd}</td>
                            <td id="col5">{selectedProductsData.sd}</td>
                            <td id="col6">{selectedProductsData.vat}</td>
                            <td id="col7">{selectedProductsData.ait}</td>
                            <td id="col8">{selectedProductsData.rd}</td>
                            <td id="col9">{selectedProductsData.atv}</td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <Button onClick={() => addTableRow()} variant="secondary" size="sm">
                        Add Product
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default Purchase;