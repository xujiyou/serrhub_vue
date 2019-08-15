import Vue from 'vue'

export default {
    //analysis user input address
    analysisAddress (text, successCallback, errorCallback) {
        Vue.http.get(
            'https://boot.serrhub.com/api/address/text/' + text,
        ).then(response => {
            successCallback(response);
        }, response => {
            errorCallback(response)
        });
    }
}