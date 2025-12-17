import { Button, IconButton, useMediaQuery } from '@mui/material'
import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
const AddtoCart = (props: any) => {
    const { cartItems ,setShowAddtoCart, setCartItems} = props;
    const userStr = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userStr);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [quantity, setQuantity] = useState(1);
 const handleClearCart = async () => {
    try {
        const response = await axios.post('http://localhost:5000/clearCart', {
            userId: user,
            cartItems: cartItems
        });
        if (response.data.status === true) {
            toast.success(response.data.message);
            setCartItems([]);
            setShowAddtoCart(false);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error('Failed to clear cart');
    }
    setCartItems([]);
    setShowAddtoCart(false);
 }
    return (
        <div className='flexCol fullH' style={{ width: isMobile ? '100%' : '450px' }}>
            <div className='flexAutoRow'>
                <div className='flexRow jBtwn aCntr pdngSM fullW' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                    <span className='primaryColor' style={{ fontSize: '20px', fontWeight: '600' }}>Add to Cart ({cartItems.length})</span>
                    <IconButton onClick={() => setShowAddtoCart(false)}>
                        <Close />
                    </IconButton>
                </div>
            </div>
            <div className='flexMinHeightCol pdngSM' style={{ overflowY: 'auto' }}>
                <div className='flexCol fullW'>
                    {cartItems.length < 1 ?
                    <div className='flexCol fullW aCntr jCntr' style={{ height: '70vh' }}>
                        <div style={{width: '120px', height: '120px'}}>
                        <img src={'/public/Icons/noData.png'} alt='' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <span className='primaryColor pdngVSM' style={{ fontSize: '18px', fontWeight: '600' }}>No items in cart</span>
                    </div>
                      : 
                    <>
                    {cartItems.map((item: any) => (
                    <div className='flexRow fullW pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                        <div className='FlexAutoRow' style={{ width: '100px', height: '100px' }}>
                                <img src={item.ProductImage} alt='' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div className='flexMinWidthCol pdngLSM'>
                            <span className='primaryColor' style={{ fontSize: '16px', fontWeight: '600' }}>{item.ProductName}</span>
                            <span className='primaryColor pdngVSM' style={{ fontSize: '16px', fontWeight: '600' }}>₹{item?.ProductPrice}</span>
                            <div className='flexRow aCntr jEnd gap16'>
                                <Button variant='contained' color='primary' onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                                    -
                                </Button>
                                <span className='primaryColor' style={{ fontSize: '16px', fontWeight: '600' }}>{quantity}</span>
                                <Button variant='contained' color='primary' onClick={() => setQuantity(quantity + 1)} disabled={quantity >= 5}>
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                    ))}
                    </>
                    }
                </div>
            </div>
            <div className='flexAutoRow jEnd aCntr pdngSM gap16' style={{ borderTop: '1px solid rgb(238, 242, 241)' }}>
                <Button variant='contained' color='primary' onClick={handleClearCart} disabled={cartItems.length === 0}>Clear Cart</Button>
                <Button variant='contained' color='primary' disabled={cartItems.length === 0}>Checkout</Button>
            </div>
        </div>
    )
}

export default AddtoCart