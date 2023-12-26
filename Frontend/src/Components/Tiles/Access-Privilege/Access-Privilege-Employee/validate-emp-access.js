export default function ValidateEmpAccess(accessRequest) {
    const {manager, requestFor, reason, date} = accessRequest;
   

    if(!manager && !requestFor && !reason && !date){
        return 'Please Fill All Mandatory Fields'
    }

    if(!manager){
        return 'Please Select the Manager'
    }

    if(!requestFor){
        return 'Please Select Request For Access'
    }

    if(!reason){
        return 'Please Fill Reason'
    }
    if(!date){
        return 'Please Select the Date'
    }

    return null;
} 