import { Button, IconButton, TextField, Typography, useMediaQuery } from '@mui/material'
import { Close } from '@mui/icons-material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}
const AddtoCart = (props: any) => {
    const { cartItems, setShowAddtoCart, setCartItems } = props;
    const [ addressSaved, setAddressSaved] = useState<any[]>([]);
    const [addressToShow, setAddressToShow] = useState(false);
    const [address, setAddress] = useState({
        name:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipCode:'',
        country:'',
        phoneNumber:''
    })
    const userStr = localStorage.getItem('user') || '{}';
    const [checkoutItems, setCheckoutItems] = useState(false);
    const user = JSON.parse(userStr);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const handleClearCart = async () => {
        try {
            const response = await axios.post('http://localhost:5000/clearCart', {
                userId: user?._id || user,
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
    const handleDeleteItem = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteItem/${id}?userId=${user?._id}`);
            if (response.data.status === true) {
                toast.success(response.data.message || 'Item deleted from cart');
                setCartItems(cartItems.filter((item: any) => item._id !== id));
                setShowAddtoCart(false);
            } else {
                toast.error(response.data.message || 'Failed to delete item');
            }
        } catch (error) {
            toast.error('Failed to delete item');
        }
    }
    const handleQuantityChange = async (id: string, newQuantity: number) => {
        try {
            const response = await axios.put('http://localhost:5000/updateQuantity', {
                userId: user,
                ItemId: id,
                quantity: newQuantity
            });
            if (response.data.status === true) {
                toast.success(response.data.message || 'Quantity updated');
                setCartItems(cartItems.map((item: any) =>
                    item._id === id
                        ? { ...item, quantity: newQuantity, totalQuantity: newQuantity }  // ✅ Use newQuantity
                        : item
                ));
                // setQuantity(quantity);
            } else {
                toast.error(response.data.message || 'Failed to update quantity');
            }
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    }
    console.log(cartItems, 'cartItems');
    const subtotal = cartItems.reduce((total: number, item: any) => {
        const quantity = item?.quantity || item?.totalQuantity || 1;
        return total + (item?.ProductPrice || item?.price || 0) * quantity;
    }, 0);
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal + shipping;
    const handleCheckout = () => {
        setCheckoutItems(true);
        if (subtotal > 1000) {
            toast.success('Congratulations! You are eligible for free shipping.');
        }
    }
    const handleAddAddress = async () => {
        // Validate required fields
        if (!address.name || !address.email || !address.address || !address.city || 
            !address.state || !address.zipCode || !address.country || !address.phoneNumber) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/addAddress', {
                userId: user?._id || user,
                name: address.name,
                email: address.email,
                address: address.address,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
                country: address.country,
                phoneNumber: address.phoneNumber
            });
            if(address.name.length < 4) {
                toast.error('Name should be at least 4 characters long');
                return;
            }
            if(address.email.includes('@') && address.email.includes('.') && address.email.includes(' ')) {
                toast.error('Invalid email');
                return;
            }
            if(address.phoneNumber.length !== 10) {
                toast.error('Phone number should be 10 digits long');
                return;
            }
            if(address.zipCode.length !== 6) {
                toast.error('Zip code should be 6 digits long');
                return;
            }
            
            if (response.data.status === true) {
                toast.success(response.data.message);
                const addressObj = {
                    name: address.name,
                    email: address.email,
                    address: address.address,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode,
                    country: address.country,
                    phoneNumber: address.phoneNumber
                };
                setAddressSaved([...addressSaved, addressObj]);
                setAddressToShow(true);
                setAddress({
                    name: '', email: '', address: '', city: '',
                    state: '', zipCode: '', country: '', phoneNumber: ''
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            console.error('Add address error:', error);
            toast.error(error.response?.data?.message || 'Failed to add address');
        }
    }
    const handleCreateOrder = async () => {
        try {
            if (!addressSaved || addressSaved.length === 0) {
                toast.error('Please fill the address');
                return;
            }
            const orderResponse = await axios.post('http://localhost:5000/createRazorpayOrder', {
                amount: total,
                currency: 'INR'
            });

            if (orderResponse.data.status !== true) {
                toast.error(orderResponse.data.message || 'Failed to initialize payment');
                return;
            }

            const { orderId } = orderResponse.data;
            const options = {
                key: 'rzp_test_Rt31dTRUU83ZIz',
                amount: total * 100,
                currency: 'INR',
                name: 'Clothing New',
                description: 'Order Payment',
                order_id: orderId,
                handler: async function (response: any) {
                    try {
                        const verifyResponse = await axios.post('http://localhost:5000/createOrder', {
                            userId: user?._id || user,
                            cartItems: cartItems,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            address: addressSaved[0], // Send first address object, not array
                            subtotal: subtotal,
                            shipping: shipping,
                            total: total
                        });

                        if (verifyResponse.data.status === true) {
                            toast.success(verifyResponse.data.message || 'Order placed successfully!');
                            setCartItems([]);
                            setCheckoutItems(false);
                            setShowAddtoCart(false);
                        } else {
                            toast.error(verifyResponse.data.message || 'Order creation failed');
                        }
                    } catch (error: any) {
                        console.error('Order creation error:', error);
                        toast.error(error.response?.data?.message || 'Failed to create order');
                    }
                },
                prefill: {
                    name: addressSaved[0]?.name || user?.name || '',
                    email: addressSaved[0]?.email || user?.email || '',
                    contact: addressSaved[0]?.phoneNumber || ''
                },
                theme: {
                    color: '#0C5A96'
                },
                modal: {
                    ondismiss: function() {
                        toast.info('Payment cancelled');
                    }
                }
            };

            // Step 4: Open Razorpay Checkout
            if (window.Razorpay) {
                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } else {
                toast.error('Razorpay SDK not loaded. Please refresh the page.');
            }

        } catch (error: any) {
            console.error('Payment initialization error:', error);
            toast.error(error.response?.data?.message || 'Failed to initialize payment');
        }
    }
    console.log(cartItems, 'cartItems');
    return (
        <div className='flexCol fullH' style={{ width: isMobile ? '100%' : '450px' }}>
            <div className='flexAutoRow'>
                <div className='flexRow jBtwn aCntr pdngSM fullW' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                    <span className='primaryColor' style={{ fontSize: '20px', fontWeight: '600' }}>{checkoutItems ? 'Checkout' : 'Add to Cart'} ({cartItems.length})</span>
                    <IconButton onClick={() => setShowAddtoCart(false)}>
                        <Close />
                    </IconButton>
                </div>
            </div>
            {!checkoutItems ?
                <div className='flexMinHeightCol pdngSM' style={{ overflowY: 'auto' }}>
                    <div className='flexCol fullW'>
                        {cartItems.length < 1 ?
                            <div className='flexCol fullW aCntr jCntr' style={{ height: '70vh' }}>
                                <div style={{ width: '120px', height: '120px' }}>
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
                                                <DeleteForeverIcon style={{ fontSize: '24px', cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteItem(item._id)} />
                                                <Button 
                                                    variant='outlined' 
                                                    color='primary' 
                                                    onClick={() => handleQuantityChange(item._id, (item.quantity || item.totalQuantity || 1) - 1)} 
                                                    disabled={(item.quantity || item.totalQuantity || 1) <= 1}
                                                >
                                                    -
                                                </Button>
                                                <span className='primaryColor' style={{ fontSize: '16px', fontWeight: '600' }}>
                                                    {item.quantity || item.totalQuantity || 1}
                                                </span>
                                                <Button 
                                                    variant='outlined' 
                                                    color='primary' 
                                                    onClick={() => handleQuantityChange(item._id, (item.quantity || item.totalQuantity || 1) + 1)} 
                                                    disabled={(item.quantity || item.totalQuantity || 1) >= 10 || (item?.quantity  || item?.totalQuantity) >= item?.Stock}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </div> :
                <div className='flexMinHeightCol pdngSM' style={{ overflowY: 'auto' }}>
                    <div className='flexCol fullW'>
                        <span className='primaryColor' style={{ fontSize: '18px', fontWeight: '600' }}>Order Summary</span>
                        {cartItems.map((item: any) => (
                            <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                <div className='flexAutoRow'>
                                    <Typography
                                        noWrap
                                        sx={{ maxWidth: 180 }}
                                        minWidth={175}
                                        title={item.ProductName}
                                    >
                                        {item.ProductName}
                                    </Typography>

                                </div>
                                <div className='flexAutoRow'>
                                    x {item.quantity || item.totalQuantity || 1}
                                </div>
                                <div className='flexAutoRow'>
                                    ₹ {(item.ProductPrice || item.price || 0) * (item.quantity || item.totalQuantity || 1)}
                                </div>
                            </div>
                        ))}
                        <div className='flexCol aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                            <div className='flexRow aCntr jBtwn'>
                                <div className='flexAutoRow'>
                                    Subtotal
                                </div>
                                <div className='flexAutoRow'>
                                    ₹ {subtotal}
                                </div>
                            </div>
                            <div className='flexRow aCntr jBtwn pdngVSM'>
                                <div className='flexAutoRow'>
                                    Shipping
                                </div>
                                <div className='flexAutoRow'>
                                    ₹ {shipping}
                                </div>
                            </div>
                            <div className='flexRow aCntr jBtwn'>
                                <div className='flexAutoRow'>
                                    Total
                                </div>
                                <div className='flexAutoRow'>
                                    ₹ {total}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flexCol pdngVSM'>
                        <span className='primaryColor pdngBSM' style={{ fontSize: '16px', fontWeight: '600' }}>Add Address</span>
                        {addressToShow !== true ?
                        <div className = 'flexWrap gap16 pdngBSM'>
                        <TextField size='small' onChange={(e) => setAddress({ ...address, name: e.target.value })} name='name' placeholder='Name*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' onChange={(e) => setAddress({ ...address, email: e.target.value })} name='email' placeholder='Email*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' onChange={(e) => setAddress({ ...address, address: e.target.value })} name='address' placeholder='Address*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' onChange={(e) => setAddress({ ...address, city: e.target.value })} name='city' placeholder='City*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' onChange={(e) => setAddress({ ...address, state: e.target.value })} name='state' placeholder='State*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' type='number' onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} name='zipCode' placeholder='Zip Code*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' onChange={(e) => setAddress({ ...address, country: e.target.value })} name='country' placeholder='Country*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                            <TextField size='small' type='number' onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })} name='phoneNumber' placeholder='Phone Number*' variant='outlined' style={{ width: `calc(50% - 8px)`}} />
                        </div>:
                        <div className='flexCol aCntr jCntr'>
                            {addressSaved.map((item: any, index: number) => (
                                <div className='flexCol aCntr jCntr' key={index}>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            Name :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.name}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            Email :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.email}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            Phone Number :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.phoneNumber}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            Address :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.address}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            City :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.city}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            State :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.state}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            Zip Code :&nbsp;
                                        </div>
                                        <div className='flexMinWidthRow'>
                                            {item.zipCode}
                                        </div>
                                    </div>
                                    <div className='flexRow aCntr jBtwn pdngVSM' style={{ borderBottom: '1px solid rgb(238, 242, 241)' }}>
                                        <div className='flexAutoRow' style={{fontWeight: '600'}}>
                                            Country :&nbsp;
                                            </div>
                                            <div className='flexMinWidthRow'>
                                                {item.country}
                                            </div>

                                        </div>
                                    </div>
                            ))}
                            </div>}
                       {addressToShow !== true && <Button variant='contained' color='primary' onClick={handleAddAddress}>Add Address</Button>}
                    </div>
                </div>}
            <div className='flexAutoRow jEnd aCntr pdngSM gap16' style={{ borderTop: '1px solid rgb(238, 242, 241)' }}>
                <Button variant='contained' color='primary' onClick={checkoutItems ? () => setCheckoutItems(false) : handleClearCart} disabled={cartItems.length === 0}>
                    {checkoutItems ? 'Back to Cart' : 'Clear Cart'}
                </Button>
                <Button variant='contained' color='primary' onClick={checkoutItems ? handleCreateOrder : handleCheckout} disabled={cartItems.length === 0}>
                    {checkoutItems ? `Pay Now ${total}` : 'Checkout'}
                </Button>
            </div>
        </div>
    )
}

export default AddtoCart