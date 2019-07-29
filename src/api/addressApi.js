import Vue from 'vue'

export default {
    //获取用户信息API
    analysisAddress (text, successCallback, errorCallback) {
        Vue.http.get(
            'http://boot.serrhub.com/api/address/text/' + text,
        ).then(response => {
            successCallback(response);
        }, response => {
            errorCallback(response)
        });
    }
}