import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  constructor(props){
      super(props)
      this.state = {
        loadedPost: null,
        loading: null,
      };
      console.log("constructor FullPost")
  }
  
  componentDidUpdate(previousProps, previousState) {
    if(this.props.id && previousProps.id !== this.props.id){
      console.log("Got new Id "+this.props.id)
      this.setState({loading: true})
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        axios
          .get("/posts/" + this.props.id)
          .then((res) => {
            // console.log(res)
            this.setState({ loadedPost: res.data, loading: false})
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  deletePostHandler = () =>{
    axios.delete("/posts/" + this.props.id)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.state.loading) {
      post = <p style={{ textAlign: "center" }}>Loading . . .</p>;
    }
    if (this.props.id && this.state.loadedPost && !this.state.loading) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
