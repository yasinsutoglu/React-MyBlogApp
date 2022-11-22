import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import defaultImg from "../assets/imgs/placeholder.png";
import { useLocation } from "react-router-dom";
import UpdateBlog from "../components/UpdateBlog";
import {useSelector} from "react-redux"
import { Box } from "@mui/system";
import CommentsPagination from "../components/CommentsPagination";

export default function Details() {

  const {currentUser} = useSelector(state=>state?.auth)
  const {state} = useLocation()
  const {content, imgURL , title, date, creator, comments, likes} = state

  return (
    <div className="mt-5 py-4 d-flex flex-column justify-content-center align-items-center detail-gen-div">
      <h2 style={{ color: "rgb(25,118,210)" }}>BLOG DETAILS</h2>
      <Card sx={{ width: "60%" }} className="details-div">
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
          sx={{ width: "85%", height: "400px", margin:"0 auto" }}
          image={imgURL || defaultImg}
          alt="addedBlog"
        />

        <CardContent sx={{ textAlign: "justify" }}>
          <h5 className="text-primary">{title}</h5>
          <Box sx={{ height:"auto" }}>
            <Typography  variant="string" paragraph={true} color="text.secondary">{content}</Typography>
          </Box>
        </CardContent> 

        <CardContent sx={{ textAlign: "justify" }} >
          <hr />
           <Typography  variant="body2" className="text-danger fw-bolder fs-5">Comments</Typography> <hr />
           <CommentsPagination comments={comments}/>
        </CardContent>
      </Card>
      {currentUser.displayName === creator && <UpdateBlog {...state} />}
    </div>
  );
}
