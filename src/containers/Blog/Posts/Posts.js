import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import axios from "../../../axios"

import "./Posts.css"

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
      console.log(this.props)
      console.log("Post.js | component did mount")
    axios
      .get("/posts")
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Sankar",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postSelectedHandler = (id) => {
    console.log("postSelectedHandler", id);
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something Went Wrong !!!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            author={post.author}
            title={post.title}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
