import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UrlContext } from '../../../App';
import Menubar from '../../Shared/Menubar/Menubar';

const ProductDetails = () => {
    const { itemNumber } = useParams();
    const [list, setList] = useState([]);
    const [productDetailsItem, setProductDetailsItem] = useState([]);

    const apiDomain = useContext(UrlContext);

    useEffect(() => {
        fetch(`${apiDomain}purchase/`)
            .then(response => response.json())
            .then(jsonData => {
                // console.log("list", jsonData.result);
                // console.log("item", jsonData.result[itemNumber].products[0].Biscuit);
                setList(jsonData.result);
                setProductDetailsItem(jsonData?.result[itemNumber]);
                console.log(productDetailsItem);
            })
    }, [itemNumber, productDetailsItem]);

    // useEffect(() => {
    //     // const productDetailsItem = list.find(item => item.index == itemNumber);
    //     console.log(productDetailsItem);
    //     // setItem(careDetailsItem);
    // }, []);

    // console.log(itemNumber);

    return (
        <div>
            <Menubar />
            <h4>ait: {productDetailsItem[0]?.products[0]?.Biscuit?.ait}</h4>
            <h4>atv: {productDetailsItem?.products[0]?.Biscuit?.atv}</h4>
            <h4>cd: {productDetailsItem?.products[0]?.Biscuit?.cd}</h4>
            {/* <h4>product_id: {productDetailsItem?.products[0]?.Biscuit?.product_id}</h4>
            <h4>product_type: {productDetailsItem?.products[0]?.Biscuit?.product_type}</h4>
            <h4>product_variant: {productDetailsItem?.products[0]?.Biscuit?.product_variant}</h4>
            <h4>rd: {productDetailsItem?.products[0]?.Biscuit?.rd}</h4>
            <h4>remark: {productDetailsItem?.products[0]?.Biscuit?.remark}</h4>
            <h4>sd: {productDetailsItem?.products[0]?.Biscuit?.sd}</h4>
            <h4>total: {productDetailsItem?.products[0]?.Biscuit?.total}</h4>
            <h4>uom: {productDetailsItem?.products[0]?.Biscuit?.uom}</h4>
            <h4>vat: {productDetailsItem?.products[0]?.Biscuit?.vat}</h4> */}
        </div>
    );
};

export default ProductDetails;