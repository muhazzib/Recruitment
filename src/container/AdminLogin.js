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
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

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
class AdminLogin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }



    PasswordChangeFunc = (value) => {
        this.setState({
            password: value
        })
    }

    EmailChangeFunc = (value) => {
        this.setState({
            email: value
        })
    }


    componentLoginfunc = () => {
        // console.log(this.state.email)
        // console.log(this.state.password)

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (success) {
            browserHistory.push('/AdminLoginHome')

        })

    }








    closeModalfunc = () => {
        this.setState({
            btndisplay: 'block'
        })
        this.props.errorCloseFunc()

    }







    render() {
        return (

            <div>
                <Navbar>
                    <NavbarBrand href="/" className="mr-auto"> <span style={{ color: 'black' }}>Marathon</span></NavbarBrand>
                </Navbar>

                <Container>

                    <Row>
                        <Col sm="12" md={{ size: 4, offset: 4 }}>




                            <Form>
                                <h3 style={{ color: '#007bff' }}>Sign In</h3>
                                <FormGroup>
                                    <Input type="email" placeholder="Email" onChange={(value1) => this.EmailChangeFunc((value1.target.value))} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" onChange={(value1) => this.PasswordChangeFunc((value1.target.value))} placeholder="Password" />

                                </FormGroup>

                                <Button onClick={() => this.componentLoginfunc()} style={this.props.BtnStyle} color='primary'>SignIn</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                }


        <Modalcom ModalBoolean={this.props.errorflag} closeModalRequest={() => this.closeModalfunc()} ModalText={this.props.errormessage} />
            </div>
        );
    }
}
export default connect(mapStatetoProp, mapStatetodispatch)(AdminLogin)
