import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import routes from './routes';
import IdleTimer from 'react-idle-timer'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/auth/Login'));
const Logout = React.lazy(() => import('./views/auth/Logout'));
const Register = React.lazy(() => import('./views/themeexample/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/themeexample/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/themeexample/pages/page500/Page500'));

class App extends Component {

  constructor(props) {
    super(props)
    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)

    this.state = {
      configTimeOut: "",
    };
    this.setState({
      configTimeOut: process.env.REACT_APP_SESSION_TIME_OUT,
    });
  }

  handleOnAction (event) {
    console.log('user did something', event)
  }

  handleOnActive (event) {
    console.log('user is active', event)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  handleOnIdle (event) {
    console.log('user is idle', event)
    console.log('last active', this.idleTimer.getLastActiveTime())
    console.log("session expired");
    localStorage.clear();
  }

  render() {
    console.log(routes);

    return (
      <>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          //timeout={1000 * 60 * 15}
          timeout= {600000}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />

      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/logout" name="Logout" render={props => <Logout {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />

            </Switch>
          </React.Suspense>
      </HashRouter>
      </>
    );
  }
}

export default App;
