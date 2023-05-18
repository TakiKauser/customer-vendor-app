// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import Menubar from '../../Shared/Menubar/Menubar';
// import { Button, Table } from 'react-bootstrap';
// import { UrlContext } from '../../../App';

// const Sales = () => {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     // const onSubmit = data => console.log(data);
//     console.log(errors);

//     const [customers, setCustomer] = useState([]);
//     const [selectedCustomer, setSelectedCustomer] = useState();

//     const [submitDataFormat, setSubmitDataFormat] = useState({
//         result: [
//             {
//                 customer: [
//                     {
//                         customer: "",
//                         email: "",
//                         address: "",
//                         order_deadline: "",
//                         mobile: ""
//                     }
//                 ],
//                 products: []
//             }
//         ]
//     });

//     const [products, setProducts] = useState([]);
//     // const [productDetails, setProductDetails] = useState();
//     const [selectedProducts, setSelectedProducts] = useState();

//     const [selectedProductsData, setSelectedProductsData] = useState({});

//     const apiDomain = useContext(UrlContext);

// const [unitPrice, setUnitPrice] = useState(0);
// const [quantity, setQuantity] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [ttiAmount, setTtiAmount] = useState(0);
//     const [totalPayble, setTotalPayable] = useState(0);

//     useEffect(() => {
//         const price = unitPrice * quantity;
//         setTotalPrice(price);
//     }, [unitPrice, quantity]);

//     useEffect(() => {
//         const amount = (totalPrice * selectedProductsData?.tti) / 100;
//         setTtiAmount(amount);
//     }, [totalPrice, selectedProductsData]);

//     useEffect(() => {
//         const payableAmount = (totalPrice + ttiAmount);
//         setTotalPayable(payableAmount);
//     }, [totalPrice, ttiAmount]);

//     const handleOnChangeTableData = (e) => {
//         setSubmitDataFormat(e.target.value);
//         console.log("value", e.target.value);

//         const totalPrice = document.getElementById("totalPrice");
//         totalPrice.value = submitDataFormat.result[0].products[0].totalPrice;

//         const ttiAmount = document.getElementById("ttiAmount");
//         ttiAmount.value = submitDataFormat.ttiAmount;

//         const totalPayable = document.getElementById("totalPayable");
//         totalPayable.value = submitDataFormat.totalPayable;
//     }

//     useEffect(() => {
//         findSelectProductData(selectedProducts)
//     }, [selectedProducts]);

//     useEffect(() => {
//         fetch(`${apiDomain}parties/list/customers/`)
//             .then(response => response.json())
//             .then(jsonData => {
//                 console.log(jsonData);
//                 setCustomer(jsonData);
//             })
//     }, []);

//     useEffect(() => {
//         fetch(`${apiDomain}product/product_list/`)
//             .then(response => response.json())
//             .then(jsonData => {
//                 // console.log("all product", jsonData);
//                 setProducts(jsonData);
//             })
//     }, []);

//     // useEffect(() => {
//     //     setSelectedCustomer(customers[0]);
//     // }, [customers]);

//     // useEffect(() => {
//     //     setSelectedProducts(products[0]?.id);
//     // }, [products]);

//     const handleOnChangeCustomer = (e) => {
//         setSelectedCustomer(e.target.value);

//         let currentCustomer = customers?.find(customer => customer.id == e.target.value);
//         // console.log("currentCustomer", currentCustomer);
//         setSelectedCustomer(currentCustomer);
//         // setProductDetails(currentCustomer);

//         const mobile = document.getElementById("mobile");
//         mobile.value = currentCustomer.mobile;

//         const email = document.getElementById("email");
//         email.value = currentCustomer.email;

//         const address = document.getElementById("address");
//         address.value = currentCustomer.address;

//         // console.log(currentCustomer);
//     }

//     const addTableRow = () => {
//         const newData = { ...submitDataFormat };
//         newData.result[0].products.unshift(selectedProductsData);
//         console.log("spd", selectedProductsData);
//         setSubmitDataFormat(newData);
//         // console.log("sdf",submitDataFormat);
//     }

//     const findSelectProductData = (id) => {
//         const url = `${apiDomain}sales/sales_details/${id}/`;
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id: id })
//         })
//             .then(response => response.json())
//             .then(result => {
//                 // console.log("result", result);
//                 setSelectedProductsData(result);
//                 if (result.insertedId) {
//                     alert("Got product successfully!");
//                     reset();
//                 }
//             });
//     }

//     const onSubmit = data => {
//         data.customer = selectedCustomer.name;
//         console.log(data);

