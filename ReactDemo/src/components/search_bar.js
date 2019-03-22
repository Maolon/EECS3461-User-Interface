// Works for extends React.Component
// import React from 'react';

// { Component } is some cool syntax sugar
import React, { Component } from 'react';

// Functional component - because it is a function
// Their is also class components that can keep a record (store information)
// since its rendering
// const SearchBar = () => {
//  return <input />; // It needs React to turn this into React.createElement...
//};

// Give access to all React.Component functionalities
// Every component that is class based need a render method
class SearchBar extends Component { // or extends React.Component
  // When a state changes, it re-renders the component and its children
  // This is how you initiate states in a class based components/
  // constructor is a new ES6 term
  constructor(props) {
    super(props); // We are calling the React.Component constructor method

    this.state = {term: ''};
  }
  render() {
    // onChange is a prop (property)
    // another way to do it
    // return <input onChange={this.onInputChange.bind(this)} />;
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
    // Controlled component has its value set by state
    // Its value changes when the state changes
    // <input value={this.state.term} />

    // ES6 way
    // return <input onChange={(event) => console.log(event.target.value)} />;
    // if I have a single argument I can also do:
    // return <input onChange={event => console.log(event.target.value)} />;
  }
  // Event handler
  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

// new instance by --> new SearchBar

// Any file that imports search_bar will get this
// class as return
export default SearchBar;
