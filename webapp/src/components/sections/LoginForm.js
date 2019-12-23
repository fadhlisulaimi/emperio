import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {ValidateField} from '../../service/AuthService';

class LoginForm extends React.Component {

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onBanner(ValidateField(name, value));
    }

    render(){
        return(
        <div className = 'form-layout'>
            <div style = {{display: 'flex', justifyContent: 'flex-end', marginRight: 10}}>
                <span style = {{fontSize: 12, marginRight: 5, marginTop: 4, color: '#9f9f9f', cursor: 'pointer'}} onClick = {this.props.toggleMode}>
                    Register
                </span>
                <ArrowForwardIosIcon 
                    style = {{cursor: 'pointer'}}
                    color="action"
                    onClick = {this.props.toggleMode}
                />
            </div>
            <input type = "text" placeholder="Email Address" onPaste={(event) => this.handleUserInput(event)} onChange={(event) => this.handleUserInput(event)} name = "emailaddress" />
            <br />
            <div className = 'description'>
                Email address you used to register
            </div>
            <input type = "password" placeholder="Password" onPaste={(event) => this.handleUserInput(event)} onChange={(event) => this.handleUserInput(event)} name = "password" />
        </div>
        );
    }
}

export default LoginForm;