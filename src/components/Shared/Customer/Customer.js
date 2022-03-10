import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Customer.css';



const Customer = () => {
    const [is_customer, setIsCustomer] = useState(false);
    const [is_vendor, setIsVendor] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);
    const onSubmit = data => {
        const url = `https://vatdj.herokuapp.com/parties/list/`;
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
                    alert("Party is added successfully.");
                    reset();
                }
            });
        console.log(data);
    };
    return (
        <div className="d-flex flex-column">

            <form onSubmit={handleSubmit(onSubmit)} className="CusVend">
                <div className="d-flex justify-content-around">
                    <div>
                        <input {...register("customer_type", { required: true })} type="radio" value="individual" />
                        <p className="text-white">Individual</p>
                    </div>
                    <div>
                        <input {...register("customer_type", { required: true })} type="radio" value="company" />
                        <p className="text-white">Company</p>
                    </div>
                </div>

                <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 100 })} />
                <input type="text" placeholder="Address" {...register("address", { required: true, maxLength: 100 })} />
                <input type="text" placeholder="Tax ID" {...register("Tax_ID", { required: true, maxLength: 100 })} />
                <input type="tel" placeholder="Phone" {...register("phone", { required: true, minLength: 6, maxLength: 12 })} />
                <input type="tel" placeholder="Mobile" {...register("mobile", { required: true, minLength: 6, maxLength: 12 })} />
                <input type="email" placeholder="Email" {...register("email", { required: true, maxLength: 100 })} />
                <input type="text" placeholder="Description" {...register("description", { required: true, maxLength: 200 })} />

                {/* <select {...register("tags", { required: true })}>
                    <option onClick={() => {
                        setIsCustomer(true);
                    }} >
                        Customer
                    </option>

                    <option onClick={() => {
                        setIsVendor(true);
                    }} >
                        Vendor
                    </option> */}
                {/* <option value="paymentMethods">Payment Methods</option> */}
                {/* </select> */}

                {/* <label htmlFor="customer" className="text-white">
                    <input
                        {...register("is_customer")}
                        type="radio"
                        name="Customer"
                        onClick={() => setIsCustomer(true)}
                        // value={`${is_customer}`}
                        // setValue={() => setIsCustomer(false)}
                        id="customer"
                    />
                    Customer
                </label>

                <label htmlFor="vendor" className="text-white">
                    <input
                        {...register("is_vendor")}
                        type="radio"
                        name="Vendor"
                        onClick={() => setIsVendor(true)}
                        // value= {`${is_vendor}`}
                        setValue={`${is_vendor}`}
                        id="vendor"
                    />
                    Vendor
                </label> */}

                {/* <div className="d-flex justify-content-center mt-3">
                    <div class="form-check me-5">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                        </input>
                        <label className="form-check-label text-white" for="flexRadioDefault1">
                            Customer
                        </label>
                    </div>
                    <div className="form-check ">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
                        </input>
                        <label className="form-check-label text-white" for="flexRadioDefault2">
                            Vendor
                        </label>
                    </div>
                </div> */}

                {/* <input {...register("is_customer", { required: false })} type="radio" value={`${Boolean("true")}`} onClick={() => setIsCustomer(true)} />
                <input {...register("is_vendor", { required: false })} type="radio" value={`${Boolean("true")}`} onClick={() => setIsVendor(true)} /> */}

                <input type="checkbox" placeholder="Customer" {...register("is_customer", { required: false })} value={`${!is_customer}`} />
                <p className="text-white">Customer</p>
                <input type="checkbox" placeholder="Vendor" {...register("is_vendor", { required: false })} value={`${!is_vendor}`} />
                <p className="text-white">Vendor</p>


                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default Customer;