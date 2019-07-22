import Vue from 'vue'

export default {
    login (loginInfo, successCallback, errorCallback) {
        Vue.http.post(
            'http://boot.serrhub.com/api/auth/login',
            loginInfo,
            {headers: {"Content-Type": "application/json"}}).then(response => {
            console.log(response.data);
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                alert(response.data["errMsg"]);
            }

        }, response => {
            errorCallback(response)
        });
    },
    register (registerInfo, successCallback, errorCallback) {
        Vue.http.post(
            'http://boot.serrhub.com/api/auth/register',
            registerInfo,
            {headers: {"Content-Type": "application/json"}}).then(response => {
                console.log(response.data);
                if (response.data["code"] !== 0) {
                    alert(response.data["errMsg"]);
                }
                successCallback(response)
            }, response => {
                errorCallback(response)
        });
    }
}