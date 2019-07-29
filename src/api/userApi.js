import Vue from 'vue'

export default {
    //获取用户信息API
    findUserInfoThroughToken (token, successCallback, errorCallback) {
        Vue.http.get(
                'https://boot.serrhub.com/api/user/info?token=' + token,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "serrhub" + token
                    }
                }
            ).then(response => {
                successCallback(response);
            }, response => {
                errorCallback(response)
            });
    }
}