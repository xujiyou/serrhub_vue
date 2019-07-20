import Vue from 'vue'

export default {
    addHouseToServer (houseInfo, userId, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://127.0.0.1:8001/api/house/add',
            {"house": houseInfo, "userId": userId}, {
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
    updateHouseToServer (houseInfo, userId, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://127.0.0.1:8001/api/house/update',
            {"house": houseInfo, "userId": userId}, {
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
    removeHouseFromServer (houseId, userId, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://127.0.0.1:8001/api/house/remove',
            {"houseId": houseId, "userId": userId}, {
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
    }
}