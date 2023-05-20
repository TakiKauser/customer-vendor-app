import React, { useContext, useEffect, useState } from 'react';
import Menubar from '../../Shared/Menubar/Menubar';
import { useForm } from 'react-hook-form';
import { UrlContext } from '../../../App';
import { Button, Table } from 'react-bootstrap';

const SalesInvoice = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const apiDomain = useContext(UrlContext);

    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState();

    const [submitDataFormat, setSubmitDataFormat] = useState({
        result: [
            {
                customer: [
                    {
                        customer: "",
                        email: "",
                        address: "",
                        order_deadline: "",
                        mobile: ""
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

    // editable table field
    // const [inEditMode, setInEditMode] = useState({
    //     status: false,
    //     rowKey: null
    // });

    const [unitPrice, setUnitPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    // const onEdit = ({ id, currentUnitPrice }) => {
    //     setInEditMode({
    //         status: true,
    //         rowKey: id
    //     })
    //     setUnitPrice(currentUnitPrice);
    // }

    useEffect(() => {
        findSelectProductData(selectedProducts)
    }, [selectedProducts]);

    useEffect(() => {
        fetch(`${apiDomain}parties/list/customers/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log(jsonData);
                setVendors(jsonData);
            })
    }, [apiDomain]);

    useEffect(() => {
        fetch(`${apiDomain}product/product_list/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("all product", jsonData);
                setProducts(jsonData);
            })
    }, [apiDomain]);

    // useEffect(() => {
    //     setSelectedVendor(vendors[0]);
    // }, [vendors]);

    // useEffect(() => {
    //     setSelectedProducts(products[0]?.id);
    // }, [products]);

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
        // console.log("spd", selectedProductsData);
        setSubmitDataFormat(newData);
        // console.log("sdf", submitDataFormat);
    }

    const findSelectProductData = (id) => {
        const url = `${apiDomain}sales/sales_details/${id}/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => response.json())
            .then(result => {
                // console.log("result", result);
                setSelectedProductsData(result);
                if (result.insertedId) {
                    alert("Got product successfully!");
                    reset();
                }
            });
    }

    const onSubmit = data => {
        data.customer = selectedVendor.name;

        submitDataFormat.result[0].customer = data;
        for (let i = 0; i < submitDataFormat.result[0].products.length; i++) {
            let pd = submitDataFormat.result[0].products[i]
            submitDataFormat.result[0].products[i].total = (pd?.unit_price * pd?.unit_quantity) || ""
            submitDataFormat.result[0].products[i].tti = (pd.cd + pd.sd + pd.vat + pd.ait + pd.rd + pd.atv) || ""
            submitDataFormat.result[0].products[i].tti_amount = ((((pd.cd + pd.sd + pd.vat + pd.ait + pd.rd + pd.atv) || 0) * ((pd?.unit_price * pd?.unit_quantity) || 0)) / 100) || ""
            submitDataFormat.result[0].products[i].total_payable = (((pd?.unit_price * pd?.unit_quantity) || 0) + (((((pd.cd + pd.sd + pd.vat + pd.ait + pd.rd + pd.atv) || 0) * ((pd?.unit_price * pd?.unit_quantity) || 0)) / 100) || 0))
           
          }
        const url = `${apiDomain}sales/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitDataFormat)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
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
            <h2 className="my-3">Sales Invoice</h2>
            <h4 className="text-start ms-5">Customer Info</h4>
            <form className="purchase-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="submit" value="Sales" className="" />
                <div className="d-flex justify-content-around">
                    <select onChange={(e) => handleOnChangeVendor(e)} value={selectedVendor?.id} name="customer" id="vendor">
                        <option value="">Select Customer</option>
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
                            submitDataFormat.result[0].products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product_name}</td>
                                    <td>{product.product_variant}</td>
                                    <td>{product.hs_code}</td>
                                    <td>{product.uom}</td>
                                    <td>{product.cd}</td>
                                    <td>{product.sd}</td>
                                    <td>{product.vat}</td>
                                    <td>{product.ait}</td>
                                    <td>{product.rd}</td>
                                    <td>{product.atv}</td>
                                    <td>{product?.unit_price || ""}</td>
                                    <td>{product?.unit_quantity || ""}</td>
                                    <td>{(product?.unit_price * product?.unit_quantity) || 0}</td>
                                    <td>{product.cd + product.sd + product.vat + product.ait + product.rd + product.atv}</td>
                                    <td>{((((product.cd + product.sd + product.vat + product.ait + product.rd + product.atv) || 0) * ((product?.unit_price * product?.unit_quantity) || 0)) / 100) || ""}</td>
                                    <td>{(((product?.unit_price * product?.unit_quantity) || 0) + (((((product.cd + product.sd + product.vat + product.ait + product.rd + product.atv) || 0) * ((product?.unit_price * product?.unit_quantity) || 0)) / 100) || 0)) || ""}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td id="col0">
                                <select onChange={(e) => setSelectedProducts(e.target.value)} value={selectedProducts?.id} name="product" id="product">
                                    <option value="">Select Product</option>
                                    {
                                        products?.map((product, index) => <option value={product?.id} key={index}>{product?.name}</option>)
                                    }
                                </select>
                            </td>
                            <td>{selectedProductsData.product_variant}</td>
                            <td>{selectedProductsData.hs_code}</td>
                            <td>{selectedProductsData.uom}</td>
                            <td>{selectedProductsData.cd}</td>
                            <td>{selectedProductsData.sd}</td>
                            <td>{selectedProductsData.vat}</td>
                            <td>{selectedProductsData.ait}</td>
                            <td>{selectedProductsData.rd}</td>
                            <td>{selectedProductsData.atv}</td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData?.unitPrice} onChange={(e) => setSelectedProductsData({ ...selectedProductsData, unit_price: e.target.value })} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData?.unit_quantity} onChange={(e) => setSelectedProductsData({ ...selectedProductsData, unit_quantity: e.target.value })} /></td>
                            <td>{(selectedProductsData?.unit_price * selectedProductsData?.unit_quantity) || ""}</td>
                            <td>{(selectedProductsData.cd + selectedProductsData.sd + selectedProductsData.vat + selectedProductsData.ait + selectedProductsData.rd + selectedProductsData.atv) || ""}</td>
                            <td>{((((selectedProductsData.cd + selectedProductsData.sd + selectedProductsData.vat + selectedProductsData.ait + selectedProductsData.rd + selectedProductsData.atv) || 0) * ((selectedProductsData?.unit_price * selectedProductsData?.unit_quantity) || 0)) / 100) || ""}</td>
                            <td>{(((selectedProductsData?.unit_price * selectedProductsData?.unit_quantity) || 0) + (((((selectedProductsData.cd + selectedProductsData.sd + selectedProductsData.vat + selectedProductsData.ait + selectedProductsData.rd + selectedProductsData.atv) || 0) * ((selectedProductsData?.unit_price * selectedProductsData?.unit_quantity) || 0)) / 100) || 0)) || ""}</td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                    <Button onClick={() => addTableRow()} variant="secondary" size="sm" className="mb-5">
                        Add Product
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default SalesInvoice;