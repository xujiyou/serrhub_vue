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
        communityName: ""
    },
    userInfo: { //初始的用户信息，为了避免报错，这个信息在运行时很快就会被替换掉
        userId: "",
        houseList:  [{serviceLinkList: [{categories: ""}]}]
    },
    defaultUserInfo: { //默认的用户信息，用于展示一些公共的信息
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
    houseInfo: { //添加房屋时需要用到的信息
        houseName: "",
        address: "",
        communityName: "",
        note: ""
    },
    currentHouseInfo: { //当前需要删除和修改的房屋信息
        houseId: "",
        houseName: "",
        address: "",
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
        state.userInfo = state.defaultUserInfo;
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
    login ({ commit }) {
        //必要信息不能为空
        if (state.loginInfo.phoneOrEmail === "" || state.loginInfo.password === "") {
            alert("Please complete the necessary information");
            return;
        }
        authApi.login(state.loginInfo, resp => {
            //成功后，设置token，隐藏登录model，设置用户信息，初次登录后，是没有老的houseId的
            state.token = resp.data["token"];
            let storage = window.localStorage;
            storage.token = state.token;
            state.needLogin = false;
            commit("setUserInfo", {"userInfo": resp.data["userInfo"], "oldHouseId": ""});
        }, resp => {
           // alert("");
        })
    },
    //注册
    register ({ commit }) {
        //检查必要信息
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
            state.needRegister = false; //隐藏注册modal
            //设置信息，进行登录
            state.loginInfo.phoneOrEmail = state.registerInfo.phone;
            state.loginInfo.password = state.registerInfo.password;
            actions.login({commit});
        }, resp => {
           alert("Sorry, registration failed, please try again later.")
        })
    },
    //注销，将缓存中的token设为空，将用户信息设为默认，将当前房屋ID设为空字串
    logout ({ commit }) {
        let storage = window.localStorage;
        storage.token = "";
        state.userInfo = state.defaultUserInfo;
        state.currentHouseId = "";
    },
    //进入网页时执行，获取用户信息
    findUserInfo({ commit }, oldHouseId) {
        userApi.findUserInfoThroughToken(state.token, resp => {
            commit("setUserInfo", {"userInfo": resp.data, "oldHouseId": oldHouseId});
        }, resp => {
            actions.viewLoginModal({ commit });
        })
    },

    /***********以上为登录注册相关*********/
    /***********以下为房屋相关*********/

    //设置当前房屋的信息
    viewUpdateHouseModel({ commit }, newHouseInfo) {
        commit('setCurrentHouseInfo', newHouseInfo);
    },
    //添加房屋
    addHouse ({ commit }, closeModel) {
        houseApi.addHouseToServer(state.houseInfo, state.userInfo.userId, state.token, resp => {
            commit("addOneHouse", resp.data["house"]); //添加一个房屋信息
            closeModel(resp.data["serviceLinkList"]); //关闭添加房屋modal，并让用户选择添加服务
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
    addServiceLink ({ commit }, closeModel) {
        serviceLinkApi.addServiceLinkToServer(state.serviceLinkInfo, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("addOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
            closeModel();
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
    updateServiceLink ({ commit }, closeModel) {
        serviceLinkApi.updateServiceLinkToServer(state.currentServiceLinkInfo, state.userInfo.userId, state.currentHouseId, state.token, resp => {
            commit("updateOneServiceLink", {
                "houseId": state.currentHouseId,
                "serviceLink": resp.data["serviceLink"]
            });
            closeModel();
        }, resp => {});
    },
    //搜索服务
    searchServiceLink ({ commit }, param) {
        serviceLinkApi.searchServiceLinkFromServer(param["type"], param["text"], state.userInfo.userId, state.token, resp => {
            param["callback"](resp.data["serviceLinkList"]);
        }, resp => {});
    },
    analysisAddress ({ commit }, text) {
        addressApi.analysisAddress(text, resp => {
            let list = [];
            let predictions = resp.data["predictions"];
            for (let i = 0; i < predictions.length; i++) {
                list.push(predictions[i]["description"]);
            }
            Vue.set(state, 'addressList', list);
            console.log(state.addressList)
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
    //从服务端获取数据后，设置用户信息，然后看情况来设置当前房屋ID
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