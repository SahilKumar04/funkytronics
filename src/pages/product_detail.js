import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { addToCart, removeFromCart } from '@/store/cartSlice';
import { ProductService } from './data.js';
import { useRouter } from 'next/router';

const ProductDetail = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const router = useRouter();
    const {productId} = router.query
    
    const showSuccess = (message) => {
        toast.current.show({severity:'info', summary: 'Success', detail:message, life: 1500});
    }
    const [product, setProduct] = useState(null);
    useEffect(() => {
        {productId && setProduct(ProductService.getProductsData().filter(product => product.id === productId)[0])}
    }, [router.query])
    
    return (
        <>
        <Toast ref={toast} />
        
        {product && <div>
            <div className='bg-gray w-full md:py-4 md:px-2 md:m-1 mb-2 px-2 py-2'>
                <div className='text-custom-black md:mb-3 font-bold ml-2'>
                    <span className='mr-2' onClick={() => window.history.back()} style={{ cursor: 'pointer' }}>&#x2190;</span> Product Detail
                </div>
            </div>


            <div className='flex flex-col md:flex-row '>
                <div className='mt-2 block m-auto'>
                    <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} className='ml-4 px-2 mr-2 md:w-80 md:h-80 w-32 h-32 bg-white rounded-md shadow-lg'></img>
                </div>


                <div className='flex-1 md:mr-10 m-2 rounded-md shadow-lg'>
                    <div className='flex flex-row'>
                        <div className="card flex justify-content-center">
                            <Rating value={product.rating} readOnly cancel={false} />
                        </div>
                    </div>
                    <br />

                    <div className='flex flex-row '>
                        <div className='text-custom-black text-base md:text-lg'>{product.name}</div>
                        <div className='text-custom-black text-base md:text-lg mr-1'>,</div>
                        <div className='text-custom-black text-base md:text-lg pb-1 md:pb-2'>{product.quantity}</div>
                    </div>
                    
                    <div className=' mb-2 md:mb-3 text-custom-green font-bold'>₹ {product.price}</div>
                    <hr className='mb-2 md:mb-3'/>
                    <div className='flex flex-row'>
                        <div className='text-custom-very-dark-gray text-sm mr-2 md:mb-3 font-bold'>Category: </div>
                        <div className='text-custom-black text-sm md:mb-3 font-bold'>{product.category}</div>
                    </div>

                    <div className='flex flex-row'>
                        <Button onClick={()=>{showSuccess(cartItems.find(item => item.id === product.id)? `${product.name} removed from cart`: `${product.name} added to cart`); cartItems.find(item => item.id === product.id) ? dispatch(removeFromCart(product.id)): dispatch(addToCart(product))}} icon={`pi ${cartItems.find(item => item.id === product.id) ? "pi-check":"pi-shopping-cart"}`} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}
export default ProductDetail