import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Auth from '../components/auth/auth'
import Login from '../views/login/login'
import Register from '../views/login/register'
// import Index from '../containers/layout/index'
import NotFound from '../views/404/notFound'

export default () => (
  <Router>
    <div style={{height: '100%'}}>
      <Auth></Auth>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/index" push/>}/>
        {/*<Route path="/app" component={Index}/>*/}
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path='/404' component={NotFound}/>
        <Redirect from='*' to='/404'/>
      </Switch>
    </div>
  </Router>
)