/* global gapi */
import React from "react"
import { connect } from 'react-redux'
import { Redirect, Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { login } from "../actions/login"
import Layout from "../components/layout/layout"
import { POST_CONTEST_PAGE_URL } from "../constants";

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    var referer = '/'
    if (this.props.location.state) {
      referer = this.props.location.state.referer || '/';
    }
    this.state = { referer, creds: { email: '', password: ''}}
    this.handleChange = this._handleChange.bind(this)
  }
  componentDidMount(){
    function onSuccess(googleUser) {
      console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token)
     }
     function onFailure(error) {
       localStorage.setItem('error google ->',error.error)
     }
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 400,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
  _handleChange(event) {
    this.setState({ ...this.state,
      creds: { ...this.state.creds, [event.target.id]: event.target.value }
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      if(this.props.location.state){
        if(this.props.location.state.prevPath === "/post_contest"){
          return <Redirect to={POST_CONTEST_PAGE_URL} />
        }
        else{
          return <Redirect to={this.state.referer} />
        }
      }
    }
    return (
      <Layout pageTitle="Login">
      <Grid container spacing={0} className="main login-form-area" justify="center">
        <Grid item xs={10} md={4} xl={4}>
          <h2>Sign In</h2>
          <form>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                placeholder="Email"
                fullWidth
                margin="normal"
                onChange={event => this.handleChange(event)}
                value={this.state.creds.email}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                placeholder="Password"
                fullWidth
                margin="normal"
                onChange={event => this.handleChange(event)}
                value={this.state.creds.password}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item container xs={12} justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {e.preventDefault(); this.props.dispatch(login(this.state.creds))}}>
                    Login
                </Button>
              </Grid>
              <Grid item>
                <div className="login-switch">
                  <span>First Time?&nbsp;<Link to={{pathname: "/register", state: { referer: this.state.referer}}}>Create New Account</Link></span>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Divider orientation="vertical" flexItem variant="inset" />
        <Grid item md={4} xs={10} xl={4}>
        <div id="my-signin2"></div>
        </Grid>
      </Grid>
      </Layout>
    )
  }
}

function mapStateToProps(state) {

  const { auth } = state
  const { isAuthenticated } = auth
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(LoginPage)