import { TextField } from "@mui/material";
const Orderpage = (props: { ordersList: any[] }) => {
    const { ordersList } = props;
  console.log('orderlist', ordersList);
    return (
        <div className='flexCol'>
            <div className='flexAutoCol'>
                <div className='flexRow jEnd aCntr gap16'>
                    <TextField placeholder='Search' size='small' />
                </div>
            </div>
            <div className='flexMinHeightCol pdngVSM gap16'>
                {ordersList.map((item:any,index:number)=>{
                    return (
                        <div className="flexCol pdngSM" style={{backgroundColor:'white', borderRadius:'9px', border:'1px solid #eee', boxShadow:'0 1px 1px rgba(0,0,0,0.1)'}} key={index}>
                            <div  style={{borderBottom:'1px solid #eee', paddingBottom:'8px'}}>Order ID: {item._id}</div>
                            <div>Total: ${item.totalAmount}</div>
                            <div> OrderStatus : {item.orderStatus}</div>
                            <div> Payment method  : {item.payment.method}</div>
                            <div> Pay orderId  : {item.payment.razorpayOrderId}</div>
                            <div> Pay PaymentID  : {item.payment.razorpayPaymentId}</div>
                            <div> Amount Status : {item.payment.status}</div>
                            <div> Total Items : {item.items.length}</div>

                        </div>
                    );
                })}
            </div>
        </div>

    );
};
export default Orderpage;