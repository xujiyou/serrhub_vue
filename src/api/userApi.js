import Vue from 'vue'

export default {

    //find user info API
    findUserInfoThroughToken (token, successCallback, errorCallback) {
        Vue.http.get(
            'https://boot.serrhub.com/api/user/info?token=' + token,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            successCallback(response);
        }, response => {
            errorCallback(response)
        });
    },

    //update user name
    updateUserName(userId, firstName, lastName, token, successCallback, errorCallback, networkError) {
        Vue.http.get(
            'https://boot.serrhub.com/api/user/updateUserName/' + userId + '/' +  firstName + '/' + lastName,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                errorCallback(response);
            }
        }, response => {
            networkError(response)
        });
    },

    //update phone
    updatePhone(userId, phone, token, successCallback, errorCallback, networkError) {
        Vue.http.get(
            'https://boot.serrhub.com/api/user/updatePhone/' + userId + '/' +  phone,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                errorCallback(response);
            }
        }, response => {
            networkError(response)
        });
    },

    //update email
    updateEmail(userId, email, token, successCallback, errorCallback, networkError) {
        Vue.http.get(
            'https://boot.serrhub.com/api/user/updateEmail/' + userId + '/' +  email,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "serrhub" + token
                }
            }
        ).then(response => {
            if (response.data["code"] === 0) {
                successCallback(response);
            } else {
                errorCallback(response);
            }
        }, response => {
            networkError(response)
        });
    },

    //update password
    updatePassword(userId, oldPassword, newPassword, secondPassword, token, successCallback, errorCallback, networkError) {
        Vue.http.post(
            'https://boot.serrhub.com/api/user/updatePassword', {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
                secondPassword: secondPassword
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
                errorCallback(response);
            }
        }, response => {
            if (response.status === 403) {
                errorCallback(response);
            } else {
                networkError(response)
            }
        });
    },
}