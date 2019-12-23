import axios from 'axios';
const queryString = require('query-string');
const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

async function addUser(uri, form){
    var body =  {};
    
    //dynamically insert req body
    [...form.elements].forEach((element) => {
        body[element.name] = element.value;
    })

    try{
        const res = await axios({
            method: 'post',
            url: `${uri}/user/add`,
            data: queryString.stringify(body),
            headers
        });
        return {
            response : res
        };
    }catch (error){
        return error;
    }
}

async function authenticate(uri, form) {
    var body =  {};

   //dynamically insert req body
    [...form.elements].forEach((element) => {
      if(element.name === 'password' || element.name === 'emailaddress'){
        body[element.name] = element.value;
      }
    })

    try{
        const res = await axios({
            method: 'post',
            url: `${uri}/user/list`,
            data: queryString.stringify(body),
            headers
        });
        return {
            response : res
        };
    }catch (error){
        return error;
    }
  }


function validateField(fieldName, value) {
    let formError = '';
  
    switch(fieldName) {
      case 'emailaddress':
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(value.length === 0){
            formError = 'Please fill up the necessary fields';
        }else if(!emailValid){
            formError = `${value} is invalid email`;
        }
        break;
      case 'password':
        let passwordValid = value.length >= 8;
        if(value.length === 0){
            formError = 'Please fill up the necessary fields';
        }else if(!passwordValid){
            formError = 'Minimum password 8 characters';
        }
        break;
    case 'firstName':
    case 'lastName':{
        let valid = value.match(/^[a-zA-Z]+$/i);
        if(value.length === 0){
            formError = 'Please fill up the necessary fields';
        }else if(!valid){
            formError = `Please fill a valid ${fieldName}`;
        }
        break;
    }
      default:
        break;
    }

    return formError;
    
}


export {
    addUser as AddUser, 
    authenticate as Authenticate,
    validateField as ValidateField
};
