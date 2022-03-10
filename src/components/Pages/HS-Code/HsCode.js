import React from 'react';
import { useForm } from 'react-hook-form';
import Menubar from '../../Shared/Menubar/Menubar';

const HsCode = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);
    const onSubmit = data => {
        const url = `https://vatdj.herokuapp.com/product/hs_code/`;
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
                    alert("HS_Code is added successfully.");
                    reset();
                }
            });
        console.log(data);
    };
    return (
        <div>
            <Menubar />
            <div className="d-flex flex-column">
                <form onSubmit={handleSubmit(onSubmit)} className="CusVend">

                    <input type="text" placeholder="HS_Code" {...register("hs_code", { required: true, maxLength: 100 })} />
                    <input type="text" placeholder="Description" {...register("description", { required: true, maxLength: 100 })} />
                    <input type="text" placeholder="uom" {...register("uom", { required: true })} />
                    <input type="number" placeholder="cd" {...register("cd", { required: true })} />
                    <input type="number" placeholder="sd" {...register("sd", { required: true })} />
                    <input type="number" placeholder="vat" {...register("vat", { required: true })} />
                    <input type="number" placeholder="ait" {...register("ait", { required: true })} />
                    <input type="number" placeholder="rd" {...register("rd", { required: true })} />
                    <input type="number" placeholder="atv" {...register("atv", { required: true })} />

                    <select {...register("uom", { required: true })}>
                            {/* <option value="tag">Tags</option> */}
                            <option value="">uom</option>
                            <option value="number">Number</option>
                            <option value="kg">kg</option>
                        </select>

                    <input type="submit" value="Add HS_Code" />
                </form>
            </div>
        </div>
    );
};

export default HsCode;