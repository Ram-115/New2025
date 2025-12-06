import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
const OurCustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const getCustomers = async()=>{
        const response = await fetch('http://localhost:5000/users');
        const data =await response.json();
        setCustomers(data);
    }
    useEffect(()=>{
        getCustomers();
    },[]);
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}  >
    <Table>
        <TableHead> 
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
        </TableHead>
        <TableBody> 
            {customers?.length > 0 ? (
            <>
            {customers.map((customer:any)=>(
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
  )
}
export default OurCustomersPage