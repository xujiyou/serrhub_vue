import Vue from 'vue'

export default {

    //add service link API
    addServiceLinkToServer (serviceLinkInfo, userId, houseId, token, successCallback, saveErrorCallback, errorCallback) {
        Vue.http.post(
            'https://boot.serrhub.com/api/serviceLink/add',
            {
                "userId": userId,
                "houseId": houseId,
                "serviceLink": serviceLinkInfo
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else if (response.data["code"] === 4) {
                saveErrorCallback(response);
            }

        }, response => {
            errorCallback(response)
        });
    },

    //delete service link API
    removeServiceLinkFromServer(userId, houseId, link, token, successCallback, errorCallback) {
        Vue.http.post(
            'https://boot.serrhub.com/api/serviceLink/remove',
            {
                "userId": userId,
                "houseId": houseId,
                "link": link
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                alert(response.data["errMsg"])
            }

        }, response => {
            errorCallback(response)
        });
    },

    //update service link API
    updateServiceLinkToServer (serviceLinkInfo, userId, houseId, token, successCallback, saveErrorCallback, errorCallback) {
        Vue.http.post(
            'https://boot.serrhub.com/api/serviceLink/update',
            {
                "userId": userId,
                "houseId": houseId,
                "serviceLink": serviceLinkInfo
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else if (response.data["code"] === 4) {
                saveErrorCallback(response);
            }

        }, response => {
            errorCallback(response)
        });
    },

    //search service link API4
    searchServiceLinkFromServer (type, text, userId, token, successCallback, errorCallback) {
        Vue.http.post(
            'https://boot.serrhub.com/api/serviceLink/search',
            {
                "userId": userId,
                "type": type,
                "searchText": text
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            let code = response.data["code"];
            if (code === 0) {
                successCallback(response);
            } else {
                alert(response.data["errMsg"]);
            }
        }, response => {
            errorCallback(response)
        });
    },

    findCommonList (successCallback, errorCallback) {
        Vue.http.get(
            'http://127.0.0.1:8001/api/serviceLink/common/list', {}
        ).then(response => {
            successCallback(response);
        }, response => {
            errorCallback(response)
        });
    },
}