import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import LoginF from "./LoginF";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginF} />
          <Route exact path="/articles" />
          <Route exact path="/articles/:id" />
          <Route exact path="/garden" />
          <Route exact path="/garden/:id" />
          <Route exact path="/garden/:id/action" />
          <Route exact path="/garden/:id/action/:id" />
          <Route exact path="/garden/:id/slot" />
          <Route exact path="/garden/:id/slot/confirm" />
          <Route exact path="/garden/:id/slot/success" />
          <Route exact path="/user" />
          <Route exact path="/user/:id" />
        </Switch>

        <Navbar />
      </Router>
    </div>
  );
}

export default App;
