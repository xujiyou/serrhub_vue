import Vue from 'vue'

export default {
    addServiceLinkToServer (serviceLinkInfo, userId, houseId, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://127.0.0.1:8001/api/serviceLink/add',
            {"userId": userId, "houseId": houseId, "serviceLink": serviceLinkInfo}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                alert(response.data["errMsg"])
            }

        }, response => {
            errorCallback(response)
        });
    },
    removeServiceLinkFromServer(userId, houseId, link, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://127.0.0.1:8001/api/serviceLink/remove',
            {"userId": userId, "houseId": houseId, "link": link}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                alert(response.data["errMsg"])
            }

        }, response => {
            errorCallback(response)
        });
    },
    updateServiceLinkToServer (serviceLinkInfo, userId, houseId, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://127.0.0.1:8001/api/serviceLink/update',
            {"userId": userId, "houseId": houseId, "serviceLink": serviceLinkInfo}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "serrhub" + token
                }
            }).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                alert(response.data["errMsg"])
            }

        }, response => {
            errorCallback(response)
        });
    },
}