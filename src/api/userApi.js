import Vue from 'vue'

export default {
    findUserInfoThroughToken (token, successCallback, errorCallback) {
        let formData = new FormData();
        formData.append('token', token);
        Vue.http.get(
            'http://boot.serrhub.com/api/user/info?token=' + token, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "serrhub" + token
                }
            }).then(response => {
                successCallback(response);
            }, response => {
                errorCallback(response)
            });
    }
}