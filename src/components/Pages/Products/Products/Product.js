import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UrlContext } from '../../../../App';
import Menubar from '../../../Shared/Menubar/Menubar';
import {useNavigate} from 'react-router-dom';


const Product = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [available_in_po, setAvailable_in_po] = useState(false);
    const [available_in_so, setAvailable_in_so] = useState(false);

    const [hs_codes, setHS_Code] = useState([]);
    const [category, setCategory] = useState();
    const [type, setType] = useState();

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}product/product_variant/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log(jsonData);
                setHS_Code(jsonData);
            })
    }, [apiDomain]);

    // useEffect(() => {
    //     setCategory(hs_codes[0]);
    // }, [hs_codes]);

    const handleOnChangeCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleOnChangeType = (e) => {
        setType(e.target.value);
    }

    const onSubmit = data => {
        data.product_category = parseInt(category);
        console.log(category);
        console.log(type);
        data.product_type = type;
        const url = `${apiDomain}product/product_list/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result) {
                    alert("Product variant is added successfully.");
                    reset();
                    navigate('/product_list');
                }
            });
        console.log(data);
    };

    return (
        <div>
            <Menubar />
            <div className="d-flex flex-column">
                <h2 className="my-3">Add Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="purchase-form">
                    <div className="d-flex">
                        <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Description" {...register("description", { required: false, maxLength: 100 })} />
                        {/* <input type="number" placeholder="Category" {...register("product_category", { required: true, maxLength: 100 })} /> */}
                        <select onChange={(e) => handleOnChangeCategory(e)} value={category?.id} name="product_category" id="product_category">
                            <option value="">Category</option>
                            {/* hs_code - description */}
                            {
                                hs_codes?.map((hs_code, index) => (
                                    <option value={hs_code?.id} key={index}>{hs_code?.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="d-flex">
                        {/* <input type="text" placeholder="Product Type" {...register("product_type", { required: true, maxLength: 100 })} /> */}
                        <select onChange={(e) => handleOnChangeType(e)} value={type?.id} name="product_type" id="product_type">
                            <option value="">Product Type</option>
                            <option value="finished_good">Finished Good</option>
                            <option value="raw_material">Raw Material</option>
                        </select>
                        <input type="text" placeholder="Manufacturer" {...register("manufacturer", { required: true, maxLength: 100 })} />
                        {/* <select onChange={(e) => handleOnChange(e)} value={category?.id} name="hs_code" id="hs_code">
                            <option value="">hs_code - description</option> */}
                        {/* hs_code - description */}
                        {/* {
                                hs_codes?.map((hs_code, index) => (
                                    <option value={`${hs_code?.id}`} key={index}>{`${hs_code?.hs_code}`} - {`${hs_code?.description}`} </option>
                                ))
                            }
                        </select> */}
                    </div>
                    <div className="text-secondary d-flex justify-content-evenly">
                        <div className="">
                            <input type="checkbox" placeholder="PO" {...register("available_in_po", { required: false })} value={!available_in_po} />
                            <p className="">Available_in_PO</p>
                        </div>
                        <div className="">
                            <input type="checkbox" placeholder="SO" {...register("available_in_so", { required: false })} value={!available_in_so} />
                            <p className="">Available_in_SO</p>
                        </div>
                    </div>
                    <input type="submit" value="Add Product" />
                </form>
            </div>
        </div>
    );
};

export default Product;