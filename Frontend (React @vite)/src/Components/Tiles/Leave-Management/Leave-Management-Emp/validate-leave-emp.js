export default function ValidateLeaveEmp(leaveRequest) {
    const { leaveType, startDate, endDate, isHalfDay, halfDayDate, reason} = leaveRequest;
    
    if(!leaveType && !startDate && !endDate && !isHalfDay && !reason){
        return 'Please Fill All Mandatory Fields'
    }

    if(!leaveType){
        return 'Please Select the Leave Type'
    }

    if(!startDate){
        return 'Please Select the Start Date'
    }
    if(!endDate){
        return 'Please Select the End Date'
    }

    if(!isHalfDay){
        return 'Please Select Half Day Status'
    }

    if(isHalfDay=== 'yes' && !halfDayDate){
        return 'Please Select the Half Day Date'
    }
    
    if(!reason){
        return 'Please Fill the Reason'
    }

    return null;
}