import authApi from '../../api/authApi'
import userApi from '../../api/userApi'
import houseApi from '../../api/houseApi'
import addressApi from '../../api/addressApi'
import serviceLinkApi from '../../api/serviceLinkApi'
import Vue from 'vue'
import router from '../../router/index'

// initial state
const state = {
    needLogin: false, //是否需要登录，放在这里可以让每个组件都有能力展示登录model
    needRegister: false, //是都需要注册
    token: "", //缓存的token
    currentHouseId: "", //当前房屋ID，很重要
    loginInfo: { //登录信息
        phoneOrEmail: "",
        password: ""
    },
    registerInfo: { //注册信息
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        secondPassword: "",
        houseName: "",
        address: "",
        placeId: "",
        communityName: ""
    },
    userInfo: { //初始的用户信息，为了避免报错，这个信息在运行时很快就会被替换掉
        userId: "",
        roles: [],
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        houseName: "",
        address: "",
        communityName: "",
        profileImage: "",
        lastPasswordResetDate: "",
        houseList:  [
            {
                houseId: "",
                serviceLinkList: [{categories: ""}]
            }
        ]
    },
    houseInfo: { //添加房屋时需要用到的信息
        houseName: "",
        address: "",
        placeId: "",
        communityName: "",
        note: ""
    },
    currentHouseInfo: { //当前需要删除和修改的房屋信息
        houseId: "",
        houseName: "",
        address: "",
        placeId: "",
        communityName: "",
        note: ""
    },
    serviceLinkInfo: { //添加服务时需要用到的信息
        serviceLinkId: "",
        title: "",
        image: "",
        link: "",
        categories: "",
        contact: "",
        phone: "",
        note: ""
    },
    currentServiceLinkInfo: { //当前需要修改的服务信息
        serviceLinkId: "",
        title: "",
        image: "",
        link: "",
        categories: "",
        contact: "",
        phone: "",
        note: "",
    },
    addressList: []
};

// getters
const getters = {
    //组装数据结构
    houseMap: (state, getters, rootState) => {
        let map = {};
        for (let i = 0; i < state.userInfo.houseList.length; i++) {
            let house = state.userInfo.houseList[i];
            let linkMap = {};
            for (let j = 0; j < house.serviceLinkList.length; j++) {
                let link = house.serviceLinkList[j];
                if (linkMap[link.categories] === undefined || linkMap[link.categories] === null) {
                    linkMap[link.categories] = [link];
                } else {
                    linkMap[link.categories].push(link);
                }
            }
            map[house.houseId] = linkMap;
        }
        return map;
    },
};