//         submitDataFormat.result[0].customer = data;

//         const url = `${apiDomain}sales/`;
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(submitDataFormat)
//         })
//             .then(response => response.json())
//             .then(result => {
//                 console.log(result);
//                 if (result.insertedId) {
//                     alert("Sales invoice is added successfully.");
//                     reset();
//                 }
//             });
//         console.log("data", submitDataFormat);
//     };
//     return (
//         <div>
//             <Menubar />
//             <h2 className="my-3">Sales Invoice</h2>
//             <h4 className="text-start ms-5">Customer Info</h4>
//             <form className="purchase-form" onSubmit={handleSubmit(onSubmit)}>
//                 <input type="submit" value="Sale" className="" />
//                 <div className="d-flex justify-content-around">
//                     <select onChange={(e) => handleOnChangeCustomer(e)} value={selectedCustomer?.id} name="customer" id="customer">
//                         <option value="">Select Customer</option>
//                         {
//                             customers?.map((customer, index) => (
//                                 // console.log("customer", customer.description, index);
//                                 <option value={customer?.id} key={index}>{`${customer?.name}`} </option>
//                             ))
//                         }
//                     </select>
//                     <input id="mobile" type="tel" placeholder="Mobile" {...register("mobile", { required: true, maxLength: 12 })} />
//                 </div>
//                 <div className="d-flex">
//                     <input id="email" type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
//                     <input id="address" type="text" placeholder="Address" {...register("address", { required: true })} />
//                     <input type="datetime-local" placeholder="order_deadline" {...register("order_deadline", { required: true })} />
//                 </div>
//             </form>
//             <div>
//                 <h4 className="text-start ms-5">Products</h4>
//                 <Table id="emptyTable" striped bordered hover className="">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Variant</th>
//                             <th>HS Code</th>
//                             <th>UOM</th>
//                             <th>Unit Price</th>
//                             <th>Quantity</th>
//                             <th>CD</th>
//                             <th>SD</th>
//                             <th>VAT</th>
//                             <th>AIT</th>
//                             <th>RD</th>
//                             <th>ATV</th>

//                             <th>TTI</th>
//                             <th>Total Price</th>
//                             <th>TTI Amount</th>
//                             <th>Total Payable</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             submitDataFormat.result[0].products.map((product, index) => (
//                                 <tr key={index}>
//                                     <td>{product.product_name}</td>
//                                     <td>{product.product_variant}</td>
//                                     <td>{product.hs_code}</td>
//                                     <td>{product.uom}</td>
//                                     <td>{unitPrice}</td>
//                                     <td>{quantity}</td>
//                                     <td>{product.cd}</td>
//                                     <td>{product.sd}</td>
//                                     <td>{product.vat}</td>
//                                     <td>{product.ait}</td>
//                                     <td>{product.rd}</td>
//                                     <td>{product.atv}</td>
//                                     {/* <td><input type="text" placeholder="data" /></td> */}
//                                     {/* <td>
//                                         {
//                                             inEditMode.status && inEditMode.rowKey === product.id ? (
//                                                 <input value={unitPrice}
//                                                     onChange={(event) => setUnitPrice(event.target.value)}
//                                                 />
//                                             ) : (
//                                                 item.unit_price
//                                             )
//                                         }
//                                     </td> */}

//                                     <td>{product.tti}</td>
//                                     <td>{totalPrice}</td>
//                                     <td>{ttiAmount}</td>
//                                     <td>{totalPayble}</td>
//                                 </tr>
//                                 // console.log(product)
//                             ))
//                         }
//                         <tr>
//                             <td id="col0">
//                                 <select onChange={(e) => setSelectedProducts(e.target.value)} value={selectedProducts?.id} name="product" id="product">
//                                     <option value="">Select Product</option>
//                                     {
//                                         products?.map((product, index) => <option value={product?.id} key={index}>{product?.name}</option>)
//                                     }
//                                 </select>
//                             </td>
//                             <td>{selectedProductsData.product_variant}</td>
//                             <td>{selectedProductsData.hs_code}</td>
//                             <td>{selectedProductsData.uom}</td>
//                             <td><input style={{ width: '50px' }} type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.cd} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.sd} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.vat} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.ait} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.rd} /></td>
//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.atv} /></td>

