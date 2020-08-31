import React, { Component } from "react";
import ListItems from "./ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import MyModal from "./updatemodal";

library.add(faTrash, faPen);

export default class Tasks extends Component {
  state = {
    user: {
      email: "",
      googleId: "",
      _id: "",
    },
    items: [],
    currentItem: {
      text: "",
      key: "",
    },
    selecteditem: {
      text: "",
      key: "",
    },
    showUpdate: false,
  };
  componentDidMount() {
    let _id = new URLSearchParams(this.props.location.search).get("_id");
    let email = new URLSearchParams(this.props.location.search).get("email");
    let googleId = new URLSearchParams(this.props.location.search).get(
      "googleId"
    );
    const user = {
      email,
      googleId,
      _id,
    };
    if (user.email && user.googleId && user._id) {
      this.setState({ user }, () => this.getItems());
    } else this.props.history.push("/");
  }
  getItems = async () => {
    Axios.post("/api/getalltasks", {
      userId: this.state.user._id,
    })
      .then((res) => {
        let items = [];
        console.log(res);
        res.data.data.map((data) => {
          items.push({ text: data.task, key: data._id });
        });
        this.setState({ items });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  addItem = async (e) => {
    e.preventDefault();
    if (this.state.currentItem.text !== "") {
      await Axios.post("/api/addtask", {
        userId: this.state.user._id,
        task: this.state.currentItem.text,
      })
        .then((res) => {
          const newItem = {
            text: this.state.currentItem.text,
            key: res.data.task._id,
          };
          const items = [...this.state.items, newItem];
          console.log(res);
          this.setState({
            items: items,
            currentItem: {
              text: "",
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };
  handleInput = async (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
      },
    });
  };
  updateItem = async (key, task) => {
    await Axios.post("/api/updatetask", {
      taskId: key,
      task,
    })
      .then((res) => {
        this.getItems();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ showUpdate: false });
  };
  deleteItem = async (key) => {
    const filteredItems = this.state.items.filter((item) => {
      return item.key !== key;
    });
    await Axios.post("/api/deletetask", {
      taskId: key,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          items: filteredItems,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { user } = this.state;
    return (
      <>
        <nav className="navbar navbar-dark bg-dark text-light">
          <ul className="navbar-nav mr-auto text-light">
            <li className="nav-item text-light">{user.email}</li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={async () => {
                await Axios.post("/api/signOut");
              }}
            >
              LogOut
            </button>
          </form>
        </nav>
        <div className="App">
          <header>
            <form id="to-do-form" onSubmit={this.addItem}>
              <input
                type="text"
                placeholder="Enter a note"
                value={this.state.currentItem.text}
                onChange={this.handleInput}
              ></input>
              <button type="submit">Add</button>
            </form>
            <p>{this.state.items.text}</p>
            <ListItems
              items={this.state.items}
              deleteItem={this.deleteItem}
              showUpdate={(key, text) => {
                this.setState(
                  {
                    selecteditem: {
                      key,
                      text,
                    },
                  },
                  () => {
                    this.setState({ showUpdate: true });
                  }
                );
              }}
            />
          </header>
          <MyModal
            id={this.state.selecteditem.key}
            task={this.state.selecteditem.text}
            show={this.state.showUpdate}
            updateItem={this.updateItem}
            onHide={() => this.setState({ showUpdate: false })}
          />
        </div>
      </>
    );
  }
}
