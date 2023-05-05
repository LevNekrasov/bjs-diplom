"use strict";
const newUser = new UserForm();
newUser.loginFormCallback = function(data){
    ApiConnector.login(data, object => {
        if(object.success){
            location.reload();
        }else{
            newUser.setLoginErrorMessage(object.error);
        }
    })
}

newUser.registerFormCallback = function(data){
    ApiConnector.register(data, object => {
        if(object.success == true){
            location.reload();
        }
        else{
            newUser.setRegisterErrorMessage(object.error);
        }
    })
}