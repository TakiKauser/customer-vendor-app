import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UrlContext } from '../../../App';
import Menubar from '../../Shared/Menubar/Menubar';

const HsCode = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const apiDomain = useContext(UrlContext);

    const onSubmit = data => {
        const url = `${apiDomain}product/hs_code/`;
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
                <h2 className="my-3">Add HS Code</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="purchase-form">
                    <div className="d-flex">
                        <input type="text" placeholder="HS_Code" {...register("hs_code", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Description" {...register("description", { required: true, maxLength: 100 })} />

                        <select {...register("uom", { required: true })}>
                            <option value="">uom</option>
                            <option value="number">Number</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                    <div className="d-flex">
                        <input type="number" placeholder="cd" {...register("cd", { required: true })} />
                        <input type="number" placeholder="sd" {...register("sd", { required: true })} />
                        <input type="number" placeholder="vat" {...register("vat", { required: true })} />
                    </div>
                    <div className="d-flex">
                        <input type="number" placeholder="ait" {...register("ait", { required: true })} />
                        <input type="number" placeholder="rd" {...register("rd", { required: true })} />
                        <input type="number" placeholder="atv" {...register("atv", { required: true })} />
                        <input type="number" placeholder="tti" {...register("tti", { required: true })} />
                    </div>

                    <input type="submit" value="Add HS_Code" />
                </form>
            </div>
        </div>
    );
};

export default HsCode;