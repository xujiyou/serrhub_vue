import Vue from 'vue'

export default {
    //添加服务API
    addServiceLinkToServer (serviceLinkInfo, userId, houseId, token, successCallback, errorCallback) {
        Vue.http.post(
                'http://boot.serrhub.com/api/serviceLink/add',
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
                } else {
                    alert(response.data["errMsg"])
                }

            }, response => {
                errorCallback(response)
            }
        );
    },
    //删除服务API
    removeServiceLinkFromServer(userId, houseId, link, token, successCallback, errorCallback) {
        Vue.http.post(
                'http://boot.serrhub.com/api/serviceLink/remove',
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
            }
        );
    },
    //更新服务API
    updateServiceLinkToServer (serviceLinkInfo, userId, houseId, token, successCallback, errorCallback) {
        Vue.http.post(
                'http://boot.serrhub.com/api/serviceLink/update',
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
                } else {
                    alert(response.data["errMsg"])
                }

            }, response => {
                errorCallback(response)
            }
        );
    },
    //搜索服务API
    searchServiceLinkFromServer (type, text, userId, token, successCallback, errorCallback) {
        Vue.http.post(
                'http://boot.serrhub.com/api/serviceLink/search',
                {
                    "userId": userId,
                    "type": type,
                    "text": text
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
            }
        );
    },
}