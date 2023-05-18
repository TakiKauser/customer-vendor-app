import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UrlContext } from '../../../App';

const Customer = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    const [is_customer, setIsCustomer] = useState(false);
    const [is_vendor, setIsVendor] = useState(false);

    const apiDomain = useContext(UrlContext);

    const onSubmit = data => {
        const url = `${apiDomain}parties/list/`;
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
                    alert("Parties item is added successfully.");
                    reset();
                }
            });
        console.log("data", data);
    };

    return (
        <div className="d-flex flex-column">
            <h2 className="my-3">Add Party</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="purchase-form">
                <div className="">
                    <div className="text-secondary d-flex ms-3 me-5 d-flex justify-content-between">
                        <div className="d-flex">
                            <div>
                                <p className="text-dark ms-2">Customer / Vendor: </p>
                            </div>
                            <div>
                                <p className="mx-5">Customer</p>
                                <input type="checkbox" placeholder="Customer" {...register("is_customer", { required: false })} value={`${!is_customer}`} />
                            </div>
                            <div>
                                <p className="mx-5">Vendor</p>
                                <input type="checkbox" placeholder="Vendor" {...register("is_vendor", { required: false })} value={`${!is_vendor}`} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between text-secondary ms-5">
                            <div>
                                <p className="text-dark ms-5">Customer Type: </p>
                            </div>
                            <div>
                                <p className="mx-5">Individual</p>
                                <input {...register("customer_type", { required: true })} type="radio" value="individual" />
                            </div>
                            <div>
                                <p className="mx-5">Company</p>
                                <input {...register("customer_type", { required: true })} type="radio" value="company" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Address" {...register("address", { required: true, maxLength: 100 })} />
                        <input type="text" placeholder="Tax ID" {...register("Tax_ID", { required: true, maxLength: 100 })} />
                    </div>
                    <div className="d-flex">
                        <input type="tel" placeholder="Phone" {...register("phone", { required: true, minLength: 6, maxLength: 12 })} />
                        <input type="tel" placeholder="Mobile" {...register("mobile", { required: true, minLength: 6, maxLength: 12 })} />
                        <input type="email" placeholder="Email" {...register("email", { required: true, maxLength: 100 })} />
                    </div>
                    <textarea placeholder="Note" {...register("Note", { required: true })} />
                </div>
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default Customer;