import Modal from 'react-modal';
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { database } from '../fire'
import { connect } from 'react-redux'
import { errorReducerFunc, errorReducerCloseFunc } from '../store/actions/action'
import Modalcom from './modal'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

let mapStatetodispatch = (dispatch) => {
    return {

        errorFunc: (error) => {
            dispatch(errorReducerFunc(error))
        },
        errorCloseFunc: (errorboolean) => {
            dispatch(errorReducerCloseFunc(errorboolean))
        },
    }
}

let mapStateToProps = (state) => {
    return (
        {
            reduxstate: state.AuthReducer.name,
            email: state.AuthReducer.email,
            myUid: state.AuthReducer.useruid,
            AccountType: state.AuthReducer.AccountType,
            errormessage: state.AuthReducer.errormessage,
            errorflag: state.AuthReducer.errorflag,
            myKey: state.AuthReducer.myKey
        }
    )
}
class SubmitCompanyModalcom extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            jobDes: ''

        }
    }

    componentWillMount() {
        // this.setState({
        //     email: this.props.email,
        //     name: this.props.reduxstate,
        //     Department: this.props.department,
        //     Semester: this.props.semester,
        //     University: this.props.university,
        //     CGPA: this.props.cgpa
        // })
    }


    SubmitMyProfileDetails = () => {
        alert(this.props.myKey)
        let MyProfileCredentials = {
            email: this.props.email,
            username: this.props.reduxstate,
            uid: JSON.parse(localStorage.getItem("UserData1")).uid,
            JobDescription: this.state.jobDes,
            AccountType: JSON.parse(localStorage.getItem("UserData1")).AccountType
        }
        // alert(this.props.AccountType)
        database.child(this.props.AccountType + '/' + this.props.myUid).child(this.props.myKey).set(MyProfileCredentials)
        let errorObject = {
            errorflag: true,
            error: 'Your Details have been saved successfully'
        }
        this.props.errorFunc(errorObject)


    }

    closeModalfunc = () => {
        this.props.errorCloseFunc()
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.SubmitModalBoolean}
                    onRequestClose={this.props.SubmitcloseModalRequest}
                    style={customStyles}
                    contentLabel="Example Modal"
                >{

                        (this.props.SubmitModalType === 'MyProfile') ? (
                            <div>
                                <FormGroup>
                                    <Label>Email</Label>

                                    <Input type="name" disabled placeholder={this.props.email} onChange={(value1) => { this.setState({ email: value1.target.value }) }} />

                                    <Label>Name</Label>
                                    <Input type="name" disabled placeholder={this.props.reduxstate} onChange={(value1) => { this.setState({ name: value1.target.value }) }} />


                                </FormGroup>
                                <FormGroup>
                                    <textarea onChange={(value1) => { this.setState({ jobDes: value1.target.value }) }} style={{ height: '50px' }} >
                                        Enter Vacancy Here
                                    </textarea>
                                </FormGroup>

                                <Button onClick={() => this.SubmitMyProfileDetails()}>Submit</Button>
                            </div>
                        ) : (
                                null
                            )
                    }
                    <p>{this.props.ModalText}</p>

                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapStatetodispatch)(SubmitCompanyModalcom)