//                             <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.tti} /></td>
//                             <td id="totalPrice" onChange={(e) => handleOnChangeTableData}>{totalPrice}</td>
//                             <td id="ttiAmount" onChange={(e) => handleOnChangeTableData}>{ttiAmount ? ttiAmount : 0}</td>
//                             <td id="totalPayable" onChange={(e) => handleOnChangeTableData}>{totalPayble ? totalPayble : 0}</td>
//                         </tr>
//                     </tbody>
//                 </Table>
//                 <div>
//                     <Button onClick={() => addTableRow()} variant="secondary" size="sm" className="mb-5">
//                         Add Product
//                     </Button>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default Sales;





import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Menubar from '../../Shared/Menubar/Menubar';
import { Button, Modal, Table } from 'react-bootstrap';
import { UrlContext } from '../../../App';

const Sales = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [customers, setCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("test1");
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [submitDataFormat, setSubmitDataFormat] = useState([]);
    const [setProducts, setSetProducts] = useState([]);

    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedValue, setSelectedValue] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [ttiAmount, setTtiAmount] = useState(0);
    const [totalPayble, setTotalPayable] = useState(0);
    const Product2 = [
        {
            name: "test1",

        },
        {
            name: "test2",

        },
        {
            name: "test3",

        },
        {
            name: "test4",

        },
    ]

    const totalPrice2 = unitPrice * quantity;

    // const [productDetails, setProductDetails] = useState();
    // const [selectedProducts, setSelectedProducts] = useState();

    // const [selectedProductsData, setSelectedProductsData] = useState({});

    const apiDomain = useContext(UrlContext);
  
    const handlerToSaveProduct = (e) => {
        const productsArray = {
            name: selectedValue,
            price: unitPrice,
            quantity: quantity,
            totalPrice: totalPrice2,
        }
      
       const products3=[...submitDataFormat,productsArray];
       setSubmitDataFormat(products3)
        handleClose();
       
    }
