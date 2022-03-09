import React from 'react';
import { useForm } from 'react-hook-form';
import Menubar from '../../../Shared/Menubar/Menubar';

const Product = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (
        <div>
            <Menubar />
            <div className="d-flex flex-column">
                <form onSubmit={handleSubmit(onSubmit)} className="CusVend">
                    <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 100 })} />
                    <input type="text" placeholder="Description" {...register("description", { required: true, maxLength: 100 })} />
                    <input type="submit" value="Add" />
                </form>
            </div>
        </div>
    );
};

export default Product;