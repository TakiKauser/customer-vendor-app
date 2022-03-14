import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Menubar from '../../../Shared/Menubar/Menubar';

const Product = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [available_in_po, setAvailable_in_po] = useState(false);
    const [available_in_so, setAvailable_in_so] = useState(false);

    const [hs_codes, setHS_Code] = useState([]);
    const [selectedCode, setSelectedCode] = useState();

    useEffect(() => {
        fetch(`https://vatdj.herokuapp.com/product/hs_code/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log(jsonData);
                setHS_Code(jsonData);
            })
    }, []);

    // useEffect(() => {
    //     setSelectedCode(hs_codes[0]);
    // }, [hs_codes]);

    const handleOnChange = (e) => {
        setSelectedCode(e.target.value);
    }

    const onSubmit = data => {
        data.hs_code = selectedCode;
        const url = `https://vatdj.herokuapp.com/product/product_variant/`;
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
                if (result.insertedId) {
                    alert("Product variant is added successfully.");
                    reset();
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
                        <input type="number" placeholder="Category" {...register("product_category", { required: true, maxLength: 100 })} />
                    </div>
                    <div className="d-flex">
                        <input type="text" placeholder="Product Type" {...register("product_type", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Manufacturer" {...register("manufacturer", { required: true, maxLength: 100 })} />
                        <select onChange={(e) => handleOnChange(e)} value={selectedCode?.id} name="hs_code" id="hs_code">
                            <option value="">hs_code - description</option>
                            {/* hs_code - description */}
                            {
                                hs_codes?.map((hs_code, index) => (
                                    <option value={`${hs_code?.id}`} key={index}>{`${hs_code?.hs_code}`} - {`${hs_code?.description}`} </option>
                                ))
                            }
                        </select>
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