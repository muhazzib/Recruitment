import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { SendingUserData, errorReducerFunc, errorReducerCloseFunc, LogoutAction, SendingAllUserData2, sendingCompanyData2 } from '../store/actions/action'
import { firebaseSignOut, fire, database } from '../fire'
import Navbarcom from '../components/nav'
import Modalcom from '../components/modal'
import SubmitModalcom from '../components/enterdetailModal'
import SubmitCompanyModalcom from '../components/enterCompanyDetails'

import { Table } from 'reactstrap';


import Modal from 'react-modal';


import { browserHistory } from 'react-router'
import { Container, Row, Col } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#007bff'
    }
};


let mapStateToProps = (state) => {
    return (
        {
            reduxstate: state.AuthReducer.name,
            myUid: state.AuthReducer.useruid,
            AccountType: state.AuthReducer.AccountType,
            errormessage: state.AuthReducer.errormessage,
            errorflag: state.AuthReducer.errorflag,
            AllUserDataArray: state.AuthReducer.AllUserData,
            SendingAllUserDataArray1: state.AuthReducer.SendingAllUserDataArray
        }
    )
}


let mapStatetodispatch = (dispatch) => {
    return {
        sendingUserDataToReduxState: (value) => {
            dispatch(SendingUserData(value))
        },
        sendingCompanyData: (value) => {
            dispatch(sendingCompanyData2(value))
        },
        errorFunc: (error) => {
            dispatch(errorReducerFunc(error))
        },
        errorCloseFunc: (errorboolean) => {
            dispatch(errorReducerCloseFunc(errorboolean))
        },

        Logoutfunc: () => {

            dispatch(LogoutAction())
        },
        SendingAllUserData: () => {

            dispatch(SendingAllUserData2())
        },
    }
}
class Home extends Component {
    constructor() {
        super()
        this.state = {
            userdata: '',
            modalIsOpen: false,
            SubmitModalBoolean: false,
            SubmitModalBoolean2: false,
            SubmitModalType: '',
            SubmitModalType2: '',
            showDetailModal: false,
            UserDetail: ''

        }

    }





    componentWillMount() {

        fire.auth().onAuthStateChanged((user) => {

            if (user) {
                if (JSON.parse(localStorage.getItem("UserData1")).AccountType === 'Student') {
                    this.props.sendingCompanyData()
                    setTimeout(() => {

                        let useruid = JSON.parse(localStorage.getItem("UserData1")).uid
                        let AllUserObject = []
                        let UserData = {
                            name: "",
                            uid: useruid,
                            email: '',
                            AccountType: JSON.parse(localStorage.getItem("UserData1")).AccountType,
                            myKey: '',
                            department: '',
                            semester: '',
                            cgpa: '',
                            university: ''
                        }


                        database.child(UserData.AccountType + '/' + useruid).once("child_added", function (snapshot) {
                            // UserData.name=snapshot.username;
                            // UserData.email=snapshot.email;
                            var obj = snapshot.val()
                            obj.key = snapshot.key

                            UserData.name = obj.username
                            UserData.email = obj.email
                            UserData.myKey = obj.key
                            UserData.department = obj.Department
                            UserData.semester = obj.Semester
                            UserData.cgpa = obj.CGPA
                            UserData.university = obj.University


                            localStorage.setItem('UserData1', JSON.stringify(UserData))
                        }).then((snapshot) => {
                            this.props.sendingUserDataToReduxState(UserData)


                        })
                    }, 1000)
                }
                else if (JSON.parse(localStorage.getItem("UserData1")).AccountType === 'Company') {
                    this.props.SendingAllUserData()

                    setTimeout(() => {

                        let useruid = JSON.parse(localStorage.getItem("UserData1")).uid

                        let AllUserObject = []
                        let UserData = {
                            name: "",
                            uid: useruid,
                            email: '',
                            AccountType: JSON.parse(localStorage.getItem("UserData1")).AccountType,
                            myKey: '',
                            department: '',
                            semester: '',
                            cgpa: '',
                            university: ''
                        }


                        database.child(UserData.AccountType + '/' + useruid).once("child_added", function (snapshot) {
                            // UserData.name=snapshot.username;
                            // UserData.email=snapshot.email;
                            var obj = snapshot.val()
                            obj.key = snapshot.key

                            UserData.name = obj.username
                            UserData.email = obj.email
                            UserData.myKey = obj.key
                            UserData.department = obj.Department
                            UserData.semester = obj.Semester
                            UserData.cgpa = obj.CGPA
                            UserData.university = obj.University


                            localStorage.setItem('UserData1', JSON.stringify(UserData))
                        }).then((snapshot) => {
                            this.props.sendingUserDataToReduxState(UserData)


                        })
                    }, 1000)
                }
                // User is signed in.



            } else {
                localStorage.removeItem('UserData1')
                window.location.href = '/'
                browserHistory.replace('/')
            }
        });
    }



