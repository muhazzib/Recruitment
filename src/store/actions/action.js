import { database } from '../../fire'

export let loginfunc = (obj) => {


    let credentials = {
        type: 'login',
        email: obj.name,
    }

    return (
        credentials
    )

}


export let SendingUserData = (obj) => {
    let credentials = {
        type: 'SettingUserData',
        email: obj.email,
        name: obj.name,
        useruid: obj.uid,
        AccountType: obj.AccountType,
        myKey: obj.myKey,
        cgpa: obj.cgpa,
        department: obj.department,
        semester: obj.semester,
        university: obj.university

    }
    console.log(credentials, 'test')
    return (
        credentials
    )
}






export let errorReducerFunc = (error) => {
    return (
        {
            type: 'error',
            errormessage: error.error,
            errorflag: true
        }
    )
}


export let errorReducerCloseFunc = () => {
    return (
        {
            type: 'errorFalse',
            errorflag: false
        }
    )
}


export let LogoutAction = () => {
    return (
        {
            type: 'Logout'
        }
    )
}



export let SendingAllUserData2 = () => {
    return (dispatch) => {
        database.child('userConvo/').on("child_added", function (snapshot) {
            let obj = snapshot.val()
            obj.key = snapshot.key
            if (obj.AccountType === 'Student') {
                dispatch(FinalSendingAllUserData2(obj));
            }
        })

    }

}


export function FinalSendingAllUserData2(obj) {

    // console.log(obj,'Action adas 2')
    return {
        type: 'AllUserData',
        AllUserDataReducer: obj
    }
}



export function sendingCompanyData2() {
    let uidarray = []
    return (dispatch) => {
        database.child('userConvo/').on("child_added", function (snapshot) {
            let obj = snapshot.val()
            obj.key = snapshot.key
            if (obj.AccountType === 'Company') {


                uidarray.push(obj.useruid)

            }
        })
        setTimeout(() => {

            uidarray.map((value, index) => {
                database.child('Company').child(value).on("child_added", function (snapshot2) {
                    let obj1 = snapshot2.val()

                    dispatch(FinalsendingCompanyData2(obj1));

                })
            })
        }, 2000)
        console.log(uidarray, 'uidArray')

    }
}

export function FinalsendingCompanyData2(obj) {
    console.log(obj, 'Alllllllll')
    return {
        type: 'SendingAllUserData',
        AllUserDataReducer2: obj
    }
}


export function AdminSendingCompanyData2(){
    let uidarray = []
    return (dispatch) => {
        database.child('userConvo/').on("child_added", function (snapshot) {
            let obj = snapshot.val()
            obj.key = snapshot.key
            if (obj.AccountType === 'Company') {


                uidarray.push(obj.useruid)

            }
        })
        setTimeout(() => {

            uidarray.map((value, index) => {
                database.child('Company').child(value).on("child_added", function (snapshot2) {
                    let obj1 = snapshot2.val()
obj1.key=snapshot2.key
                    dispatch(AdminFinalsendingCompanyData2(obj1));

                })
            })
        }, 2000)
        console.log(uidarray, 'uidArray')

    }
}
export function AdminFinalsendingCompanyData2(obj){
    return {
        type: 'AdminCompanyData',
        AdminCompanyDataReducer2: obj
    }
    }

export function UpdateCompanyArrayAction(arrayindex){
    // console.log(arrayindex,'del array')
    return{
        type:'UpdateCompanyArray',
        UpdateCompanyArrayProp:arrayindex
    }
}







