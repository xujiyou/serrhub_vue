import authApi from '../../api/authApi'
import userApi from '../../api/userApi'
import houseApi from '../../api/houseApi'
import serviceLinkApi from '../../api/serviceLinkApi'
import Vue from 'vue'
import router from '../../router/index'

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
        secondPassword: "",
        houseName: "",
        address: "",
        communityName: ""
    },
    userInfo: {
        houseList:  [{serviceLinkList: [{categories: ""}]}]
    },
    defaultUserInfo: {
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
                    title: "PG&E",
                    image: "https://www.pge.com/pge_global/local/images/data/en-us/home/wildfire-veg-management.jpg",
                    link: "https://pge.com",
                    categories: "Utilities",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Power",
                    image: "https://power-electronics.com/wp-content/uploads/2019/05/Ballarat-Energy-Storage-System-DJI_0010.jpg",
                    link: "https://power-electronics.com",
                    categories: "Utilities",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Tesla Solar",
                    image: "https://www.tesla.com/tesla_theme/assets/img/solar/panels/section-hero@2x.jpg?20180104",
                    link: "https://www.tesla.com/solarpanels",
                    categories: "Solar",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "SunPower",
                    image: "https://us.sunpower.com/sites/default/files/styles/background_image/public/d7optimize-hp-header-panels-2_0.jpg?itok=mLcGkV0A",
                    link: "https://us.sunpower.com/",
                    categories: "Solar",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Solar Energy",
                    image: "https://solarenergy.com/i/market-bg.jpg",
                    link: "https://solarenergy.com/",
                    categories: "Solar",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Bay area Water",
                    image: "http://bawsca.org/sliderimages/mov.jpg",
                    link: "http://bawsca.org/",
                    categories: "Water Supply",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "San Jose Water",
                    image: "https://www.sjwater.com/sites/default/files/styles/tout/public/2019-07/06-2019_SJW_Blog-HistoryOfPipes_Blog.jpg?itok=Ay-kZ4uf",
                    link: "https://www.sjwater.com/",
                    categories: "Water Supply",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Alameda County Water",
                    image: "https://www.futuristarchitecture.com/wp-content/uploads/2018/02/Ring-Rail-Line-1.jpg",
                    link: "https://www.acwd.org/",
                    categories: "Water Supply",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "California Water Service",
                    image: "https://www.calwater.com/wp-content/uploads/2019/07/2019-0711-ela-well1-400x200.jpg",
                    link: "https://www.calwater.com/",
                    categories: "Water Supply",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Bayservice",
                    image: "http://www.bayservice.net/data/siteimages/bayarea-bg.jpg",
                    link: "http://www.bayservice.net/",
                    categories: "HOA",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "HOA service",
                    image: "https://img.pconline.com.cn/images/upload/upc/tx/housephotolib/1804/13/c0/82516889_1523586577874_690x460.jpg",
                    link: "https://www.hoaservices.net/default.php",
                    categories: "HOA",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "zillow",
                    image: "https://s.zillowstatic.com/homepage/static/_Desktop_overlay.jpg",
                    link: "https://www.zillow.com/",
                    categories: "Real Estate Website",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "redfin",
                    image: "https://ssl.cdn-redfin.com/v271.4.0/images/homepage/banners/genHomepageDesktopBanner/SunnyVideo_Homepage.jpg",
                    link: "https://www.redfin.com/",
                    categories: "Real Estate Website",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Avalon",
                    image: "https://www.avaloncommunities.com/~/media/Images/Brand%20Photos/Home%20Photos/Avalon_Burbank_Pool_1440x720.jpg?w=1440&h=463",
                    link: "https://www.avaloncommunities.com/",
                    categories: "Apartment",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }, {
                    serviceLinkId: "",
                    title: "Equity Aprtment(",
                    image: "https://media.equityapartments.com/image/upload/q_70/f_auto/fl_lossy/v1/Content/home-hero-2",
                    link: "https://www.equityapartments.com/",
                    categories: "Apartment",
                    note: "",
                    contact: "",
                    phone: "",
                    createDate: "2019-07-23 15:10"
                }
            ]
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
    }
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
    logout ({ commit }) {
        let storage = window.localStorage;
        storage.token = "";
        state.userInfo = state.defaultUserInfo;
        state.currentHouseId = "";
    },
    setDefaultUserInfo ({ commit }) {
        state.userInfo = state.defaultUserInfo;
    },
    setNeedLogin ({ commit }, visible) {
        state.needLogin = visible;
    },
    setNeedRegister ({ commit }, visible) {
        state.needRegister = visible;
    },
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
            commit("setUserInfo", {"userInfo": resp.data["userInfo"], "oldHouseId": ""});
        }, resp => {
           // alert("");
        })
    },
    register ({ commit }) {
        let info = state.registerInfo;
        if (info.firstName === "" || info.lastName === "" || info.phone === "" || info.email === "" ||
            info.password === "") {
            alert("Please complete the necessary information");
            return;
        }
        if (info.password !== info.secondPassword) {
            alert("Sorry, the password entered twice is inconsistent");
            return;
        }
        authApi.register(state.registerInfo, resp => {
            state.userInfo = resp.data["userInfo"];
            state.needRegister = false;

            state.loginInfo.phoneOrEmail = state.registerInfo.phone;
            state.loginInfo.password = state.registerInfo.password;
            actions.login({commit});
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
    findUserInfo({ commit }, oldHouseId) {
        console.log("oldHouseId: " + oldHouseId);
        userApi.findUserInfoThroughToken(state.token, resp => {
            commit("setUserInfo", {"userInfo": resp.data, "oldHouseId": oldHouseId});
        }, resp => {
            actions.viewLoginModal({ commit });
        })
    },
    addHouse ({ commit }, closeModel) {
        houseApi.addHouseToServer(state.houseInfo, state.userInfo.userId, state.token, resp => {
            commit("addOneHouse", resp.data["house"]);
            console.log("resp.data:" + resp.data["serviceLinkList"]);
            closeModel(resp.data["serviceLinkList"]);
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
            let houseId = currentHouseNameArr[0];
            commit("setCurrentHouseId", houseId);
        }
    },
    addAllServiceLink ({ commit }, serviceLink) {
        serviceLinkApi.addServiceLinkToServer(serviceLink, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("addOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
        }, resp => {});
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
            param["callback"](resp.data["serviceLinkList"]);
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
    setUserInfo (state, param) {
        let userInfo = param["userInfo"];
        let oldHouseId = param["oldHouseId"];
        Vue.set(state,'userInfo', userInfo);
        if (oldHouseId === "") {
            Vue.set(state, 'currentHouseId', userInfo["houseList"][0]["houseId"])
        } else {
            Vue.set(state, 'currentHouseId', oldHouseId)
        }
    },
    addOneHouse (state, houseInfo) {
        state.userInfo.houseList.push(houseInfo);
        router.push("/?house=" + houseInfo.houseId);
        Vue.set(state, 'currentHouseId', houseInfo.houseId);
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
        router.push("/?house=" + houseId);
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