// actions
const actions = {
    //设置默认的用户信息，在进入网站时执行
    setDefaultUserInfo ({ commit }) {
        serviceLinkApi.findCommonList(resp => {
            state.userInfo.houseList = [
                {
                    houseId: "",
                    serviceLinkList: resp.body
                }
            ];
            state.userInfo.userId = "";
            commit('setCommonService', state.userInfo)
        }, resp => {});
    },

    //从缓存中获取token
    findTokenFromLocalStorage({ commit }) {
        let storage = window.localStorage;
        state.token = storage.token;
    },

    /***********以下为登录注册相关*********/

    //设置展示登录modal的字段
    setNeedLogin ({ commit }, visible) {
        state.needLogin = visible;
    },

    //设置展示注册modal的字段
    setNeedRegister ({ commit }, visible) {
        state.needRegister = visible;
    },

    //查看登录modal
    viewLoginModal ({ commit }) {
        commit('changeModalToLogin');
    },

    //查看注册modal
    viewRegisterModal ({ commit }) {
        commit('changeModalToRegister');
    },

    //登录
    login ({ commit }, param) {
        //必要信息不能为空
        if (state.loginInfo.phoneOrEmail === "" || state.loginInfo.password === "") {
            param["checkInput"]();
            return;
        }
        authApi.login(state.loginInfo, resp => {
            //成功后，设置token，隐藏登录model，设置用户信息，初次登录后，是没有老的houseId的
            state.token = resp.data["token"];
            let storage = window.localStorage;
            storage.token = state.token;
            state.needLogin = false;
            commit("setUserInfo", {"userInfo": resp.data["userInfo"], "oldHouseId": ""});
            param["loginSuccess"]();
        }, resp => {
            if (resp.status === 403) {
                param["loginError"]();
            }
        })
    },

    //注册
    register ({ commit }, param) {
        authApi.register(state.registerInfo, resp => {
            //设置信息，进行登录
            state.loginInfo.phoneOrEmail = state.registerInfo.email;
            state.loginInfo.password = state.registerInfo.password;
            param["closeModal"]();
            state.needRegister = false;
            actions.login({commit}, param);

            state.registerInfo.firstName = "";
            state.registerInfo.lastName = "";
            state.registerInfo.phone = "";
            state.registerInfo.email = "";
            state.registerInfo.password = "";
            state.registerInfo.secondPassword = "";
            state.registerInfo.houseName = "";
            state.registerInfo.address = "";
            state.registerInfo.communityName = "";
        }, resp => {
            param["phoneExistError"]();
        }, resp => {
            param["emailExistError"]();
        }, resp => {
            param["errorCallback"]();
        })
    },

    //注销，将缓存中的token设为空，将用户信息设为默认，将当前房屋ID设为空字串
    logout ({ commit }, closeModel) {
        let storage = window.localStorage;
        storage.token = "";
        state.currentHouseId = "";
        closeModel();
        actions.setDefaultUserInfo({ commit });
    },

    /***********以上为登录注册相关*********/
    /***********以下为个人信息相关*****/

    //进入网页时执行，获取用户信息
    findUserInfo({ commit }, oldHouseId) {
        userApi.findUserInfoThroughToken(state.token, resp => {
            commit("setUserInfo", {"userInfo": resp.data, "oldHouseId": oldHouseId});
        }, resp => {
            actions.setDefaultUserInfo({ commit });
            actions.viewLoginModal({ commit });
        })
    },

    beginUpdateUserName({ commit }, params) {
        userApi.updateUserName(state.userInfo.userId, params["firstName"], params["lastName"], state.token, resp => {
            Vue.set(state, 'userInfo', resp.data["newUserInfo"]);
            params["successCallback"]();
        }, resp => {
            params["errorCallback"](resp.data["errMsg"]);
        }, resp => {
            params["networkError"]();
        })
    },

    beginUpdatePhone({ commit }, params) {
        userApi.updatePhone(state.userInfo.userId, params["phone"], state.token, resp => {
            Vue.set(state, 'userInfo', resp.data["newUserInfo"]);
            params["successCallback"]();
        }, resp => {
            params["errorCallback"](resp.data["errMsg"]);
        }, resp => {
            params["networkError"]();
        })
    },

    beginUpdateEmail({ commit }, params) {
        userApi.updateEmail(state.userInfo.userId, params["email"], state.token, resp => {
            Vue.set(state, 'userInfo', resp.data["newUserInfo"]);
            params["successCallback"]();
        }, resp => {
            params["errorCallback"](resp.data["errMsg"]);
        }, resp => {
            params["networkError"]();
        })
    },

    beginUpdatePassword({ commit }, params) {
        userApi.updatePassword(state.userInfo.userId, params["oldPassword"], params["newPassword"],
            params["secondPassword"], state.token, resp => {
                params["successCallback"]();
            }, resp => {
                params["errorCallback"](resp.data["errMsg"]);
            }, resp => {
                params["networkError"]();
            })
    },

    /***********以上为个人信息相关*****/
    /***********以下为房屋相关*********/

    //设置当前房屋的信息
    viewUpdateHouseModel({ commit }, newHouseInfo) {
        commit('setCurrentHouseInfo', newHouseInfo);
    },

    //添加房屋
    addHouse ({ commit }, closeModel) {
        state.houseInfo["userName"] = state.userInfo.username;
        state.houseInfo["userId"] = state.userInfo.userId;
        houseApi.addHouseToServer(state.houseInfo, state.userInfo.userId, state.token, resp => {
            commit("addOneHouse", resp.data["house"]); //添加一个房屋信息
            closeModel(resp.data["serviceLinkList"]); //关闭添加房屋modal，并让用户选择添加服务
            state.houseInfo.houseName = "";
            state.houseInfo.address = "";
            state.houseInfo.communityName = "";
            state.houseInfo.note = "";
        }, resp => {})
    },

    //更新房屋信息
    updateHouse ({ commit }, closeModel) {
        houseApi.updateHouseToServer(state.currentHouseInfo, state.userInfo.userId, state.token, resp => {
            commit("updateOneHouse", resp.data["house"]); //更新房屋
            closeModel(); //关闭更新房屋modal
        }, resp => {})
    },

    //删除房屋
    removeHouse ({ commit }, closeModel) {
        houseApi.removeHouseFromServer(state.currentHouseInfo.houseId, state.userInfo.userId, state.token, resp => {
            commit("removeOneHouse", state.currentHouseInfo.houseId); //删除房屋
            closeModel(); //关闭删除房屋modal
        }, resp => {})
    },

    /***********以上为房屋相关*********/
    /***********以下为服务链接相关*********/

    //点击房屋后，通过这个方法来展示当前房屋的服务链接列表
    seeServiceLike ({ commit }, currentHouseNameArr) {
        if (currentHouseNameArr.length === 1) {
            let houseId = currentHouseNameArr[0];
            commit("setCurrentHouseId", houseId); //设置当前房屋ID，进而展示服务链接列表
        }
    },

    //添加房屋后，把本小区的服务列表展示出来，用户确认添加后，执行这个方法
    addAllServiceLink ({ commit }, serviceLink) {
        serviceLinkApi.addServiceLinkToServer(serviceLink, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("addOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
        }, resp => {});
    },

    //添加服务链接
    addServiceLink ({ commit }, param) {
        serviceLinkApi.addServiceLinkToServer(param["userPrivate"], state.serviceLinkInfo, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("addOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
            param["closeModel"]();
            state.serviceLinkInfo.title = "";
            state.serviceLinkInfo.link = "";
            state.serviceLinkInfo.categories = "";
            state.serviceLinkInfo.contact = "";
            state.serviceLinkInfo.phone = "";
            state.serviceLinkInfo.note = "";
        }, resp => {
            param["linkErrorCallBack"]();
        }, resp => {});
    },

    //删除服务链接
    removeServiceLink ({ commit }, param) {
        serviceLinkApi.removeServiceLinkFromServer(state.userInfo.userId, state.currentHouseId, param["link"], state.token, resp => {
            commit("removeOneServiceLink", {
                "houseId": state.currentHouseId,
                "link": param["link"]
            });
            param["closeModel"]();
        }, resp => {});
    },

    //点击更新按钮后，需要设置当前链接的信息
    setCurrentServiceLink({ commit }, serviceLinkInfo) {
        Vue.set(state,'currentServiceLinkInfo', serviceLinkInfo);
    },

    //更新服务链接信息
    updateServiceLink ({ commit }, param) {
        serviceLinkApi.updateServiceLinkToServer(state.currentServiceLinkInfo, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("updateOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
            param["closeModel"]();
        }, resp => {
            param["linkErrorCallBack"]();
        }, resp => {});
    },

    //搜索服务
    searchServiceLink ({ commit }, param) {
        serviceLinkApi.searchServiceLinkFromServer(param["type"], param["text"], state.userInfo.userId, state.token, resp => {
            param["callback"](resp.data["serviceLinkList"]);
        }, resp => {});
    },

    //解析address
    analysisAddress ({ commit }, text) {
        addressApi.analysisAddress(text, resp => {
            Vue.set(state, 'addressList', resp.data["predictions"]);
        }, resp => {})
    }
};

