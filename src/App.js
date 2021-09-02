import './App.css';
import HomePage from './Components/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Auth from './Components/Auth';
import AdditionalDetails from './Components/AdditionalDetails';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/Chatter/" exact={true}>
            <Auth/>
          </Route>
          <Route path="/Chatter/details" component={AdditionalDetails} />
          <Route path="/Chatter/:id" component={HomePage} />
          Account
        </Switch>
    </Router>
  );
}

export default App;
