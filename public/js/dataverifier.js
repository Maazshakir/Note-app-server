function emailVerify(email){
    if(email=="" || email.includes("@gmail.com")==false){
        alert("wrong email format email must contain @gmail.com");
        return false;
    }else{
        return true;
    }
}

function passwordVerify(password){
    if(password==""){
        alert("wrong password format password must contain atleat 1 char");
        return false;
    }else{
        return true;
    }

}

function nameVerify(username){
    if(username==""){
        alert("wrong username format username must contain atleat 1 char");
        return false;
    }else{
        return true;
    }

}

