import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';    
const Layout = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    const active = useLocation().pathname;
    return (
        <div className='flexMinHeightCol' style={{ backgroundColor: '#fff' }}>
                    <div className='flexRow fullH'>
                        {!isMobile && (
                            <div className='flexAutoRow' style={{ backgroundColor: '#fff', color: '#000', border: '1px solid rgb(181, 204, 198)', minWidth: '250px' }}>
                                <div className='flexCol'>
                                    {/* <span className='fontWeightBold pdngSM pointer' onClick={() => navigate('/home')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/home' ? 'rgb(210 232 226)' : 'transparent', }}>Home</span> */}
                                    <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/users')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/users' ? 'rgb(210 232 226)' : 'transparent', }}>
                                        <PeopleAltIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                                        Users
                                    </span>
                                    <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/products')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/products' ? 'rgb(210 232 226)' : 'transparent', }}>
                                        <InventoryIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                                        Products
                                    </span>
                                    <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/shopping')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/shopping' ? 'rgb(210 232 226)' : 'transparent', }}>
                                        <ShoppingCartIcon className='primaryColor'  style={{marginRight: '8px'}}/>
                                        Shopping
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className='flexMinWidthRow fullH fullW'>
                            <Outlet />
                        </div>
                    </div>
                </div>
    )
}
export default Layout