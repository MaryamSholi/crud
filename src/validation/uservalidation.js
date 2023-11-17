export const validationUserData = (values)=>{

    let errors = {};

    if(values.name.trim()==""){
        errors.name = "userName is required";
    }else if(values.name.trim().length < 3){
        errors.name = "userName must be at least 3 characters";
    }

    if(values.email.trim()==""){
        errors.email = "email is required";
    }else if(values.email.trim().length < 9){
        errors.email = "email must be at least 9 characters";
    }

    if(values.password.trim()==""){
        errors.password = "password is required";
    }else if(values.password.trim().length < 3){
        errors.password = "password must be at least 3 characters";
    }
    return errors;
}