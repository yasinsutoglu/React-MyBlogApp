import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import defaultImg from "../assets/imgs/placeholder.png";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastWarnNotify } from "../helpers/toastNotify";
import { updateMyBlog } from "../helpers/firebase";


export default function BlogCard({blog}) {  
  
  const { id, content, imgURL, title, date, creator} = blog;

  const [updatedBlog, setUpdatedBlog] = React.useState({...blog})

  const {comments  ,likes} = updatedBlog

  const {currentUser} = useSelector(state => state?.auth)
  const navigate = useNavigate()

  const [newComment, setNewComment] = React.useState("")

  const handleDetails = ()=>{
      currentUser
        ? navigate("/details", {
            state: { id, content, imgURL, title, date, creator, comments, likes },
          })
        : toastWarnNotify("Please Login to see the deatils")
  }

  

  const handleComment = (e)=>{
    e.preventDefault();
    console.log(newComment);
      setUpdatedBlog({ ...updatedBlog, comments: [...comments, newComment] });
      updateMyBlog({ ...updatedBlog, comments: [...comments, newComment] });
      setNewComment("")
  }

  const handleFavourite = ()=>{
      let counter = likes;
      counter++;
      setUpdatedBlog({...updatedBlog, likes: counter })
      updateMyBlog(updatedBlog)
  }

  return (
    <Card sx={{ maxWidth: 300, cursor: "pointer" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {creator?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={creator}
        subheader={date}
      />
      <CardMedia
        component="img"
        sx={{ width: "300px", height: "200px" }}
        image={imgURL || defaultImg}
        alt="addedBlog"
        onClick={handleDetails}
      />

      <CardContent>
        <h5 className="text-primary">{title}</h5>
        <Typography noWrap={false} variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavourite}>
          {likes > 0 && <FavoriteIcon sx={{ color: "red" }} />}
          {likes == 0 && <FavoriteIcon />}
        </IconButton>

        <span>{likes}</span>

        <div role="button" aria-label="comment" onClick={()=>{!currentUser && toastWarnNotify("Please Login to Comment!")}} className="mx-1">
          {comments?.length - 1 > 0 && (
            <ChatBubbleOutlineIcon
              data-bs-toggle="modal"
              data-bs-target={`#${blog.id}`}
              sx={{ color: "rgb(25,118,210)" }}
              
            />
          )}

          {comments?.length -1 == 0 && (
            <ChatBubbleOutlineIcon
              data-bs-toggle="modal"
              data-bs-target={`#${blog.id}`}
            />
          )}

          {currentUser && (
            <div
              className="modal fade"
              id={blog.id}
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      New Comment
                    </h1>
                    <span
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></span>
                  </div>
                  <form onSubmit={handleComment}>
                    <div className="modal-body">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target?.value)}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Save Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        <span>{comments?.length - 1}</span>
      </CardActions>
    </Card>
  );
}
