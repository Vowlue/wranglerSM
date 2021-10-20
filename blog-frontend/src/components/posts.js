import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://my-worker.chenray20.workers.dev/posts"
      );
      const postsResp = await resp.json();
      console.log(postsResp)
      setPosts(postsResp);
    };

    getPosts();
  }, []);

  return (
    <Box id="bodycont">
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Random Social Media Page
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="wrapper"
        spacing={2}
      >
        {posts.map((post) => (
          <Grid item xs={12} className="post">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {post.username}
                </Typography>
                <Typography variant="body2">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;