import {
    Button,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Grid
  } from '@mui/material';
  import { useState } from 'react';
  import axios from 'axios';
  import { toast } from 'react-toastify';
  import InventoryIcon from '@mui/icons-material/Inventory';
  import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
  import ImageIcon from '@mui/icons-material/Image';
  import WorkspacesIcon from '@mui/icons-material/Workspaces';
  import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
  import CheckroomIcon from '@mui/icons-material/Checkroom';
  import HomeIcon from '@mui/icons-material/Home';
  import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
  import StyleIcon from '@mui/icons-material/Style';   
  import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone'; 
  import AddIcon from '@mui/icons-material/Add';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  const ProductsPage = () => {
    const [ProductName, setProductName] = useState('');
    const [Price, setPrice] = useState('');
    const [ProductImage, setProductImage] = useState('');
    const [Description, setDescription] = useState('');
    const [Category, setCategory] = useState('');
    const [Stock, setStock] = useState('');
  
    const handleAddProduct = async () => {
      try {
        const response = await axios.post('http://localhost:5000/addProduct', {
          ProductName,
          Price,
          ProductImage,
          Description,
          Category,
          Stock
        });
  
        if (response?.data?.status === true) {
          toast.success('Product added successfully');
          setProductName('');
          setPrice('');
          setProductImage('');
          setDescription('');
          setCategory('');
          setStock('');
        } else {
          toast.error(response?.data?.message);
        }
      } catch {
        toast.error('Error adding product');
      }
    };
  
    return (
      <div className="flexCol fullH fullW pdngLG">
        <span className='flexRow aCntr' style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          <CloudUploadIcon className='primaryColor'  style={{marginRight: '8px',fontSize: '36px'}}/>
          Upload Products
        </span>
  <div className='flexCol fullW pdngLG'>
        <Grid container spacing={2} style={{backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'}}>
          <Grid item xs={12} md={6} mb={2}>
            <TextField
            //   label="Product Name*"
            placeholder="Product Name*"
              size="small"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <InventoryIcon className='primaryColor'  style={{marginRight: '8px'}}/>
              }}
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>
  
          <Grid item xs={12} md={6}>
            <TextField
            //   label="Price*"
            placeholder="Price*"
              type="number"
              size="small"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <CurrencyRupeeIcon className='primaryColor'  style={{marginRight: '8px'}}/>
              }}
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
  
          <Grid item xs={12} md={6} mb={2}>
            <TextField
            //   label="Product Image*"
            placeholder="Product Image*"
              size="small"
              fullWidth
              value={ProductImage}
              onChange={(e) => setProductImage(e.target.value)}
              InputProps={{
                startAdornment: <ImageIcon className='primaryColor'  style={{marginRight: '8px'}}/>
              }}
            />
          </Grid>
  
          <Grid item xs={12} md={6}>
            <TextField
            //   label="Stock*"
            placeholder="Stock*"
              type="number"
              size="small"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <WorkspacesIcon className='primaryColor'  style={{marginRight: '8px'}}/>
              }}
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Grid>
  
          <Grid item xs={12} mb={2}>
            <TextField
            //   label="Description*"
            placeholder="Description*"
              size="small"
              fullWidth
              multiline
              rows={3}
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
  
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Category*</InputLabel>
              <Select
                label="Category*"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Electronics">
                <div className='flexRow aCntr'>
                    <OfflineBoltIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                    Electronics
                </div>
                </MenuItem>
                <MenuItem value="Clothing">
                <div className='flexRow aCntr'>
                    <CheckroomIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                    Clothing
                </div>
                </MenuItem>
                <MenuItem value="Home">
                <div className='flexRow aCntr'>
                    <HomeIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                    Home
                </div>
                </MenuItem>
                <MenuItem value="Sports">
                <div className='flexRow aCntr'>
                    <SportsBaseballIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                    Sports
                </div>
                </MenuItem>
                <MenuItem value="Books">
                <div className='flexRow aCntr'>
                    <StyleIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                    Books
                </div>
                </MenuItem>
                <MenuItem value="Other">
                <div className='flexRow aCntr'>
                    <TextRotationNoneIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                    Other
                </div>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={12} px={4} py={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button variant="contained" onClick={handleAddProduct} startIcon={<AddIcon style={{color: 'white'}} />}>
              Add Product
            </Button>
          </Grid>
        </Grid>
        </div>
      </div>
    );
  };
  
  export default ProductsPage;
  