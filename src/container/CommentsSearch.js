import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import DisplayComments from "./DisplayComments";
import "./CommentsSearch.css";
class CommentsSearch extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      comments: [],
      value: 0,
      errorMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //   componentDidMount() {
  //     this.getData();
  //   }

  //   getData() {
  //     this.setState({
  //       isLoading: true,
  //     });

  //     axios("https://jsonplaceholder.typicode.com/comments")
  //       .then((res) => {
  //         this.setState({
  //           isLoading: false,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         this.setState({ isLoading: false, errorMessage: "Please Try Again" });
  //       });
  //   }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: "" });

    axios(
      `https://jsonplaceholder.typicode.com/comments?postId=${this.state.value}`
    )
      .then((res) => {
        if (res.data.length === 0) {
          const emptyDataError = new Error("Invalid data");
          emptyDataError.statusCode = 500;
          throw emptyDataError;
        }
        this.setState({ comments: res.data, isLoading: false });
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false,
          errorMessage: `No comments available for postid: ${this.state.value}`,
        });
      });
  }

  printComments() {
    return this.state.comments.map((comment) => (
      <DisplayComments comment={comment}> </DisplayComments>
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {!this.state.errorMessage && (
          <div>{this.state.isLoading ? <Loader /> : this.printComments()}</div>
        )}
        {this.state.errorMessage && (
          <div className="err">{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}

export default CommentsSearch;
