import React from 'react';
import { useForm } from 'react-hook-form';
import './Customer.css';



const Customer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (
        <div className="d-flex flex-column">

            <form onSubmit={handleSubmit(onSubmit)} className="CusVend">
                <input type="text" placeholder="Address" {...register("address", { required: true, maxLength: 100 })} />
                <input type="text" placeholder="Tax ID" {...register("tax_id", { required: true, maxLength: 100 })} />
                <input type="tel" placeholder="Phone" {...register("phone", { required: true, minLength: 6, maxLength: 12 })} />
                <input type="tel" placeholder="Mobile" {...register("mobile", { required: true, minLength: 6, maxLength: 12 })} />
                <input type="email" placeholder="Email" {...register("Email", { required: true, maxLength: 100 })} />
                <input type="text" placeholder="Website Link" {...register("website_link", { required: true, maxLength: 200 })} />
                <select {...register("tags", { required: true })}>
                    {/* <option value="tag">Tags</option> */}
                    <option value="paymentTerms">Payment Terms</option>
                    <option value="paymentMethods">Payment Methods</option>
                </select>

                {/* <input {...register("Developer", { required: true })} type="radio" value="Yes" /> */}
                {/* <input {...register("Developer", { required: true })} type="radio" value="No" /> */}

                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default Customer;