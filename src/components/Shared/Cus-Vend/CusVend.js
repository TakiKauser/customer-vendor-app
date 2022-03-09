import React from 'react';
import Customer from '../Customer/Customer';
import Vendor from '../Vendor/Vendor';

const CusVend = () => {
    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <div class="form-check me-5">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                    </input>
                    <label class="form-check-label" for="flexRadioDefault1">
                        Individual
                    </label>
                </div>
                <div class="form-check ">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
                    </input>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Company
                    </label>
                </div>
            </div>
            {/* <Customer /> */}
            <Vendor />
        </>
    );
};

export default CusVend;