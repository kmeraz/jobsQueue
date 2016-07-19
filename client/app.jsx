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
      <div>
        <form action="/links" method="post">
          Please enter the url you would like to submit.<br></br>

          We will prepend the 'http://' for you:<br></br>
          Examples of how you should enter it:<br></br>
          &nbsp; &nbsp; &nbsp;www.google.com<br></br>
          &nbsp; &nbsp; &nbsp;nba.reddit.com<br></br>
          <input type="text" name="url"></input>
          <input type="submit" value="Submit"></input>
        </form>
        <br></br>
        <form action="/links" method="get">
          Please enter the job ID you would like to view<br></br>
          <input type="text" name="jobID"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }

}

export default App;
