import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  constructor(props){
      super(props)
      this.state = {
        loadedPost: null,
        loading: null,
        id: this.props.match.params.id || null
      };
      console.log("constructor FullPost")
      console.log(this.state)
  }
  
  componentDidMount() {
    console.log(this.state.id)
    if(this.state.id){
      console.log("Got new Id "+this.state.id)
      // this.setState({loading: true})
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.state.id)
      ) {
        axios
          .get("/posts/" + this.state.id)
          .then((res) => {
            // console.log(res)
            this.setState({ loadedPost: res.data})
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  deletePostHandler = () =>{
    axios.delete("/posts/" + this.state.id)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Loading...</p>;
    // if (this.state.loading) {
    //   post = <p style={{ textAlign: "center" }}>Loading . . .</p>;
    // }
    if (this.state.id && this.state.loadedPost && !this.state.loading) {
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
