export default function validationRegister(user){
    const { fname, lname, email, phone, workLocation, address, gender, dob, designation, password, confirmPass } = user;

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexPhone = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    const regexDob = /^((0[1-9])|(1[0-2]))\/(\d{4})$/

    if(!fname && !lname && !email && !phone && !address && !gender && !dob && !password && !confirmPass){
        return 'Enter All Mandatory Details*'
    }
    
    if(!fname){
        return 'First Name is Required*'
    }

    if(!lname){
        return 'Last Name is Required*'
    }

    if(!email){
        return 'Email is Required*'
    } else if (!email.match(regexEmail)){
        return 'Email is Invalid'
    }

    if(!phone){
        return 'Phone Number is Required*'
    } else if (!phone.match(regexPhone)){
        return 'Phone is Invalid'
    }
    
    if(!gender){
        return 'Gender is Required'
    }

    if(!dob){
        return 'Date of Birth is Required *'
    }  else if (!dob.match(regexDob)){
        return 'Date of Birth is Invalid'
    }

    if(!address){
        return 'Address is Required*'
    }
    
    if(!workLocation){
        return 'Work Location is Required *'
    } 
    
    if(!designation){
        return 'Designation is Required *'
    }  
    
    if(!password){
        return 'Password is Required *'
    } else if(password.length <= 5) {
        return 'Password must be more than 5 Character'
    }
    
    if(!confirmPass){
        return 'Confirm Password is Required *'
    }else if(password !== confirmPass){
        return 'Password & Confirm Password do not match'
    }

    return null;
}