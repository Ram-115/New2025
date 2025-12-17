import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
const OurCustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [Search,setSearch]=useState('')
    const getCustomers = async()=>{
        const response = await fetch('http://localhost:5000/users');
        const data =await response.json();
        setCustomers(data);
    }
    useEffect(()=>{
        getCustomers();
    },[]);
    const filterList = customers.filter((customer:any)=>{
        return customer.name.toLowerCase().includes(Search.toLowerCase()) || customer.email.toLowerCase().includes(Search.toLowerCase());
    });
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', overflowY: 'auto',width: '100%' }} className='pdngSM' >
        <div className='flexRow jBtwn aCntr'>
            <span className='fontWeightBold pdngSM hdingWLG primaryColor'>Users</span>
            <TextField label='Search' variant='outlined' size='small' value={Search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className='flexCol' style={{maxHeight: '74vh', overflowY: 'auto'}}>
    <Table style={{ width: '100%' }}>
        <TableHead> 
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
        </TableHead>
        <TableBody> 
            {filterList?.length > 0 ? (
            <>
            {filterList.map((customer:any)=>(
            <TableRow>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
            </TableRow>
            ))}
            </>):(
                <TableRow>
                    <TableCell colSpan={2}>No customers found</TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
    </div>
    </div>
  )
}
export default OurCustomersPage