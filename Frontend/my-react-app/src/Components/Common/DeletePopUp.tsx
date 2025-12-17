import { Button, DialogTitle, DialogActions } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';

const DeletePopUp = (props: { open: boolean, handleClose: () => void, handleDelete: () => void, actionContent: string }) => {
    const { open, handleClose, handleDelete, actionContent } = props;
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Would you like to {actionContent} ?</Typography>
            </DialogContent>
            <DialogActions>
                <div className='flexRow aCntr pdngSM jEnd gap16'>
                <Button onClick={handleClose} variant='outlined' color='primary'>Cancel</Button>
                <Button onClick={handleDelete} variant='contained' color='error'>Delete</Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default DeletePopUp