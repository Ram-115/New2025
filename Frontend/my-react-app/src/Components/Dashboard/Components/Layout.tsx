import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import BarChartIcon from '@mui/icons-material/BarChart';
const Layout = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    const active = useLocation().pathname;
    return (
        <div className='flexMinHeightCol' style={{ backgroundColor: '#fff' }}>
            <div className='flexRow fullH'>
                {!isMobile && (
                    <div className='flexAutoRow' style={{ backgroundColor: '#fff', color: '#000', border: '1px solid rgb(228, 231, 230)', minWidth: '250px' }}>
                        <div className='flexCol'>
                            {/* <span className='fontWeightBold pdngSM pointer' onClick={() => navigate('/home')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/home' ? 'rgb(210 232 226)' : 'transparent', }}>Home</span> */}
                            <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/users')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(229, 235, 234)', backgroundColor: active === '/users' ? '#f2f4f8' : 'transparent' }}>
                                <PeopleAltIcon className={`${active === '/users' ? 'primaryColor' : 'grayColor'}`} style={{ marginRight: '8px' }} />
                                <span className={`${active === '/users' ? 'primaryColor' : 'grayColor'}`}>Users</span>
                            </span>
                            <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/products')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(229, 235, 234)', backgroundColor: active === '/products' ? '#f2f4f8' : 'transparent', }}>
                                <InventoryIcon className={`${active === '/products' ? 'primaryColor' : 'grayColor'}`} style={{ marginRight: '8px' }} />
                                <span className={`${active === '/products' ? 'primaryColor' : 'grayColor'}`}>Products</span>
                            </span>
                            <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/shopping')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(229, 235, 234)', backgroundColor: active === '/shopping' ? '#f2f4f8' : 'transparent', }}>
                                <ShoppingCartIcon className={`${active === '/shopping' ? 'primaryColor' : 'grayColor'}`} style={{ marginRight: '8px' }} />
                                <span className={`${active === '/shopping' ? 'primaryColor' : 'grayColor'}`}>Shopping</span>
                            </span>
                            <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/orders')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(229, 235, 234)', backgroundColor: active === '/orders' ? '#f2f4f8' : 'transparent', }}>
                                <BorderOuterIcon className={`${active === '/orders' ? 'primaryColor' : 'grayColor'}`} style={{ marginRight: '8px' }} />
                                <span className={`${active === '/orders' ? 'primaryColor' : 'grayColor'}`}>Orders</span>
                            </span>
                            <span className='flexRow aCntr fontWeightBold pdngSM pointer' onClick={() => navigate('/analytics')} style={{ fontSize: '18px', borderBottom: '1px solid rgb(229, 235, 234)', backgroundColor: active === '/analytics' ? '#f2f4f8' : 'transparent', }}>
                                <BarChartIcon className={`${active === '/analytics' ? 'primaryColor' : 'grayColor'}`} style={{ marginRight: '8px' }} />
                                <span className={`${active === '/analytics' ? 'primaryColor' : 'grayColor'}`}>Analytics</span>
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