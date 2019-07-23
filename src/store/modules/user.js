import authApi from '../../api/authApi'
import userApi from '../../api/userApi'
import houseApi from '../../api/houseApi'
import serviceLinkApi from '../../api/serviceLinkApi'
import Vue from 'vue'

// initial state
const state = {
    needLogin: false,
    needRegister: false,
    token: "",
    currentHouseId: "",
    loginInfo: {
        phoneOrEmail: "",
        password: ""
    },
    registerInfo: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        houseName: "",
        address: "",
        communityName: ""
    },
    userInfo: {
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
        houseList: [{
            houseId: "",
            houseName: "",
            mainResident: true,
            address: "",
            communityName: "",
            startYear: "",
            note: "",
            serviceLinkList: [{
                serviceLinkId: "",
                title: "",
                image: "",
                link: "",
                categories: "",
                note: "",
                contact: "",
                phone: "",
                createDate: ""
            }]
        }]
    },
    houseInfo: {
        houseName: "",
        address: "",
        communityName: "",
        note: ""
    },
    currentHouseInfo: {
        houseId: "",
        houseName: "",
        address: "",
        communityName: "",
        note: ""
    },
    serviceLinkInfo: {
        serviceLinkId: "",
        title: "",
        image: "",
        link: "",
        categories: "",
        contact: "",
        phone: "",
        note: ""
    },
    currentServiceLinkInfo: {
        serviceLinkId: "",
        title: "",
        image: "",
        link: "",
        categories: "",
        contact: "",
        phone: "",
        note: "",
    },
    searchServiceLinkResult: []
};

// getters
const getters = {
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
        console.log(map);
        return map;
    },
};

// actions
const actions = {
    findTokenFromLocalStorage({ commit }) {
        let storage = window.localStorage;
        state.token = storage.token;
        console.log("从缓存中获取token: " + state.token)
    },
    login ({ commit }) {
        if (state.loginInfo.phoneOrEmail === "" || state.loginInfo.password === "") {
            alert("Please complete the necessary information");
            return;
        }
        authApi.login(state.loginInfo, resp => {
            state.token = resp.data["token"];
            state.needLogin = false;
            let storage = window.localStorage;
            storage.token = state.token;
            commit("setUserInfo", resp.data["userInfo"]);
        }, resp => {
           // alert("");
        })
    },
    register ({ commit }) {
        let info = state.registerInfo;
        if (info.firstName === "" || info.lastName === "" || info.phone === "" || info.email === "" ||
            info.password === "" || info.address === "" || info.communityName === "") {
            alert("Please complete the necessary information");
            return;
        }
        authApi.register(state.registerInfo, resp => {
            state.userInfo = resp.data["userInfo"];
            state.needRegister = false;

            state.loginInfo.phoneOrEmail = state.registerInfo.phone;
            state.loginInfo.password = state.registerInfo.password;
            authApi.login(state.loginInfo, resp => {
                state.token = resp.data["token"];
                state.needLogin = false;
                let storage = window.localStorage;
                storage.token = state.token;
                commit("setUserInfo", resp.data["userInfo"]);
            }, resp => {})
        }, resp => {
           alert("Sorry, registration failed, please try again later.")
        })
    },
    viewRegisterModal ({ commit }) {
        commit('changeModalToRegister');
    },
    viewLoginModal ({ commit }) {
        commit('changeModalToLogin');
    },
    viewUpdateHouseModel({ commit }, newHouseInfo) {
        commit('changeModalToUpdateHouse', newHouseInfo);
    },
    findUserInfo({ commit }) {
        let that = this;
        userApi.findUserInfoThroughToken(state.token, resp => {
            commit("setUserInfo", resp.data);
        }, resp => {
            actions.viewLoginModal({ commit });
        })
    },
    addHouse ({ commit }, closeModel) {
        houseApi.addHouseToServer(state.houseInfo, state.userInfo.userId, state.token, resp => {
            commit("addOneHouse", resp.data["house"]);
            closeModel();
        }, resp => {})
    },
    updateHouse ({ commit }, closeModel) {
        houseApi.updateHouseToServer(state.currentHouseInfo, state.userInfo.userId, state.token, resp => {
            commit("updateOneHouse", resp.data["house"]);
            closeModel();
        }, resp => {})
    },
    removeHouse ({ commit }, closeModel) {
        houseApi.removeHouseFromServer(state.currentHouseInfo.houseId, state.userInfo.userId, state.token, resp => {
            commit("removeOneHouse", state.currentHouseInfo.houseId);
            closeModel();
        }, resp => {})
    },
    seeServiceLike ({ commit }, currentHouseNameArr) {
        if (currentHouseNameArr.length === 1) {
            commit("setCurrentHouseId", currentHouseNameArr[0]);
        }
    },
    addServiceLink ({ commit }, closeModel) {
        serviceLinkApi.addServiceLinkToServer(state.serviceLinkInfo, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("addOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
            closeModel();
        }, resp => {});
    },
    removeServiceLink ({ commit }, param) {
        serviceLinkApi.removeServiceLinkFromServer(state.userInfo.userId, state.currentHouseId, param["link"], state.token, resp => {
            commit("removeOneServiceLink", {
                "houseId": state.currentHouseId,
                "link": param["link"]
            });
            param["closeModel"]();
        }, resp => {});
    },
    viewUpdateServiceLinkModel({ commit }, serviceLinkInfo) {
        Vue.set(state,'currentServiceLinkInfo', serviceLinkInfo);
    },
    updateServiceLink ({ commit }, closeModel) {
        serviceLinkApi.updateServiceLinkToServer(state.currentServiceLinkInfo, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("updateOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
            closeModel();
        }, resp => {});
    },
    searchServiceLink ({ commit }, param) {
        serviceLinkApi.searchServiceLinkFromServer(param["type"], param["text"], state.userInfo.userId, state.token, resp => {
            state.searchServiceLinkResult = resp.data["serviceLinkList"];
            console.log(state.searchServiceLinkResult);
            param["callback"]();
        }, resp => {});
    },
};

// mutations
const mutations = {
    changeModalToRegister (state) {
        state.needLogin = false;
        state.needRegister = true
    },
    changeModalToLogin (state) {
        state.needLogin = true;
        state.needRegister = false
    },
    changeModalToUpdateHouse(state, newHouseInfo) {
        Vue.set(state,'currentHouseInfo', newHouseInfo);
    },
    setUserInfo (state, userInfo) {
        Vue.set(state,'userInfo', userInfo);
        Vue.set(state, 'currentHouseId', userInfo["houseList"][0]["houseId"])
    },
    addOneHouse (state, houseInfo) {
        state.userInfo.houseList.push(houseInfo);
    },
    updateOneHouse (state, newHouseInfo) {
        // let index = -1;
        // for (let i = 0; i < state.userInfo.houseList.length; i++) {
        //     if (newHouseInfo["houseId"] === state.userInfo.houseList[i].houseId) {
        //         index = i
        //     }
        // }
        // state.userInfo.houseList.splice(index, 1);
        // state.userInfo.houseList.push(newHouseInfo)
    },
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
    setCurrentHouseId (state, houseId) {
        Vue.set(state, 'currentHouseId', houseId);
        console.log(state.currentHouseId);
    },
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
        console.log(serviceLink);
        currentHouse.serviceLinkList.push(serviceLink)
    },
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