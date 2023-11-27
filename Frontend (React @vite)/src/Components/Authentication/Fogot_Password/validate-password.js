export default function validatePassword(user){
    const { password, confirmPass } = user;

    if(!password){
        return 'Password is Required*'
    } else if(password.length <= 5) {
        return 'Password must be more than 5 Character'
    }

    if(!confirmPass){
        return 'Confirm Password is Required*'
    }else if(password !== confirmPass){
        return 'Passwords do not match'
    }

    return null;
}