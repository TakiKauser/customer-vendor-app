import React from 'react';
import { useForm } from 'react-hook-form';
import './Purchase.css';
import Menubar from '../../Shared/Menubar/Menubar';
import { Table } from 'react-bootstrap';

const Purchase = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    return (
        <div>
            <Menubar />
            <h2 className="my-3">Purchase Invoice</h2>
            <h4 className="text-start ms-5">Vendor Info</h4>
            <form className="purchase-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-around">
                    <select {...register("vendor", { required: true })}>
                        {/* <option value="tag">Tags</option> */}
                        <option value="Vendor">Vendor</option>
                        <option value="vendorInfo">Vendor Info.</option>
                    </select>
                    {/* <input type="text" placeholder="Vendor" {...register("Vendor", { required: true })} /> */}
                    <input type="tel" placeholder="Phone" {...register("Phone", { required: true, maxLength: 12 })} />
                </div>
                <div className="d-flex flex-column">
                    <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                    <input type="text" placeholder="Address" {...register("Address", { required: true })} />
                </div>

                {/* <input type="submit" value="Purchase" /> */}
            </form>
            <div>
                <h4 className="text-start ms-5">Products</h4>
                <Table striped bordered hover className="">
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Variant</th>
                            <th>HS Code</th>
                            <th>UOM</th>
                            <th>CD</th>
                            <th>SD</th>
                            <th>VAT</th>
                            <th>AIT</th>
                            <th>RD</th>
                            <th>ATV</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <td>1</td> */}
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            {/* <td>2</td> */}
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            {/* <td>3</td> */}
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Purchase;