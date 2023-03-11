import { Component } from "react";

type ClassProps = {};

type ClassState = {
  count: number;
};

class Class extends Component<ClassProps, ClassState> {
  state: ClassState = {
    count: 0,
  };

  //   componentDidMount() {
  //     console.log("Class Mounted");
  //   }

  onClick = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  render() {
    return (
      <>
        <div>Class Component Count {this.state.count}</div>
        <button onClick={this.onClick}>Count</button>
      </>
    );
  }
}

export default Class;
