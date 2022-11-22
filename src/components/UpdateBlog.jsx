import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { deleteMyBlog } from '../helpers/firebase';
import { useNavigate } from 'react-router-dom';


const UpdateBlog = ({ id, content, imgURL, title, date, creator, comments,likes }) => {

  const navigate = useNavigate(); 

  const handleDelete= ()=>{
    deleteMyBlog(id)
    navigate("/")
  }

  const handleUpdate = ()=>{
    navigate(`/details/${id}`, {state :{ id, content, imgURL, title, date, creator,comments,likes } })
  }

  return (
    <div className="my-4">
      <Stack direction="row" spacing={10}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </div>
  );
};

export default UpdateBlog