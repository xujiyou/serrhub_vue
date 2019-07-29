import Vue from 'vue'

export default {
    //登录API
    login (loginInfo, successCallback, errorCallback) {
        Vue.http.post(
                'http://boot.serrhub.com/api/auth/login',
                loginInfo,
                {headers: {"Content-Type": "application/json"}}
            ).then(response => {
                let code = response.data["code"];
                if (code === 0) {
                    successCallback(response);
                } else {
                    alert(response.data["errMsg"]);
                }
            }, response => {
                errorCallback(response)
            }
        );
    },
    //注册API
    register (registerInfo, successCallback, errorCallback) {
        Vue.http.post(
                'http://boot.serrhub.com/api/auth/register',
                registerInfo,
                {headers: {"Content-Type": "application/json"}}
            ).then(response => {
                let code = response.data["code"];
                if (code === 0) {
                    successCallback(response);
                } else {
                    alert(response.data["errMsg"]);
                }
            }, response => {
                errorCallback(response)
            }
        );
    }
}