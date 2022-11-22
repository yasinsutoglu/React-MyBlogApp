import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import blogAvatar from "../assets/imgs/blok.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createBlog } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"


export default function BlogForm() {

  const navigate = useNavigate()
  const [blog,setBlog] = React.useState({title:"", imgURL:"", content:"", date:"", creator:"", comments:["initial"], likes:0})

  const {title, imgURL , content} = blog;
  const {currentUser} = useSelector(state => state?.auth)

  const newDate = new Date().toLocaleString("en-GB", { timeZone: "UTC" });
  const fullName = currentUser.displayName;
  
  React.useEffect(() => {
   setBlog({
     ...blog,
     date: newDate,
     creator:fullName ,
   });
  }, [])
  
  

  const handleSubmit = (event) => {
    event.preventDefault();  
    console.log(blog)  
    createBlog({...blog})
    setBlog({...blog, title: "", imgURL: "", content: "" , date:"", creator:""});
    navigate("/")    
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={blogAvatar} alt="blogimg" style={{width:"200px", height:"200px", borderRadius:"50%", backgroundColor:"rgb(25,118,210)", padding:"1rem"}}/>

          <Typography component="h1" variant="h5" sx={{color:"rgb(25,118,210)", marginTop:"1rem"}}>
            Create New Blog
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={(e)=> setBlog({...blog, [e.target.id]:e.target.value})}
              value={title}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="imgURL"
              label="imgURL"
              id="imgURL"
              autoFocus
              onChange={(e)=> setBlog({...blog, [e.target.id]:e.target.value})}
              value={imgURL}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              id="content"
              autoFocus
              multiline={true}
              rows="10"
              onChange={(e)=> setBlog({...blog, [e.target.id]:e.target.value})}
              value={content}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Blog
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
