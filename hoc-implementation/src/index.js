import React, {Component} from 'react';
import {render} from 'react-dom';

function withAPIData(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: '', // to store the data from the api
      };
      this.getData = this.getData.bind(this); // binding since class component and also since not an arrow function
    }

    async getData() {
      const response = await fetch('https://randomuser.me/api');
      const data = await response.json();
      console.log(data); // just to check whether we are receiving the data
      const add = () => {
        this.setState({data});
      };
      add(); // calling the function to update the state
      console.log('value', this.state.data); // trying to check whether my state value got updated
      return data;
    }

    render() {
      const {getData} = this;
      const {data} = this.state;
      const props = {
        data,
        getData,
      };
      return <WrappedComponent {...this.props} {...props} />; // passing all the props to the component that is wrapped by destructuring
    }
  };
}

function Form({getData, data}) {
  return (
    <>
      <button onClick={getData}>Click Me!</button>{' '}
      {/* button to initiate the API Call */}
      <p value={data} /> {/* paragraph to show the output*/}
    </>
  );
}

const App = withAPIData(Form); // wrapper

render(<App />, document.getElementById('root'));

//fetching was successful, displaying failed
