
import React, { useState, useEffect, useRef } from 'react';
import { ProductService } from './data.js';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/store/cartSlice.js';
import { ScrollTop } from 'primereact/scrolltop';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router.js';

export default function Product() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const toast = useRef(null);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
        const timeout = setTimeout(() => {
            // Action to execute after 5 seconds
            console.log('Five seconds have passed!');
            setLoading(false);
          }, 1000);
          return () => clearTimeout(timeout); 
    }, []);

    const showSuccess = (message) => {
        toast.current.show({severity:'info', summary: 'Success', detail:message, life: 1500});
    }

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const listItem = (product) => {
        return (
            <>
                {
                    loading ? <div className="col-12">
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <Skeleton className="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round" />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <Skeleton className="w-8rem border-round h-2rem" />
                                <Skeleton className="w-6rem border-round h-1rem" />
                                <div className="flex align-items-center gap-3">
                                    <Skeleton className="w-6rem border-round h-1rem" />
                                    <Skeleton className="w-3rem border-round h-1rem" />
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <Skeleton className="w-4rem border-round h-2rem" />
                                <Skeleton shape="circle" className="w-3rem h-3rem" />
                            </div>
                        </div>
                    </div>
                </div> : <div className="col-12">
                        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                            <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div className="text-2xl font-bold text-900">{product.name}</div>
                                    <Rating value={product.rating} readOnly cancel={false}></Rating>
                                    <div className="flex align-items-center gap-3">
                                        <span className="flex align-items-center gap-2">
                                            <i className="pi pi-tag"></i>
                                            <span className="font-semibold">{product.category}</span>
                                        </span>
                                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                                    </div>
                                </div>
                                <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                    <span className="text-2xl font-semibold">${product.price}</span>
                                    <Button onClick={()=>{showSuccess(cartItems.find(item => item.id === product.id)? `${product.name} removed from cart`: `${product.name} added to cart`); cartItems.find(item => item.id === product.id) ? dispatch(removeFromCart(product.id)): dispatch(addToCart(product))}} icon={`pi ${cartItems.find(item => item.id === product.id) ? "pi-check":"pi-shopping-cart"}`} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>


        );
    };

    const gridItem = (product) => {
        return (
            <>
                {
                    loading ? <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2">
                    <div className="p-4 border-1 surface-border surface-card border-round">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <Skeleton className="w-6rem border-round h-1rem" />
                            <Skeleton className="w-3rem border-round h-1rem" />
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <Skeleton className="w-9 shadow-2 border-round h-10rem" />
                            <Skeleton className="w-8rem border-round h-2rem" />
                            <Skeleton className="w-6rem border-round h-1rem" />
                        </div>
                        <div className="flex align-items-center justify-content-between">
                            <Skeleton className="w-4rem border-round h-2rem" />
                            <Skeleton shape="circle" className="w-3rem h-3rem" />
                        </div>
                    </div>
                </div> : <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2">
                        <div className="p-4 border-1 surface-border surface-card border-round">
                            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                                <div className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </div>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                            <div className="flex flex-column align-items-center gap-3 py-5" onClick={()=> router.push(`/product_detail?productId=${product.id}`)}>
                                <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                                <div className="text-2xl font-bold">{product.name}</div>
                                <Rating value={product.rating} readOnly cancel={false}></Rating>
                            </div>
                            <div className="flex align-items-center justify-content-between">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                <Button onClick={()=>{showSuccess(cartItems.find(item => item.id === product.id)? `${product.name} removed from cart`: `${product.name} added to cart`); cartItems.find(item => item.id === product.id) ? dispatch(removeFromCart(product.id)): dispatch(addToCart(product))}} icon={`pi ${cartItems.find(item => item.id === product.id) ? "pi-check":"pi-shopping-cart"}`} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            </div>
                        </div>
                    </div>
                }
            </>

        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    const header = () => {
        return (
            <>
                <div className="flex justify-content-between items-center">
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </>
        );
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} sortField={sortField} sortOrder={sortOrder} paginator paginatorPosition='bottom' rows={12} />
            <ScrollTop className='bg-primary' />
        </div>
    )
}
