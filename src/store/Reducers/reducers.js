let initialstate = {
    name: "",
    errormessage: '',
    errorflag: false,
    useruid: '',
    email: '',
    AccountType: '',
    myKey: '',
    cgpa: '',
    department: '',
    semester: '',
    university: '',
    AllUserData: [],
    SendingAllUserDataArray:[],
    StudentArray:[],
    CompanyArray:[]

}

export let AuthReducer = (state = initialstate, test) => {
    switch (test.type) {
        case "SettingUserData":
            return ({
                ...state, name: test.name, useruid: test.useruid, email: test.email, AccountType: test.AccountType, myKey: test.myKey, cgpa: test.cgpa, department: test.department, semester: test.semester, university: test.university
            })
            break;




            break;


        case "Logout":
            localStorage.removeItem('UserData')
            return state

            break;


        case 'error':

            return (
                {
                    ...state, errormessage: test.errormessage, errorflag: test.errorflag
                }
            )
            break;

        case "AllUserData":


            return Object.assign({}, ...state, { AllUserData: [...state.AllUserData, test.AllUserDataReducer] })

            break;


            case 'SendingAllUserData':
            return Object.assign({},state, { SendingAllUserDataArray: [...state.SendingAllUserDataArray, test.AllUserDataReducer2] })
break;

        case 'errorFalse':
            return (
                {
                    ...state, errorflag: test.errorflag
                }
            )
            break;

            case 'AdminCompanyData':
            return Object.assign({},state, { CompanyArray: [...state.CompanyArray, test.AdminCompanyDataReducer2] })
            
            case 'UpdateCompanyArray':
            let dupDelArray=state.CompanyArray
            dupDelArray.splice(test.UpdateCompanyArrayProp,1)
            // console.log(state.CompanyArray,'Test')
            return Object.assign({},state, { CompanyArray:[...dupDelArray] })
        
        default:
            return state
    }

}