console.log(submitDataFormat);
    // const [unitPrice, setUnitPrice] = useState(0);
    // const [quantity, setQuantity] = useState(0);
    // const [totalPrice, setTotalPrice] = useState(0);
    // const [ttiAmount, setTtiAmount] = useState(0);
    // const [totalPayble, setTotalPayable] = useState(0);

    // useEffect(() => {
    //     const price = unitPrice * quantity;
    //     setTotalPrice(price);
    // }, [unitPrice, quantity]);

    // useEffect(() => {
    //     const amount = (totalPrice * selectedProductsData?.tti) / 100;
    //     setTtiAmount(amount);
    // }, [totalPrice, selectedProductsData]);

    // useEffect(() => {
    //     const payableAmount = (totalPrice + ttiAmount);
    //     setTotalPayable(payableAmount);
    // }, [totalPrice, ttiAmount]);

    // const handleOnChangeTableData = (e) => {
    //     setSubmitDataFormat(e.target.value);
    //     console.log("value", e.target.value);

    //     const totalPrice = document.getElementById("totalPrice");
    //     totalPrice.value = submitDataFormat.result[0].products[0].totalPrice;

    //     const ttiAmount = document.getElementById("ttiAmount");
    //     ttiAmount.value = submitDataFormat.ttiAmount;

    //     const totalPayable = document.getElementById("totalPayable");
    //     totalPayable.value = submitDataFormat.totalPayable;
    // }

    // useEffect(() => {
    //     findSelectProductData(selectedProducts)
    // }, [selectedProducts]);

    // useEffect(() => {
    //     fetch(`${apiDomain}parties/list/customers/`)
    //         .then(response => response.json())
    //         .then(jsonData => {
    //             console.log(jsonData);
    //             setCustomer(jsonData);
    //         })
    // }, []);

    useEffect(() => {
        fetch(`${apiDomain}product/product_list/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("all product", jsonData);
                setProducts(jsonData);
            })
    }, []);

    // useEffect(() => {
    //     setSelectedCustomer(customers[0]);
    // }, [customers]);

    // useEffect(() => {
    //     setSelectedProducts(products[0]?.id);
    // }, [products]);

    // const handleOnChangeCustomer = (e) => {
    //     setSelectedCustomer(e.target.value);

    //     let currentCustomer = customers?.find(customer => customer.id == e.target.value);
    //     // console.log("currentCustomer", currentCustomer);
    //     setSelectedCustomer(currentCustomer);
    //     // setProductDetails(currentCustomer);

    //     const mobile = document.getElementById("mobile");
    //     mobile.value = currentCustomer.mobile;

    //     const email = document.getElementById("email");
    //     email.value = currentCustomer.email;

    //     const address = document.getElementById("address");
    //     address.value = currentCustomer.address;

    //     // console.log(currentCustomer);
    // }

    // const addTableRow = () => {
    //     const newData = { ...submitDataFormat };
    //     newData.result[0].products.unshift(selectedProductsData);
    //     console.log("spd", selectedProductsData);
    //     setSubmitDataFormat(newData);
    //     // console.log("sdf",submitDataFormat);
    // }

    // const findSelectProductData = (id) => {
    //     const url = `${apiDomain}sales/sales_details/${id}/`;
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ id: id })
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             // console.log("result", result);
    //             setSelectedProductsData(result);
    //             if (result.insertedId) {
    //                 alert("Got product successfully!");
    //                 reset();
    //             }
    //         });
    // }

    // const onSubmit = data => {
    //     data.customer = selectedCustomer.name;
    //     console.log(data);

    //     submitDataFormat.result[0].customer = data;

    //     const url = `${apiDomain}sales/`;
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(submitDataFormat)
    //     })
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result);
    //             if (result.insertedId) {
    //                 alert("Sales invoice is added successfully.");
    //                 reset();
    //             }
    //         });
    //     console.log("data", submitDataFormat);
    // };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Menubar />
            <h2 className="my-3">Sales Invoice</h2>
            <h4 className="text-start ms-5">Customer Info</h4>
            {/* <form className="purchase-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="submit" value="Sale" className="" />
                <div className="d-flex justify-content-around">
                    <select onChange={(e) => handleOnChangeCustomer(e)} value={selectedCustomer?.id} name="customer" id="customer">
                        <option value="">Select Customer</option>
                        {
                            customers?.map((customer, index) => (
                                // console.log("customer", customer.description, index);
                                <option value={customer?.id} key={index}>{`${customer?.name}`} </option>
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
            </form> */}
            <div>
                <h4 className="text-start ms-5">Products</h4>
                <Table id="emptyTable" striped bordered hover className="">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Variant</th>
                            <th>HS Code</th>
                            <th>UOM</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>CD</th>
                            <th>SD</th>
                            <th>VAT</th>
                            <th>AIT</th>
                            <th>RD</th>
                            <th>ATV</th>

                            <th>TTI</th>
                            <th>Total Price</th>
                            <th>TTI Amount</th>
                            <th>Total Payable</th>
                        </tr>
                    </thead>
                    <tbody>

                        
                            
                           { submitDataFormat.map((data)=>
                           <tr >
                           <td>{data.name}</td>
                           <td>{data.price}</td>
                           <td>{data.quantity}</td>
                           <td>{data.totalPrice}</td>
                        
                           </tr>
                           )}
        
                    



                        {/* <tr>
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
                            <td><input style={{ width: '50px' }} type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.cd} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.sd} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.vat} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.ait} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.rd} /></td>
                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.atv} /></td>

                            <td><input style={{ width: '50px' }} type="number" value={selectedProductsData.tti} /></td>
                            <td id="totalPrice" onChange={(e) => handleOnChangeTableData}>{totalPrice}</td>
                            <td id="ttiAmount" onChange={(e) => handleOnChangeTableData}>{ttiAmount ? ttiAmount : 0}</td>
                            <td id="totalPayable" onChange={(e) => handleOnChangeTableData}>{totalPayble ? totalPayble : 0}</td>
                        </tr> */}
                    </tbody>
                </Table>
                <div>
                    <Button variant="secondary" size="sm" className="mb-5" onClick={handleShow}>
                        Add Product
                    </Button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} animation={false} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Table id="emptyTable" striped bordered hover className="">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Variant</th>
                                <th>HS Code</th>
                                <th>UOM</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>CD</th>
                                <th>SD</th>
                                <th>VAT</th>
                                <th>AIT</th>
                                <th>RD</th>
                                <th>ATV</th>

                                <th>TTI</th>
                                <th>Total Price</th>
                                <th>TTI Amount</th>
                                <th>Total Payable</th>
                            </tr>
                        </thead>
                        <tbody>



                            <tr >

                                <td><select onChange={(e) => setSelectedValue(e.target.value)}  name="customer" id="customer">
                                    <option value="">Select Customer</option>
                                    {
                                        Product2?.map((pt, index) => (
                                            // console.log("customer", customer.description, index);
                                            <option value={pt?.name} key={index}>{`${pt?.name}`} </option>
                                        ))
                                    }
                                </select></td>
                                <td> 1 </td>
                                <td>1</td>
                                <td>1</td>
                                <td><input style={{ width: '50px' }} type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} /></td>
                                <td><input style={{ width: '50px' }} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
                                <td>{totalPrice2}</td>
                                <td></td>

                            </tr>




                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => handlerToSaveProduct()} variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default Sales;