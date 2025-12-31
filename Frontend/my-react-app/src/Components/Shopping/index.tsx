import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Drawer,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grow,
    Zoom,
    Grid
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddtoCart from './Components/AddtoCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import StyleIcon from '@mui/icons-material/Style';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
const ShoppingPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categoryBy, setCategoryBy] = useState('All');
    const [showAddtoCart, setShowAddtoCart] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);

    const userStr = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userStr);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getProducts');
            if (response.data.status === true) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch {
            toast.error('Failed to fetch products');
        }
    };
    console.log("cartItems", cartItems);
    const getCartItems = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/getCartItems?userId=${user?._id}`
            );
            if (response.data.status === true) {
                setCartItems(response.data.cartItems);
            } else {
                toast.error(response.data.message);
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to get cart items');
        }
    };

    useEffect(() => {
        getProducts();
        getCartItems();
    }, []);

    const handleAddToCart = async (product: any) => {
        try {
            const requestData = {
                userId: user?._id,
                productId: product._id,
                quantity: 1,
                price: product.Price,
                ProductName: product.ProductName,
                ProductImage: product.ProductImage,
                ProductDescription: product.Description,
                ProductPrice: product.Price,
                totalQuantity: 1,
                Stock: product.Stock
            };

            const response = await axios.post(
                'http://localhost:5000/addToCart',
                requestData
            );

            if (response.data.status === true) {
                toast.success(response.data.message);
                setShowAddtoCart(true);
                await getCartItems();
            } else {
                toast.error(response.data.message);
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to add product to cart');
        }
    };
    const filteredProducts = categoryBy === 'All' ? products : products.filter((product: any) => product.Category === categoryBy);
    const handleCategoryChange = (event: any) => {
        setCategoryBy(event.target.value);
    };
    console.log("filteredProducts", filteredProducts , );

    return (
        <div
            className="flexCol fullW"
            style={{ position: 'relative', minHeight: '90vh', overflowY: 'auto' }}
        >
            {/* Floating Cart Button */}
            <div
                style={{
                    position: 'fixed',
                    right: '30px',
                    bottom: '30px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#0C5A96',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 10
                }}
                onClick={() => setShowAddtoCart(true)}
            >
                <AddShoppingCartIcon sx={{ color: '#fff' }} />
            </div>

            {/* Cart Count */}
            <div
                style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '60px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    zIndex: 11
                }}
            >
                {cartItems.length}
            </div>
            <div className='flexRow fullW jBtwn pdngMD' style={{ position: 'sticky', top: '0', zIndex: 1000, backgroundColor: '#fff' }}>
                <div className='flexMinWidthRow jBtwn'>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Shop and Buy Products
                    </span>
                </div>
                <div className='flexAutoRow' style={{ width: '200px' }}>
                    <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryBy}
                            label="Filter by"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value={'All'}>
                                <div className='flexRow aCntr'>
                                    <AllInclusiveIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    All
                                </div>
                            </MenuItem>
                            <MenuItem value={'Electronics'}>
                                <div className='flexRow aCntr'>
                                    <OfflineBoltIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    Electronics
                                </div>
                            </MenuItem>
                            <MenuItem value={'Clothing'}>
                                <div className='flexRow aCntr'>
                                    <CheckroomIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    Clothing
                                </div>
                            </MenuItem>
                            <MenuItem value={'Home'}>
                                <div className='flexRow aCntr'>
                                    <HomeIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    Home
                                </div>
                            </MenuItem>
                            <MenuItem value={'Sports'}>
                                <div className='flexRow aCntr'>
                                    <SportsBaseballIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    Sports
                                </div>
                            </MenuItem>
                            <MenuItem value={'Books'}>
                                <div className='flexRow aCntr'>
                                    <StyleIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    Books
                                </div>
                            </MenuItem>
                            <MenuItem value={'Other'}>
                                <div className='flexRow aCntr'>
                                    <TextRotationNoneIcon className='primaryColor' style={{ marginRight: '8px' }} />
                                    Other
                                </div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {/* Products Grid */}
            <Grid container spacing={2} padding={3}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                        <Grid
                            item
                            key={index}
                            xs={12}    
                            lg={4}  
                        >
                            <Grow in={true} timeout={500}>
                                <Card
                                    style={{
                                        height: '420px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        border: '1px solid rgb(238, 242, 241)'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        className="pdngSM"
                                        style={{ objectFit: 'contain' }}
                                        image={item.ProductImage}
                                        alt={item.ProductName}
                                    />

                                    <CardContent
                                        style={{
                                            borderTop: '1px solid rgb(238, 242, 241)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1
                                        }}
                                    >
                                        <Typography variant="h6" className="primaryColor" style={{
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {item.ProductName}
                                        </Typography>

                                        <Typography variant="body1">
                                            Price: ₹{item.Price}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                lineHeight: '1.5em',
                                                height: '3em',
                                                marginBottom: '12px',
                                                textAlign: 'justify'
                                            }}
                                        >
                                            {item.Description}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginTop: 'auto' }}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </CardContent>
                                    {item?.Stock < 5 &&
                                    <div className='flexRow jCntr aCntr fullW pdngXXS' style={{ width: '120px', borderRadius: '4px', fontSize: '11px',color: '#fff', position: 'absolute',top: '0', right: '0', backgroundColor: '#FF0000' }}>
                                        Hurry Up! Only {item?.Stock} left
                                    </div>}
                                </Card>
                            </Grow>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <div className='flexCol jCntr aCntr fullW' style={{ height: '70vh' }}>
                            <img
                                src={'/public/Icons/noData.png'}
                                alt='No products found'
                                style={{ width: '100px', height: '100px' }}
                            />
                            <Typography variant='h6' className='pdngTSM'>
                                No products found
                            </Typography>
                        </div>
                    </Grid>
                )}
            </Grid>


            {/* Cart Drawer */}
            <Drawer
                anchor="right"
                open={showAddtoCart}
                onClose={() => setShowAddtoCart(false)}
            >
                <AddtoCart
                    cartItems={cartItems}
                    setShowAddtoCart={setShowAddtoCart}
                    setCartItems={setCartItems}
                />
            </Drawer>
        </div>
    );
};

export default ShoppingPage;
