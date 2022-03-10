import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Menubar from '../../../Shared/Menubar/Menubar';

const Product = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [hs_codes, setHS_Code] = useState([]);
    const [selectedCode, setSelectedCode] = useState({});

    // const [selectedID, setSelectedID] = useState('');

    const [data, setData] = useState({
        hs_code: ""
    })

    useEffect(() => {
        fetch(`https://vatdj.herokuapp.com/product/hs_code/`)
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);
                setHS_Code(jsonData);
            })
    }, []);

    useEffect(() => {
        setSelectedCode(hs_codes[0])
    }, [hs_codes]);

    // useEffect(() => {
    //     // let currentCode = hs_codes?.find(code => code.id == e.target.value);
    //     setSelectedID(selectedCode.id);
    //     console.log("selectedID", selectedCode.id);
    //     // setSelectedID()
    // }, [selectedCode.id]);

    const handleOnChange = (e) => {
        console.log(e.target.value);
        if (e.target.name === 'hs_code') {
            let currentCode = hs_codes?.find(code => code.id == e.target.value);
            // let selectedID = hs_codes?.find(code => code.id == e.target.value);
            console.log(currentCode);
            setSelectedCode(currentCode);

            // let selected_ID = currentCode.id;
            // setSelectedID(currentCode.id);
            console.log("selectedID", selectedCode.id);

            const newData = { ...data };
            newData[e.target.id] = e.target.value;
            setData(newData);
            console.log(data);
        }
        // else console.log("error");
    }

    const onSubmit = data => {
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
                // console.log(result);
                if (result.insertedId) {
                    alert("Product variant is added successfully.");
                    reset();
                }
            });
        // console.log(data);
    };

    return (
        <div>
            <Menubar />
            <div className="d-flex flex-column">
                <form onSubmit={handleSubmit(onSubmit)} className="CusVend">
                    <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 100 })} />
                    <input type="text" placeholder="Description" {...register("description", { required: true, maxLength: 100 })} />

                    <select onChange={(e) => handleOnChange(e)} value={selectedCode?.id} name="hs_code" id="hs_code">
                        {/* <option value="">hs_code</option> */}
                        {/* hs_code - description */}
                        {
                            hs_codes?.map((hs_code, index) => (
                                // console.log("hs_code", hs_code.description, index);
                                <option value={`${hs_code?.id}`} key={index}>{`${hs_code?.hs_code}`} - {`${hs_code?.description}`} </option>
                            ))
                        }
                    </select>
                    <input type="submit" value="Add" />
                </form>
            </div>
        </div>
    );
};

export default Product;