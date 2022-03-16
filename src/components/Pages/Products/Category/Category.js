import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Menubar from '../../../Shared/Menubar/Menubar';

const Category = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [codeList, setCodeList] = useState([]);
    const [selectedCode, setSelectedCode] = useState();

    useEffect(() => {
        fetch(`https://vatdj.herokuapp.com/product/hs_code/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData);
                setCodeList(jsonData);
            })
    }, []);

    // useEffect(() => {
    //     setSelectedCode(codeList[0]);
    // }, [codeList]);

    const handleOnChangeCode = (e) => {
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
                    alert("Category is added successfully.");
                    reset();
                }
            });
        console.log("data", data);
    };

    return (
        <div>
            <Menubar />
            <h2 className="my-3">Add Category</h2>
            <div className="d-flex flex-column">
                <form onSubmit={handleSubmit(onSubmit)} className="purchase-form">
                    <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 100 })} />
                    <input type="text" placeholder="Description" {...register("description", { required: false, maxLength: 100 })} />
                    <select onChange={(e) => handleOnChangeCode(e)} value={selectedCode?.id} name="hs_code" id="hs_code">
                        <option value="">HS Code</option>
                        {
                            codeList?.map((code, index) => (
                                <option value={code?.id} key={index}>{code?.hs_code} - {code?.description}</option>
                            ))
                        }
                    </select>
                    <input type="submit" value="Add Category" />
                </form>
            </div>
        </div>
    );
};

export default Category;
