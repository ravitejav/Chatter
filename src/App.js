import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Spinner } from './Components/Spinner'
import './App.css'

const Auth = React.lazy(() => import('./Components/Auth'));
const HomePage = React.lazy(() => import('./Components/HomePage'));
const AdditionalDetails = React.lazy(() => import('./Components/AdditionalDetails'));

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <Switch>
          <Route path="/Chatter/" exact={true} component={Auth} />
          <Route path="/Chatter/details" component={AdditionalDetails} />
          <Route path="/Chatter/:id" exact={true} component={HomePage} />
          <Redirect from="/" to="/Chatter" />
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App
