import React from 'react';
const Notifications = (props: { handleClose: () => void }) => {
    const {handleClose} = props;
    return (
        <div className='fullW fullH' style={{ padding: '16px', width:'420px' }}>
            <div className='flexMinWidthRow gap16 aCntr jEnd'>
                <span className='fontWeightBold pdngSM pointer' onClick={handleClose}>Close</span>
            </div>
            <h1>Notifications</h1>
        </div>
    )
}
export default Notifications;