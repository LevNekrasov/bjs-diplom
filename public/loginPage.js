"use strict";
const newUser = new UserForm();
newUser.loginFormCallback = function(data){
    ApiConnector.login(data, response => a(response));
} 

function a(data){
    if(data.success == true){
        location.reload();
    }
    else{
        newUser.setLoginErrorMessage(data.error);
    }
}

newUser.registerFormCallback = function(data){
    ApiConnector.register(data, response => b(response));
    console.log(data)
}

function b(data){
    if(data.success == true){
        location.reload();
    }
    else{
        newUser.setRegisterErrorMessage(data.error);
    }
}