    Logoutfunc = () => {
        this.props.Logoutfunc()
        firebaseSignOut.signOut()
        window.location.href = '/'
    }

    closeModalfunc = () => {
        this.props.errorCloseFunc()
    }

    submitModalFunc1 = () => {
        this.setState({
            SubmitModalBoolean: true,
            SubmitModalType: 'MyProfile'
        })
    }



    SubmitCloseModalFunc = () => {
        this.setState({
            SubmitModalBoolean: false
        })
    }

    SubmitCloseModalFunc2 = () => {
        this.setState({
            SubmitModalBoolean2: false
        })
    }


    showModalFunc = (obj1) => {
        this.setState({
            showDetailModal: true
        })
        let obj;
        database.child('Student').child(obj1.useruid).once("child_added", function (snapshot) {
            obj = snapshot.val()
            console.log(obj)
        })
        setTimeout(() => {

            this.setState({
                UserDetail: obj
            })
        }, 1000)
    }

    closeModalFunc = () => {
        this.setState({
            showDetailModal: false
        })
    }

    submitModalFunc2 = () => {
        this.setState({
            SubmitModalBoolean2: true,
            SubmitModalType2: 'MyProfile'
        })
    }

    render() {

        return (

            <Container fluid='true'>
                <Navbarcom NavbarText={this.props.reduxstate} Logoutfunc={() => this.Logoutfunc()} />


                <div>
                    <SubmitModalcom SubmitModalBoolean={this.state.SubmitModalBoolean} SubmitcloseModalRequest={() => this.SubmitCloseModalFunc()} SubmitModalType={this.state.SubmitModalType} />
                    <SubmitCompanyModalcom SubmitModalBoolean={this.state.SubmitModalBoolean2} SubmitcloseModalRequest={() => this.SubmitCloseModalFunc2()} SubmitModalType={this.state.SubmitModalType2} />


                    {(this.props.AccountType === 'Company') ? (
                        <div>
                            <div style={{ width: '20%', margin: '0 auto' }}>
                                <button onClick={() => this.submitModalFunc2()}>
                                    Launch Vacancy
 </button>
                            </div>
                            <div style={{ border: "1px solid black", width: "300px", overflow: "scroll", height: '90vh', padding: '1%', position: 'fixed', backgroundColor: 'black' }}>
                                <h5 style={{ color: '#007bff', marginLeft: '7%' }}>Enrolled Students</h5>
                                <br />
                                <ListGroup>

                                    {

                                        this.props.AllUserDataArray.map((value, index) => {
                                            return (

                                                <Button color="link" style={{ textDecoration: 'none' }} onClick={() => this.showModalFunc(value)}>
                                                    <ListGroupItem>
                                                        {value.name}

                                                    </ListGroupItem>
                                                </Button>

                                            )

                                        })
                                    }


                                </ListGroup>



                                <Modal
                                    isOpen={this.state.showDetailModal}
                                    onRequestClose={!this.state.showDetailModal}
                                    contentLabel="Example Modal"
                                >
                                    <button onClick={this.closeModalFunc} style={{ float: "right", marginBottom: '2%' }}>X</button>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>University</th>
                                                <th>Department</th>
                                                <th>Semester</th>
                                                <th>CGPA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.UserDetail.username}</td>
                                                <td>{this.state.UserDetail.email}</td>
                                                <td>{this.state.UserDetail.University}</td>
                                                <td>{this.state.UserDetail.Department}</td>
                                                <td>{this.state.UserDetail.Semester}</td>
                                                <td>{this.state.UserDetail.CGPA}</td>



                                            </tr>

                                        </tbody>
                                    </Table>


                                </Modal>

                            </div>


                        </div>
                    ) : (

















                            (this.props.AccountType === 'Student') ? (
                                <div>

                                    <div style={{ width: '20%', margin: '0 auto', float: 'right' }}>
                                        <button onClick={() => this.submitModalFunc1()} >My Profile</button>

                                    </div>
                                    <div style={{ border: "1px solid black", width: "700px", overflow: "scroll", height: '90vh', padding: '1%', position: 'fixed' }}>
                                        <h5 style={{ color: '#007bff', marginLeft: '7%' }}>Vacancies</h5>


                                        {


                                            this.props.SendingAllUserDataArray1.map((value, index) => {
                                                console.log(value, 'testaaaaaaaa')
                                                return (
                                                    <div style={{ color: 'white', backgroundColor: 'black', padding: '2%', margin: '2%' }}>
                                                        <h1>{value.username}</h1>
                                                        <p > {value.JobDescription}</p>
                                                    </div>
                                                )
                                            })


                                        }
                                    </div>
                                </div>

                            ) : (
                                    null
                                )

                        )


















                    }
                </div>

                <Modalcom ModalBoolean={this.props.errorflag} closeModalRequest={() => this.closeModalfunc()} ModalText={this.props.errormessage} />

            </Container>
        );
    }
}

export default connect(mapStateToProps, mapStatetodispatch)(Home)