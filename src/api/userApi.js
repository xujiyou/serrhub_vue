import Vue from 'vue'

export default {
    findUserInfoThroughToken (token, successCallback, errorCallback) {
        let formData = new FormData();
        formData.append('token', token);
        Vue.http.post(
            'http://boot.serrhub.com/api/user/info',
            formData, {
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