import Vue from 'vue'

export default {
    addHouseToServer (houseInfo, userId, token, successCallback, errorCallback) {
        Vue.http.post(
            'http://boot.serrhub.com/api/house/add',
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
            'http://boot.serrhub.com/api/house/update',
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
            'http://boot.serrhub.com/api/house/remove',
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