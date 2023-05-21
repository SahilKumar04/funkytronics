import { addToCart, removeFromCart } from '@/store/cartSlice';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { InputNumber } from 'primereact/inputnumber';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const handleQtyChange = (e, product) => {
    if (
      e.target.className.includes('pi-minus') ||
      e.target.className.includes('p-inputnumber-button-down')
    ) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const listItem = (product) => {
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column xl:flex-row xl:align-items-center p-4 gap-4">
            <img
              className="w-9 sm:w-16rem xl:w-6rem shadow-2 block xl:block mx-auto border-round"
              src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
              alt={product.name}
            />
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                <div className="text-2xl font-bold text-900">
                  {product.name}
                </div>
                
              </div>
              <div className="flex sm:flex-row-reverse align-items-center sm:align-items-center gap-4 sm:gap-2">
                <span className="text-2xl font-semibold">${product.price}</span>
                {cartItems.find((item) => item.id === product.id) ? (
                  <div className="card flex justify-content-center">
                    <InputNumber
                      value={
                        cartItems.find((item) => item.id === product.id)
                          .quantity
                      }
                      onClick={(e) => handleQtyChange(e, product)}
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button"
                      incrementButtonClassName="p-button"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      showSuccess(
                        cartItems.find((item) => item.id === product.id)
                          ? `${product.name} removed from cart`
                          : `${product.name} added to cart`
                      );
                      cartItems.find((item) => item.id === product.id)
                        ? dispatch(removeFromCart(product.id))
                        : dispatch(addToCart(product));
                    }}
                    icon={`pi ${
                      cartItems.find((item) => item.id === product.id)
                        ? 'pi-check'
                        : 'pi-shopping-cart'
                    }`}
                    className="p-button-rounded"
                    disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const header = () => {
    return <>
      <div className="flex align-items-end justify-content-end items-center">
        <span className="text-2xl font-semibold">${total}</span>
      </div>
    </>
  }

  return (
    <div>
      <DataView value={cartItems} itemTemplate={listItem} layout="list" header={header()} />
    </div>
  );
};

export default Cart;
