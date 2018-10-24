import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import './Auth.css';

class Auth extends Component { 
    static propTypes = {
        login: PropTypes.string
        
    }
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            loading: false,
            error: null
        }
    }

    handleLogin = (input) => {
        this.setState({
            login: input
        })
    }

    handlePassword = (password) => {
        this.setState({
            password: password
        })
    }

    submitLoginForm = () => {
        const { history } = this.props;
        this.setState({
            loading: true,
            error: null
        })
        if(this.state.login === 'demo' && this.state.password === 'demo') {
            setTimeout(() => {
                this.setState({
                    loading: false
                }, () => {
                    history.push('/dashboard');
                })
            }, 2000)
        } else {
            setTimeout(() => {
                this.setState({
                    loading: false,
                error: 'wrong auth data'
                })
            }, 2000)
        }
    }
    renderButton = () => {
        if(this.state.loading) {
            return (
              <span><img className="loader-img" alt="loading..." src="/loader.gif" /></span>  
            )
        } else {
           return (
             <input type="button" className="fadeIn fourth" value="Log In" onClick={this.submitLoginForm}/>             
           ) 
        }
    }
    render = () => {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="./airplane.jpg" id="icon" alt="User Icon" />
                    </div>
                    <form>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="username"  value={this.state.login} onChange={ el => this.handleLogin(el.target.value) } />
                        <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" value={this.state.password} onChange={ el => this.handlePassword(el.target.value) } />
                        {this.renderButton()}
                        {this.state.error &&<div class="alert alert-danger" role="alert">
                            Wrong password or login!
                        </div>}
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth;