import React, { Fragment, useContext, useEffect, useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utilits/productItem/ProductItem'

function DetailProduct() {
    const params = useParams()
    // console.log(params); product select hone pr id pta chalegi
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products
    const [detailProduct,setDetailProduct]=useState([])

    useEffect(()=>{
        if(params.id){
            products.forEach(product=>{
                if(product._id===params.id) setDetailProduct(product)
            })
        }
    },[params.id,products])
    // console.log(detailProduct);
    if(detailProduct.length===0)return null;

    return (
        <Fragment>
        <div className='details'>
            <img src ={detailProduct.images.url} alt=""/>
            <div className='box-details'>
                <div className='row'>
                    <h2>{detailProduct.title}</h2>
                    <h6>id: {detailProduct.product_id}</h6>
                </div>
                <span>Rs {detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to ='/cart' className="cart"
                
                >Buy Now</Link>
            </div>
        </div>
        <div>
        <h2>Related products</h2>
        <div className='products'>
            {
                products.map(product=>{
                    return product.category === detailProduct.category
                    ? <ProductItem key={product._id} product={product}/> : null
                })
            }

        </div>
        </div>
        </Fragment>
    )
}

export default DetailProduct
