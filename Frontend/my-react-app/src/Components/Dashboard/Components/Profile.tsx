import { Edit } from '@mui/icons-material';
import { useUser } from '../../Contexts/UserContext';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Dialog, Typography, DialogContent, DialogTitle, Button, DialogActions, Avatar } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Profile = (props: { open: boolean, handleClose: () => void }) => {
    const { user, setUser } = useUser();
    const {open,handleClose}=props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
        const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target?.files?.[0] ?? null;
            if(file) {
                setSelectedFile(file);
                setPreviewImage(URL.createObjectURL(file));

            }
            console.log('file', file);
    }
    const handleSave = async () => {
      try {
        if (!selectedFile) {
          toast.error('Please select an image');
          return;
        }

        if (!user?.email) {
          toast.error('User email not found');
          return;
        }

        const formData = new FormData();
        formData.append('profileImage', selectedFile);
        formData.append('email', user.email);
    
        const res = await axios.post(
          'http://localhost:5000/updateProfileImage',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
    
        if (res.data.status === true) {
          toast.success(res.data.message || 'Profile image updated successfully');
          // Update user context with new profile image
          if (res.data.user && user) {
            setUser({ ...user, profileImage: res.data.profileImage });
            // Also update localStorage
            localStorage.setItem('user', JSON.stringify({ ...user, profileImage: res.data.profileImage }));
          }
          handleClose();
        } else {
          toast.error(res.data.message || 'Upload failed');
        }
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error(error.response?.data?.message || 'Upload failed');
      }
    }
    return (
       <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Profile Details</DialogTitle>
            <DialogContent>
                <div className='flexCol jCntr aCntr pdngXXS positionRelative'>
                    <div className='flexAutoRow pointer' style={{ position: 'relative', overflow:'hidden' }}>
                        <Avatar 
                          src={previewImage || user?.profileImage || '/public/Icons/avatar.png'} 
                          alt='' 
                          style={{ width: '100px', height: '100px', objectFit: 'contain' , border:'2px solid #24a4c4'}} 
                        />
                        <input 
                          type='file' 
                          accept='image/*'
                          onChange={handleFileUpload}
                          style={{ position: 'absolute', opacity: 0, width: '100px', height: '100px', cursor: 'pointer' }}
                        />
                        <span className="uppercaseTxt editBtn" onClick={()=>{handleFileUpload}}  style={{ width: '100px', color: 'black', fontSize: '10px' }}>Edit</span>
                    </div>
                  <span className='pdngTSM'>{user?.name}</span>
                  <span>{user?.email}</span>
                </div>
                {/* {previewImage && <img src={previewImage} alt='preview' style={{ width: '100px', height: '100px', objectFit: 'contain' }} />} */}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='outlined' color='primary'>Close</Button>
            <Button onClick={handleSave} variant='contained' color='primary'>Save</Button>
        </DialogActions>
       </Dialog>
    )
}

export default Profile;