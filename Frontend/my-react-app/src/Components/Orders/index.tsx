import { Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Orderpage from './Components/Orders';
import axios from 'axios';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Orders');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
      const [ordersList,setOrderList]=useState([]);
      const getOrdersList =async()=>{
          const response = await axios.get('http://localhost:5000/getOrders');
          console.log(response.data);
          if(response.data && response.data.status) {
              setOrderList(response.data.orders);
          }
      }
      useEffect(()=>{
          getOrdersList();
      },[]);
  return (
    <div className='flexCol pdngMD'>
      <div className='flexCol fullW'>
        <div className="flexAutoRow pdngBSM">
          <span style={{ fontSize: '24px', color: '#0C5A96', fontWeight:500 }}>Orders&nbsp;({ordersList.length})</span>
        </div>

      <div className='flexMinHeightCol'>
        <div className='flexCol'>
            <div className='flexAutoRow'>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab value="Orders" label="Orders" />
          <Tab value="Cancelled" label="Cancelled" />
          <Tab value="Returns" label="Returns" />
        </Tabs>
        </div>
        <div className='flexMinHeightCol'>
            {activeTab === 'Orders' && <Orderpage ordersList={ordersList}/>}
            {activeTab === 'Cancelled' && 'Cancelled'}
            {activeTab === 'Returns' && 'Returns'}

        </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Orders;
