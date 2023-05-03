let logoutButton = new LogoutButton();
logoutButton.action = function logoutUser(){
    ApiConnector.logout(location.reload());
}

ApiConnector.current(response => api(response))

function api(el){
    if(el.success){
        ProfileWidget.showProfile(el.data);
    }
}

let ratesBoard = new RatesBoard();
ApiConnector.getStocks(data => currencyTable(data));

setInterval(() => ApiConnector.getStocks(data => currencyTable(data)), 60000);
function currencyTable(object){
    if(object.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(object.data);
    }
}

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data){
    ApiConnector.addMoney(data, function (object){
        if(object.success){
            ProfileWidget.showProfile(object.data);
            moneyManager.setMessage(object.success,'Зачислено: ' + data.amount + ' ' + data.currency);
        }
        else{
            moneyManager.setMessage(object.success, object.error);
        }
})
}

moneyManager.conversionMoneyCallback = function(data){
    ApiConnector.convertMoney(data, function(object){
        if(object.success){
            ProfileWidget.showProfile(object.data);
            moneyManager.setMessage(object.success,'Конвертировано: ' + data.fromAmount + ' ' + data.fromCurrency + ' в ' + data.targetCurrency);
        }
        else{
            moneyManager.setMessage(object.success, object.error);
        }
    })
}

moneyManager.sendMoneyCallback = function(data){
    ApiConnector.transferMoney(data, function(object){
        if(object.success){
            ProfileWidget.showProfile(object.data);
            moneyManager.setMessage(object.success,'Переведено: ' + data.amount + ' ' + data.currency);
        }
        else{
            moneyManager.setMessage(object.success, object.error);
        }
    })
}

let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(data => favourites(data))

function favourites(object){
    if(object.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(object.data);
        moneyManager.updateUsersList(object.data)
    }
}

favoritesWidget.addUserCallback = function(data){
    ApiConnector.addUserToFavorites(data, function(object){
        if(object.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(object.data);
            moneyManager.updateUsersList(object.data)
            favoritesWidget.setMessage(object.success, "Пользователь добавлен")
        }
        else{
            favoritesWidget.setMessage(object.success, object.error)
        }
    })
}

favoritesWidget.removeUserCallback = function(data){
    ApiConnector.removeUserFromFavorites(data, function(object){
        if(object.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(object.data);
            moneyManager.updateUsersList(object.data)
            favoritesWidget.setMessage(object.success, "Пользователь удален")
        }
        else{
            favoritesWidget.setMessage(object.success, object.error)
        }
    })
}