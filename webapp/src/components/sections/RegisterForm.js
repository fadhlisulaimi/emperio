import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ValidateField} from '../../service/AuthService';

class RegisterForm extends React.Component {

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onBanner(ValidateField(name, value));
    }

    render(){
        return(
            <div className = 'form-layout'>
              <ArrowBackIosIcon
                style = {{cursor: 'pointer'}}
                onClick = {this.props.toggleMode}
                color="action"
              />
              <input type = "text" placeholder="Email Address" onPaste={(event) => this.handleUserInput(event)} onChange={(event) => this.handleUserInput(event)} name = "emailaddress" />
              <input type = "password" placeholder="Password" onPaste={(event) => this.handleUserInput(event)} onChange={(event) => this.handleUserInput(event)} name = "password" />
              <input type = "text" placeholder="First Name" onPaste={(event) => this.handleUserInput(event)} onChange={(event) => this.handleUserInput(event)} name = "firstName" />
              <input type = "text" placeholder="Last Name" onPaste={(event) => this.handleUserInput(event)} onChange={(event) => this.handleUserInput(event)} name = "lastName" />
            </div>
          );
    }
}

export default RegisterForm;