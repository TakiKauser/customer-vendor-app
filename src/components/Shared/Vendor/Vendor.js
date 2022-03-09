import React from 'react';
import { useForm } from 'react-hook-form';
import './Vendor.css';

const Vendor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (
        <div className="d-flex flex-column">

            <form onSubmit={handleSubmit(onSubmit)} className="Vendor">
                <div className="d-flex">
                    <div className="mx-3">
                        <input type="text" placeholder="Address" {...register("address", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Tax ID" {...register("tax_id", { required: true, maxLength: 100 })} />
                        <input type="tel" placeholder="Phone" {...register("phone", { required: true, minLength: 6, maxLength: 12 })} />
                        <input type="tel" placeholder="Mobile" {...register("mobile", { required: true, minLength: 6, maxLength: 12 })} />
                        <input type="email" placeholder="Email" {...register("Email", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Website Link" {...register("website_link", { required: true, maxLength: 200 })} />
                    </div>
                    <div className="mx-3">
                        <select {...register("tags", { required: true })}>
                            {/* <option value="tag">Tags</option> */}
                            <option value="paymentTerms">Payment Terms</option>
                            <option value="paymentMethods">Payment Methods</option>
                        </select>
                        <input type="text" placeholder="Refference" {...register("refference", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Business Type / Industry" {...register("business_type", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Bank A/C Number" {...register("bank_ac_number", { required: true, maxLength: 100 })} />

                        {/* <label htmlFor="payable"> */}
                            {/* <input {...register("ac_type", { required: true })} type="radio" value="Yes" id="payable" /> */}
                        {/* </label> */}
                        {/* <label htmlFor="receivable"> */}
                        {/* <input {...register("ac_type", { required: true })} type="radio" value="No" id="receivable" /> */}
                        {/* </label> */}

                        <input {...register("ac_type", { required: true })} type="radio" value="Payable" />
                        <input {...register("ac_type", { required: true })} type="radio" value=" Receivable" />

                    </div>
                </div>
                <textarea placeholder="Note" {...register("Note", { required: true })} />


                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default Vendor;