// mutations
const mutations = {

    //展示注册modal
    changeModalToRegister (state) {
        state.needLogin = false;
        state.needRegister = true
    },

    //展示登录modal
    changeModalToLogin (state) {
        state.needLogin = true;
        state.needRegister = false
    },

    //设置当前房屋信息
    setCurrentHouseInfo(state, newHouseInfo) {
        Vue.set(state,'currentHouseInfo', newHouseInfo);
    },

    setCommonService (state, userInfo) {
        Vue.set(state,'userInfo', userInfo);
    },

    //从服务端获取数据后，设置用户信息，然后看情况来设置当前房屋ID
    setUserInfo (state, param) {
        let userInfo = param["userInfo"];
        let oldHouseId = param["oldHouseId"];
        Vue.set(state,'userInfo', userInfo);
        if (oldHouseId === "") {
            if (userInfo["houseList"].length !== 0) {
                Vue.set(state, 'currentHouseId', userInfo["houseList"][0]["houseId"])
            }
        } else {
            Vue.set(state, 'currentHouseId', oldHouseId)
        }
    },

    //添加房屋信息，设置URL
    addOneHouse (state, houseInfo) {
        state.userInfo.houseList.push(houseInfo);
        router.push("/?house=" + houseInfo.houseId);
        Vue.set(state, 'currentHouseId', houseInfo.houseId);
    },

    updateOneHouse (state, newHouseInfo) {},

    //删除房屋信息
    removeOneHouse (state, houseId) {
        let index = -1;
        for (let i = 0; i < state.userInfo.houseList.length; i++) {
            if (houseId === state.userInfo.houseList[i].houseId) {
                index = i;
                break;
            }
        }
        state.userInfo.houseList.splice(index, 1);
    },

    //设置当前房屋ID
    setCurrentHouseId (state, houseId) {
        router.push("/?house=" + houseId);
        Vue.set(state, 'currentHouseId', houseId);
    },

    //添加服务链接
    addOneServiceLink (state, param) {
        let houseId = param["houseId"];
        let serviceLink = param["serviceLink"];
        let currentHouse;
        for (let i = 0; i < state.userInfo.houseList.length; i++) {
            let house = state.userInfo.houseList[i];
            if (houseId === house.houseId) {
                currentHouse = house
            }
        }
        currentHouse.serviceLinkList.push(serviceLink)
    },

    //删除服务链接
    removeOneServiceLink (state, param) {
        let houseId = param["houseId"];
        let link = param["link"];
        let house;
        for (let i = 0; i < state.userInfo.houseList.length; i++) {
            if (houseId === state.userInfo.houseList[i].houseId) {
                house = state.userInfo.houseList[i];
                break;
            }
        }
        let index = -1;
        for (let i = 0; i < house.serviceLinkList.length; i++) {
            if (link === house.serviceLinkList[i].link) {
                index = i;
                break;
            }
        }
        house.serviceLinkList.splice(index, 1);
    },

    //更新服务链接
    updateOneServiceLink (state, param) {
        let houseId = param["houseId"];
        let serviceLink = param["serviceLink"];
        let house;
        for (let i = 0; i < state.userInfo.houseList.length; i++) {
            if (houseId === state.userInfo.houseList[i].houseId) {
                house = state.userInfo.houseList[i];
                break;
            }
        }
        let index = -1;
        for (let i = 0; i < house.serviceLinkList.length; i++) {
            if (serviceLink.link === house.serviceLinkList[i].link) {
                index = i;
                break;
            }
        }
        house.serviceLinkList[index].title = serviceLink.title;
        house.serviceLinkList[index].image = serviceLink.image;
        house.serviceLinkList[index].link = serviceLink.link;
        house.serviceLinkList[index].categories = serviceLink.categories;
        house.serviceLinkList[index].contact = serviceLink.contact;
        house.serviceLinkList[index].phone = serviceLink.phone;
        house.serviceLinkList[index].note = serviceLink.note;
        Vue.set(state, "house.serviceLinkList", house.serviceLinkList);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}