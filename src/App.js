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
          <Route path="/Chatter/chat">
            <HomePage />
          </Route>
          <Route path="/Chatter/details">
            <AdditionalDetails />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
