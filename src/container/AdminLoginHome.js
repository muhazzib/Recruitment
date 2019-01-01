import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { browserHistory } from 'react-router'
import { firebaseSignOut, fire, database } from '../fire'
import Navbarcom from '../components/nav'
import { AdminSendingCompanyData2,UpdateCompanyArrayAction } from '../store/actions/action'
import { connect } from 'react-redux'

let mapStatetodispatch = (dispatch) => {
    return {
        SendingCompanyData: () => {

            dispatch(AdminSendingCompanyData2())
        },
        UpdateCompanyArray: (array) => {
            
                        dispatch(UpdateCompanyArrayAction(array))
                    
    },  SendingCompanyData: () => {
        
                    dispatch(AdminSendingCompanyData2())
                },
                UpdateCompanyArray: (array) => {
                    
                                dispatch(UpdateCompanyArrayAction(array))
                            }
            }
}


let mapStateToProps = (state) => {
    return (
        {
            StudentsArray: state.AuthReducer.name,
            CompanyArray: state.AuthReducer.CompanyArray,

        }
    )
}
class AdminLoginHome extends Component {

    constructor(props) {
        super(props)
    }



    componentWillMount() {

        fire.auth().onAuthStateChanged((user) => {

            if (user) {
                browserHistory.push('/AdminLoginHome')
                this.props.SendingCompanyData()
            }
            else {
                browserHistory.push('/')
            }

        })
    }

    Logoutfunc = () => {

        firebaseSignOut.signOut()
        window.location.href = '/'
    }
    DeleteFunc=(key,uid,array)=>{
database.child('Company').child(uid).child(key).remove();  
this.props.UpdateCompanyArray(array)
console.log(array,'del arr')
    }
    render() {
        return (

            <Container fluid>
                <Navbarcom Logoutfunc={() => this.Logoutfunc()} NavbarText='Admin' />
                <ul>
                    <li>Home</li>
                    <li>Complaints</li>
                    <li>Users</li>
                    <li>Statistics</li>
                    <li>Create User</li>
                </ul>
                {/* <h1>Add User</h1>

                <label>Email<input type='text'/></label>
                <br/>
                <label>Password<input type='password'/></label> */}

                {/* <Row>
                    <Col sm="6">
                        <div style={{ width: '50%', float: 'left' }}>
                            <h1>Students</h1>

                        </div>
                    </Col>

                    <Col sm="6" >
                        <div style={{ width: '50%', float: 'right'}}>
                            <h1>Companies</h1>{

                                this.props.CompanyArray.map((value, index) => {
                                    return (
                                        <div style={{ border: '2px solid black', margin: '1%',padding:'auto',wordWrap: 'break-word' }}>
<button style={{float:'right'}} onClick={()=>this.DeleteFunc(value.key,value.uid,index)}>Delete</button>
                                           <h2> Company Name:</h2>
                                           <h4 style={{color:'black'}}>{value.username}</h4>
                                           <h2> Company Email:</h2>
                                           <h4 style={{color:'blue'}}>{value.email}</h4>
                                           <h2> Job Description:</h2>
                                           <p style={{color:'black'}}>{value.JobDescription}</p>
                                        
                                        </div>
                                    )
                                })
                            }
                        </div>




                    </Col>
                </Row> */}
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapStatetodispatch)(AdminLoginHome)
