import { Avatar, Badge, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import Profile from './Components/Profile';
import { useUser } from '../Contexts/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import DeletePopUp from '../Common/DeletePopUp';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Layout from './Components/Layout';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notifications from './Components/Notifications';
const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user } = useUser();
    console.log('user111', user);
    const [openProfile, setOpenProfile] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)');
    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [active, setActive] = useState('');
    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    // Routes that should show Layout (sidebar)
    const routesWithLayout = ['/home'];
    const shouldShowLayout = routesWithLayout.includes(location.pathname);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleFullscreen = async () => {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        } else {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      };

      
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }} className='fullH' >
            <div style={{ display: 'flex', flexDirection: 'column' }} className='fullH'>
                {/* Header - Always shown */}
                <div className='flexAutoCol pdngMD' style={{ background: '#0C5A96', color: '#fff' }}>
                    <div className='flexRow jBtwn aCntr'>
                        <div className='flexAutoRow gap16 aCntr'>
                        {isMobile && (
                            <div className='flexAutoRow aCntr gap16' onClick={() => setOpenDrawer(true)}
                                style={{ cursor: 'pointer' }}><MenuIcon style={{ fontSize: '24px', color: '#fff' }} /></div>
                        )}
                        <div className='flexAutoRow aCntr gap16'>
                            <DiamondIcon style={{ fontSize: '36px', color: '#fff' }} />
                            {/* <img src={'/Icons/clothnew.png'} alt='' style={{width:'100px', height:'100px'}}/> */}
                            {/* <span style={{ fontSize: '18px', fontWeight: '600', color: '#fff', fontFamily: '-moz-initial' }}>Clothing New</span> */}
                        </div>
                        </div>
                        <div className='flexMinWidthRow aCntr jEnd' style={{ gap: '24px' }}>
                        <div className='flexAutoRow gap16 aCntr'>
                            <Badge badgeContent={4} color="error"><NotificationsIcon style={{ fontSize: '24px', color: '#fff' ,cursor: 'pointer'}} onClick={() => setOpenNotifications(true)}/></Badge>
                        </div>
                        <div className='flexAutoRow gap16 aCntr'>
                            {isFullscreen ? <ZoomInMapIcon style={{ fontSize: '24px', color: '#fff' ,cursor: 'pointer'}} onClick={handleFullscreen} /> : <ZoomOutMapIcon style={{ fontSize: '24px', color: '#fff' ,cursor: 'pointer'}} onClick={handleFullscreen} />}
                            <Avatar src={user?.profileImage || '/public/Icons/avatar.png'} alt='' onClick={handleOpen} style={{ width: '36px', height: '36px', objectFit: 'contain', cursor: 'pointer' }} />
                        </div>
                        </div>
                    </div>
                </div>
                {/* Conditionally show Layout only for specific routes */}
                {!shouldShowLayout ? (
                    <Layout />
                ) : (
                    <div className='flexMinHeightCol' style={{ backgroundColor: '#fff' }}>
                        <Outlet />
                    </div>
                )}
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    setOpenProfile(true)
                    handleClose()
                }}
                >
                    <div className='flexRow aCntr pdngXXS'>
                        <div className='flexAutoRow'>
                            <Avatar src={user?.profileImage || '/public/Icons/avatar.png'} alt='' style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                        </div>
                        <div className='flexAutoRow pdngLXS'>
                            <span style={{ fontSize: '16px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</span>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => {
                    setOpenDelete(true)
                    handleClose()
                }}>
                    <div className='flexRow aCntr pdngXXS' >
                        <div className='flexAutoRow'>
                            <LogoutIcon style={{ fontSize: '24px', color: 'red' }} />
                        </div>
                        <div className='flexAutoRow pdngLXS'>
                            <span style={{ fontSize: '16px', color: 'red' }}>Logout</span>
                        </div>
                    </div>
                </MenuItem>
            </Menu>
            {openProfile && <Profile open={openProfile} handleClose={() => setOpenProfile(false)} />}
            {openDelete && <DeletePopUp open={openDelete} handleClose={() => {
                setOpenDelete(false)
                handleClose()
            }
            } handleDelete={() => navigate('/')} actionContent='Logout' />}
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <div style={{ width: 250 }}>
                    <div className='flexRow jEnd aCntr pdngXS'
                        style={{
                            fontWeight: 600,
                            fontSize: '18px',
                            borderBottom: '1px solid rgb(181, 204, 198)',
                            background: '#0C5A96',
                            color: '#fff'
                        }}
                    >
                       {/* <span className='pointer' onClick={() => setOpenDrawer(false)} style={{ cursor: 'pointer' }}> Menu</span> */}
                       <span className='pointer' onClick={() => setOpenDrawer(false)} style={{ cursor: 'pointer' , fontSize:'12px'}}> <CloseIcon /></span>
                    </div>

                    <div className='flexCol'>
                        {/* <span style={{fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/home' ? 'rgb(210 232 226)' : 'transparent',}}
                            className='fontWeightBold pdngSM pointer'
                            onClick={() => {
                                navigate('/home');
                                setOpenDrawer(false);
                            }}
                        >
                            Home
                        </span> */}
                        <span style={{fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/users' ? 'rgb(210 232 226)' : 'transparent',}}
                            className='fontWeightBold pdngSM pointer'
                            onClick={() => {
                                navigate('/users');
                                setOpenDrawer(false);
                            }}
                        >
                            Users
                        </span>

                        <span style={{fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/products' ? 'rgb(210 232 226)' : 'transparent',}}
                            className='fontWeightBold pdngSM pointer'
                            onClick={() => {
                                navigate('/products');
                                setOpenDrawer(false);
                            }}
                        >
                            Products
                        </span>

                        <span style={{fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/shopping' ? 'rgb(210 232 226)' : 'transparent',}}
                            className='fontWeightBold pdngSM pointer'
                            onClick={() => {
                                navigate('/shopping');
                                setOpenDrawer(false);
                            }}
                        >
                            Shopping
                        </span>

                        <span style={{fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/orders' ? 'rgb(210 232 226)' : 'transparent',}}
                            className='fontWeightBold pdngSM pointer'
                            onClick={() => {
                                navigate('/orders');
                                setOpenDrawer(false);
                            }}
                        >
                            Orders
                        </span>
                        <span style={{fontSize: '18px', borderBottom: '1px solid rgb(181, 204, 198)', backgroundColor: active === '/analytics' ? 'rgb(210 232 226)' : 'transparent',}}
                            className='fontWeightBold pdngSM pointer'
                            onClick={() => {
                                navigate('/analytics');
                                setOpenDrawer(false);
                            }}
                        >
                            Analytics
                        </span>
                    </div>
                </div>
            </Drawer>
            <Drawer
                anchor="right"
                open={openNotifications}
                onClose={() => setOpenNotifications(false)}
            >
                <Notifications handleClose={() => setOpenNotifications(false)} />
            </Drawer>

        </div>
    )
}
export default DashboardPage