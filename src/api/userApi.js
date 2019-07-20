import Vue from 'vue'

export default {
    findUserInfoThroughToken (token, successCallback, errorCallback) {
        let formData = new FormData();
        formData.append('token', token);
        Vue.http.post(
            'http://127.0.0.1:8001/api/user/info',
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