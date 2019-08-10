import Vue from 'vue'

export default {
    //登录API
    login (loginInfo, successCallback, errorCallback) {
        Vue.http.post(
                'https://boot.serrhub.com/api/auth/login',
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
    register (registerInfo, successCallback, phoneExist, emailExist, errorCallback) {
        Vue.http.post(
                'https://boot.serrhub.com/api/auth/register',
                registerInfo,
                {headers: {"Content-Type": "application/json"}}
            ).then(response => {
                let code = response.data["code"];
                if (code === 0) {
                    successCallback(response);
                } else if (code === 1) {
                    phoneExist();
                } else if (code === 2) {
                    emailExist();
                }
            }, response => {
                errorCallback(response)
            }
        );
    },
    //发送邮箱验证码
    sendEmailCode (receiver, successCallback, emailFormatError, emailExistError, errorCallback) {
        Vue.http.get(
            'http://localhost:8001/api/auth/send/' + receiver, {}
        ).then(response => {
                let code = response.data["code"];
                if (code === 0) {
                    successCallback(response);
                } else if (code === 1) {
                    emailFormatError(response);
                } else if (code === 2) {
                    emailExistError(response);
                }
            }, response => {
                errorCallback(response)
            }
        );
    }
}