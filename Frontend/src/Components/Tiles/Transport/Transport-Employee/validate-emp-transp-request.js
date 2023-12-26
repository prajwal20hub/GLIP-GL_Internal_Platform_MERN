export default function ValidateEmpTranspRequest(transRequest) {
    const {pickupLocation, startDate, endDate, returnTrip } = transRequest;

    if(!pickupLocation && !startDate && !endDate && !returnTrip){
        return 'Please Fill All Mandatory Fields'
    }

    if(!pickupLocation){
        return 'Please Select Pickup Location'
    }

    if(!startDate){
        return 'Please Select the Start Date'
    }
    if(!endDate){
        return 'Please Select the End Date'
    }
    if(!returnTrip){
        return 'Please Select Return Trip Status'
    }
    return null;
} 