import React from 'react';
import '../src/res/styles/style-app.css';

//sections
import LoginForm from '../src/components/sections/LoginForm';
import RegisterForm from '../src/components/sections/RegisterForm';
import WelcomeContent from '../src/components/sections/WelcomeContent';

//components
import ActionCard from '../src/components/ActionCard';
import Banner from '../src/components/Banner';
import {AddUser, Authenticate} from '../src/service/AuthService';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      isRegisterMode : false,
      primaryBtn: 'Login',
      isDisabled: true,
      isPrimaryBtnClicked: false,
      isLogin: false,
      cardHeight: 280,
      banner: {
        showBanner: false,
        background: '',
        message: ''
      }
    });
  }

 
  _addUser = () => {
    const form = document.querySelectorAll('form')[0];
    const uri = process.env.REACT_APP_EMPERIO_URI;

    AddUser(uri, form).then((result) => {
      let response = result.response;
      this.setState({
        isPrimaryBtnClicked: false,
        isDisabled: !this.state.isDisabled
      });

      //fail response
      if(result !== undefined && response.status !== 200){
        this.setState({
            cardHeight: this.state.cardHeight + 20,
            banner: {
              showBanner: !this.state.banner.showBanner,
              background: '#eea1a1',
              message: result.message
            }
          });
          return;
      }

      //manage to get server response
      if(result !== undefined && response.data.result){
        this.setState({
          isRegisterMode : !this.state.isRegisterMode,
          cardHeight: 280,
          primaryBtn: 'Login',
          banner: {
            showBanner: !this.state.banner.showBanner,
            background: '#b6e2b6',
            message: 'Registration successful. Please login'
          }
        });
      }else{
        
      }
    });
    
  }

  _loginUser = () => {
    const form = document.querySelectorAll('form')[0];
    const uri = process.env.REACT_APP_EMPERIO_URI;

    Authenticate(uri, form).then((result) => {
      let response = result.response;
      this.setState({
        isPrimaryBtnClicked: false,
        isDisabled: !this.state.isDisabled
      });

      //fail response
      if(result !== undefined && response.status !== 200){
        this.setState({
            banner: {
              showBanner: !this.state.banner.showBanner,
              background: '#eea1a1',
              message: result.message
            }
        });
        return;
      }

      //manage to get server response
      if(result !== undefined && response.data.result === 'ok'){
        this.setState({
          isLogin: true,
          primaryBtn: 'Logout',
          cardHeight: 450,
          banner: {
            showBanner: !this.state.banner.showBanner,
            background: '',
            message: ''
          }
        });
      }else{
        this.setState({
          banner: {
            showBanner: !this.state.banner.showBanner,
            background: '#eea1a1',
            message: 'Wrong username or password'
          }
        });
      }
    });
  }

  _onPrimaryBtnClicked = (event) => {
    event.preventDefault();
    this.setState({
      isDisabled: true,
      isPrimaryBtnClicked: true,
      banner: {
        showBanner: false,
        background: '',
        message: ''
      }
    });

    if(this.state.isLogin){
      this.setState({
        isLogin: false,
        primaryBtn: 'Login',
        isDisabled: false,
        cardHeight: 280
      })
    }else{
      if(this.state.isRegisterMode){
        this._addUser(event);
      }else{
        this._loginUser(event);
      }
    }

  }

  //switch between login and register
  _toggleMode = () => {
    this.setState({
      isRegisterMode : !this.state.isRegisterMode,
      primaryBtn: !this.state.isRegisterMode ? 'Register' : 'Login',
      cardHeight: this.state.isRegisterMode ?  280 : 430,
      banner: {
        showBanner: false,
        background: '',
        message: ''
      }
    });
  }

  _onBannerToggle = (message) => {
    this.setState({
      isPrimaryBtnClicked: false,
      isDisabled: message.length > 0,
      banner: {
        showBanner: message.length > 0,
        background: message.length > 0 ? '#eea1a1' : '',
        message
      }
    });
    
  }

  render(){
    return (
      <div className = 'main'>
        <div className = 'loginLayout'>
          <img src = 'https://emporioanalytics.com/wp-content/uploads/2015/08/emp_logo.png' />
          {this.state.banner.showBanner 
            ? <Banner bannerInfo = {this.state.banner} />
            : <div/>
          }
          <ActionCard 
              height = {this.state.cardHeight}
              primaryBtn = {this.state.primaryBtn}
              isDisabled = {this.state.isDisabled}
              isPrimaryBtnClicked = {this.state.isPrimaryBtnClicked}
              onPrimaryBtnClicked = {this._onPrimaryBtnClicked}
              title = {this.state.isLogin ? 'Welcome' : ''}
            >
              {this.state.isLogin 
              ? <WelcomeContent />
              : (this.state.isRegisterMode 
                    ? <RegisterForm toggleMode = {this._toggleMode} onBanner = {this._onBannerToggle}/>
                    : <LoginForm toggleMode = {this._toggleMode} onBanner = {this._onBannerToggle}/>)}
          </ActionCard>
        </div>
      </div>
    );
  }
}
