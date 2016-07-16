import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  render() {
    return (
      <form action="links">
        Please enter your url:<br></br>
        <input type="text" name="url"></input>
      </form>
    );
  }

}

export default App;
