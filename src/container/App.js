import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
// import loginfunc from './store/actions/action'
import { connect } from 'react-redux'
import { loginfunc, errorReducerFunc, errorReducerCloseFunc, LogoutAction } from '../store/actions/action'
import SignUpForm from '../components/signUpForm'
import SignInForm from '../components/signInForm'

import { fire, database, firebaseSignOut } from '../fire'
import { browserHistory } from 'react-router'
import Modalcom from '../components/modal'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

let mapStatetoProp = (state) => {
  return (
    {
      errormessage: state.AuthReducer.errormessage.code,
      errorflag: state.AuthReducer.errorflag
    }
  )
}

let mapStatetodispatch = (dispatch) => {
  return {
    loginPropFunc: (credentials) => {
      dispatch(loginfunc(credentials))
    },
    errorFunc: (error) => {
      dispatch(errorReducerFunc(error))
    },
    errorCloseFunc: (errorboolean) => {
      dispatch(errorReducerCloseFunc(errorboolean))
    }, Logoutfunc: () => {

      dispatch(LogoutAction())
    }
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      username: '',
      modalIsOpen: true,
      formswitch: false,
      btndisplay: 'block',
      AccountType: '',
      SignInAccountType: ''
    }
  }

  errorComponentFunc = (error) => {
    alert(error)
  }

  NameChangeFunc = (value) => {
    this.setState({
      email: value
    })
  }

  PasswordChangeFunc = (value) => {
    this.setState({
      password: value
    })
  }




  SignInAccountTypeFunc = (value) => {
    this.setState({
      SignInAccountType: value
    })
  }
  componentLoginfunc = () => {

    if (this.state.SignInAccountType === 'Company') {
      this.setState({
        btndisplay: 'none'
      })
      let credentials = {
        email: this.state.email,
        password: this.state.password,
        AccountType: this.state.SignInAccountType
      }
      fire.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (success) {
          database.child('Company/' + success.uid).once("value", function (snapshot) {
            credentials.uid = success.uid

          }).then((success) => {

            localStorage.setItem("UserData1", JSON.stringify(credentials))
          })
            .then((success) => {
              delete credentials.password
              browserHistory.replace('/home')

            })
        })
        .catch((error) => {
          let errorObject = {
            errorflag: true,
            error: error
          }
          this.props.errorFunc(errorObject)

        });

      this.setState({
        email: '',
        password: ''
      })
    }





    else if (this.state.SignInAccountType === 'Student') {
      this.setState({
        btndisplay: 'none'
      })
      let credentials = {
        email: this.state.email,
        password: this.state.password,
        AccountType: this.state.SignInAccountType

      }

      fire.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (success) {
          database.child('Student/' + success.uid).once("value", function (snapshot) {
            credentials.uid = success.uid

          }).then((success) => {

            localStorage.setItem("UserData1", JSON.stringify(credentials))
          })
            .then((success) => {
              delete credentials.password
              browserHistory.replace('/home')

            })
        })
        .catch((error) => {
          let errorObject = {
            errorflag: true,
            error: error
          }
          this.props.errorFunc(errorObject)

        });

      this.setState({
        email: '',
        password: ''
      })
    }


  }

  componentSignUpfunc = () => {
    let credentials = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      AccountType: this.state.AccountType
    }

    if (credentials.AccountType === 'Student') {
      this.setState({
        btndisplay: 'none'
      })
      fire.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (res) {
          credentials.uid = res.uid
          database.child("Student/" + res.uid).push(credentials)
        })
        .then((success) => {
          database.child("userConvo/").push({ name: credentials.username, useruid: credentials.uid, AccountType: credentials.AccountType, email: credentials.emaily })
        })

        .then((success) => {
          let errorObject = {
            errorflag: true,
            error: { code: "Your Account Has Successfully Been Created, Please Sign In to continue" }
          }
          this.props.errorFunc(errorObject)

          setTimeout(() => {
            browserHistory.push('/')
            this.closeModalfunc()
            this.setState({
              formswitch: true
            })
          }, 3000)
        })
        .catch((error) => {

          let errorObject = {
            errorflag: true,
            error: error
          }
          this.props.errorFunc(errorObject)

        });
    }




    else if (credentials.AccountType === 'Company') {
      this.setState({
        btndisplay: 'none'
      })
      fire.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(function (res) {
          credentials.uid = res.uid
          database.child("Company/" + res.uid).push(credentials)
        })
        .then((success) => {
          database.child("userConvo/").push({ name: credentials.username, useruid: credentials.uid, AccountType: credentials.AccountType, email: credentials.email })
        })

        .then((success) => {
          let errorObject = {
            errorflag: true,
            error: { code: "Your Account Has Successfully Been Created, Please Sign In to continue" }
          }
          this.props.errorFunc(errorObject)

          setTimeout(() => {
            browserHistory.push('/')
            this.closeModalfunc()
            this.setState({
              formswitch: true
            })
          }, 3000)
        })
        .catch((error) => {

          let errorObject = {
            errorflag: true,
            error: error
          }
          this.props.errorFunc(errorObject)

        });
    }

  }
  closeModalfunc = () => {
    this.setState({
      btndisplay: 'block'
    })
    this.props.errorCloseFunc()

  }



  UserNameChangeFunc = (value) => {
    this.setState({
      username: value
    })
  }

  AccountTypeFunc = (value) => {
    this.setState({
      AccountType: value
    })
  }

  componentWillMount() {
    this.props.Logoutfunc()
    firebaseSignOut.signOut()
  }

  render() {
    return (

      <div>
        <Navbar>
          <NavbarBrand href="/" className="mr-auto"> <span style={{ color: 'black' }}>CRS</span></NavbarBrand>
          <a href='/AdminLogin'>Login As Admin</a>
        </Navbar>
        {
          (this.state.formswitch === false) ? (
            <SignUpForm FinalButtonFunc={() => this.componentSignUpfunc()} NameChangeFunc={(value1) => this.NameChangeFunc(value1.target.value)} PasswordChangeFunc={(value1) => this.PasswordChangeFunc(value1.target.value)} toggleForm={() => this.setState({ formswitch: !this.state.formswitch })} BtnStyle={{ display: this.state.btndisplay }} UserNameChangeFunc={(value1) => this.UserNameChangeFunc(value1.target.value)} AccountType={(value1) => this.AccountTypeFunc(value1.target.value)} />
          ) : (
              <SignInForm toggleForm={() => this.setState({ formswitch: !this.state.formswitch })} NameChangeFunc={(value1) => this.NameChangeFunc(value1.target.value)} PasswordChangeFunc={(value1) => this.PasswordChangeFunc(value1.target.value)} FinalButtonFunc={() => this.componentLoginfunc()} BtnStyle={{ display: this.state.btndisplay }} AccountType={(value1) => this.SignInAccountTypeFunc(value1.target.value)} />

            )
        }


        <Modalcom ModalBoolean={this.props.errorflag} closeModalRequest={() => this.closeModalfunc()} ModalText={this.props.errormessage} />
      </div>
    );
  }
}
export default connect(mapStatetoProp, mapStatetodispatch)(App)
