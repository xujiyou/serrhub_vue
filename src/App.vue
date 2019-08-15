<template>
    <div id="app">
        <Header></Header>
        <Search id="search"></Search>
        <Row>
            <!-- 左侧房屋列表 -->
            <Col span="4"><MyHouse></MyHouse></Col>
            <Col span="16"><router-view></router-view></Col>
        </Row>
        <Footer id="footerDiv"></Footer>

        <!-- 登录Modal，上下居中，宽度未400px，在显示和隐藏时都会触发 changeLoginModelVisible -->
        <Modal
                title="Login"
                v-model="needLogin"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                width="400"
                @on-visible-change="changeLoginModelVisible"
                :mask-closable="false">
            <!-- modal标题-->
            <p slot="header" style="text-align: center">
              <span>Login</span>
            </p>
            <!-- 表单 -->
            <div style="width: 260px;margin-left:auto;margin-right: auto;">
                <div style="padding-bottom: 16px">
                    <b>Login with your email or phone number.</b>
                </div>
                <Form>

                    <div v-if="loginError" style="color: red">
                        Username or password is incorrect, please check it.
                    </div>
                    <div v-if="checkError" style="color: red">
                        Please complete the necessary information.
                    </div>
                    <div v-if="formatError" style="color: red">
                        Please fill in the correct email or mobile number.
                    </div>

                    <!-- Phone or email -->
                    <FormItem prop="Phone or email" class="formItem">
                        <Input type="text" size="large" placeholder="Phone or email" v-model="loginInfo.phoneOrEmail">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <br/>

                    <!-- Password -->
                    <FormItem prop="password" class="formItem">
                        <label>
                            <Input type="password" size="large" placeholder="Password" v-model="loginInfo.password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </label>
                    </FormItem>
                    <br/>

                    <!-- 操作选项 -->
                    <FormItem prop="interest" class="formItem">
                        <CheckboxGroup>
                            <!-- Remember me -->
                            <Checkbox label="Remember me" v-model="rememberMe"></Checkbox>
                            <!-- 按钮，用于从登录modal切换到注册modal，向左浮动-->
                            <Button size="small" type="text" style="float: right; margin-top: 4px"
                                onMouseOut="this.style.color='#515A61'"
                                onMouseOver="this.style.color='#17b5d2'" @click="viewRegisterModal">Register now</Button>
                        </CheckboxGroup>
                    </FormItem>
                    <br/>

                    <!-- 登录按钮，登录时执行login方法 -->
                    <FormItem class="formItem">
                        <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large" @click="wantLogin">LOGIN</Button>
                    </FormItem>

                </Form>
            </div>

            <!-- Modal底部，暂未实现 -->
            <div slot="footer" style=" text-align: center">
                <div style="width: 260px;margin-left:auto;margin-right: auto;">
                    <br/>&nbsp;
                    <Button size="large" long type="primary" style="border: 0;text-align: left; background-color: #EF2A2A">
                        <span style="width: 30px; "><Icon type="logo-googleplus" style="color: #fff"></Icon></span>
                        <span style="width: 210px; text-align: center;padding-right: 60px">GOOGLE</span>
                    </Button>
                    <br/><br/>
                </div>
            </div>
        </Modal>

        <!-- 注册Modal，显示和隐藏时都会触发changeRegisterModelVisible -->
        <Modal
              title="Register"
              v-model="needRegister"
              class-name="vertical-center-modal"
              :styles="{top: '0px'}"
              width="480"
              @on-visible-change="changeRegisterModelVisible"
              :mask-closable="false">
        <p slot="header">
            <!-- 按钮，用于从注册modal切换到登录modal-->
            <Button size="small" type="text" icon="ios-arrow-back"
                onMouseOut="this.style.color='#515A61'"
                onMouseOver="this.style.color='#17b5d2'" @click="viewLoginModal"></Button>
            <span>Register</span>
        </p>

        <div style="width: 440px;margin: auto;text-align: center">
            <!-- First Name And Last Name，显示在一行 -->
            <Form inline>
                <FormItem :required="true">
                    <label>
                        <Input placeholder="First Name *" v-model="registerInfo.firstName"></Input>
                    </label>
                </FormItem>
                <FormItem :required="true">
                    <label>
                        <Input placeholder="Last Name *" v-model="registerInfo.lastName"></Input>
                    </label>
                </FormItem>
            </Form>
            <!-- 362和68是精心调的，用于和上面的行对其 -->
            <div style="width: 362px; text-align: center">
                <Form :label-width="68">

                    <div v-if="registerPhoneFormatError" style="color: red; text-align: left; padding-left: 70px; padding-bottom: 10px;">
                        Please fill in the correct mobile number.
                    </div>
                    <div v-if="registerPhoneExistError" style="color: red; text-align: left; padding-left: 70px; padding-bottom: 10px;">
                        Phone exists, please use another phone.
                    </div>
                    <FormItem :required="true">
                        <label>
                            <Input placeholder="Phone *" v-model="registerInfo.phone"></Input>
                        </label>
                    </FormItem>

                    <div v-if="registerEmailFormatError" style="color: red; text-align: left; padding-left: 70px; padding-bottom: 10px;">
                        Please fill in the correct email.
                    </div>
                    <div v-if="registerEmailExistError" style="color: red; text-align: left; padding-left: 70px; padding-bottom: 10px;">
                        Email exists, please use another email address.
                    </div>
                    <FormItem :required="true">
                        <label>
                            <Input placeholder="Email *" v-model="registerInfo.email"></Input>
                        </label>
                    </FormItem>

                    <FormItem prop="password">
                        <label>
                            <Input type="password" placeholder="Password *"  v-model="registerInfo.password"></Input>
                        </label>
                    </FormItem>
                    <FormItem prop="password">
                        <label>
                            <Input type="password" placeholder="Confirm password *"  v-model="registerInfo.secondPassword"></Input>
                        </label>
                    </FormItem>

                    <!-- 分割线 -->
                    <Divider orientation="left" size="small" :dashed="true" style="margin-left: 68px; padding-right: 68px; margin-bottom: 20px">
                        <!-- 按钮，用于展示或隐藏额外选项 -->
                        <Button type="text" size="small"
                                style="margin-left: 2px"
                                onMouseOut="this.style.color='#2c3e50'"
                                onMouseOver="this.style.color='#17b5d2'"
                                @click="showExcessOption = !showExcessOption">
                            Add my home now
                            <Icon :type="showExcessOption ? 'ios-arrow-down' : 'ios-arrow-forward'" />
                        </Button>
                    </Divider>

                    <!-- 额外选项 -->
                    <div v-if="showExcessOption">
                        <FormItem>
                            <label>
                                <Input placeholder="House name" v-model="registerInfo.houseName"></Input>
                            </label>
                        </FormItem>
                        <FormItem style="text-align: left">
                            <AutoComplete
                                v-model="registerInfo.address"
                                :data="addressList"
                                @on-search="handleSearch"
                                placeholder="Address"></AutoComplete>
                        </FormItem>
                        <FormItem>
                            <label>
                                <Input placeholder="Community name" v-model="registerInfo.communityName"></Input>
                            </label>
                        </FormItem>
                    </div>

                    <!-- 是否同于用户协议，未勾选时点注册会变为红色，勾选后变为默认颜色 -->
                    <FormItem style="color: darkgray">
                        <Checkbox v-model="agree" style="line-height: 1.3" v-bind:class="{checkboxError: isError}" @on-change="isError = false">
                          &nbsp;&nbsp;By clicking on "Sign up", you agree to the Serrhub Terms & Conditions and Privacy Policy
                        </Checkbox>
                    </FormItem>

                    <div class="g-recaptcha" style="margin-left: 68px"
                       data-callback="robotVerified" data-sitekey="6LcEbbIUAAAAAItVqd7Iw1Ez988azFA6J2VdutRg"></div>
                </Form>
              </div>
          </div>
          <div slot="footer" style="text-align: center; margin-left: 68px; margin-right: 68px">
              <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large"
                  :loading="loadingSignUp" @click="wantRegister">SIGN UP</Button>
          </div>
      </Modal>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Search from './components/Search.vue'
    import MyHouse from './components/MyHouse.vue'
    import ServiceLinkList from './components/ServiceLinkList.vue'
    import Footer from './components/Footer.vue'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'app',
        data () {
            return {
                checkError: false,
                loginError: false,
                formatError: false,
                rememberMe: false,
                registerPhoneFormatError: false,
                registerEmailFormatError: false,
                registerPhoneExistError: false,
                registerEmailExistError: false,
                showExcessOption: false, //注册时，是否显示额外的选项
                agree: false, //是否同意用户协议
                isError: false, //用户协议是否是红色的
                loadingSignUp: false
            }
        },

        components: {
            Header,
            Search,
            MyHouse,
            ServiceLinkList,
            Footer
        },

        mounted: function () {
            this.setDefaultUserInfo(this); //先设置公共数据，让未登录界面友好显示
            this.findTokenFromLocalStorage(this); //从缓存中获取token
            if (this.token === undefined || this.token === "") {
                //this.viewLoginModal(this)
            } else {
                //如果缓存中有token，直接根据token去服务端获取用户信息
                let house = this.$route.query.house;
                if (house === undefined || house === null || house === "") {
                    //如果URL中的house为空,传递空字符串
                    this.findUserInfo("");
                } else {
                    //如果URL中的house为不为空，则要显示URL中的House的服务列表
                    this.findUserInfo(this.$route.query.house);
                }
            }

            let storage = window.localStorage;
            this.loginInfo.phoneOrEmail = storage.phoneOrEmail || "";
            this.loginInfo.password = storage.password || "";
            if (this.loginInfo.phoneOrEmail !== "" && this.loginInfo.password !== "") {
                this.rememberMe = true;
            }
        },

        computed: mapState({
            token: state => state.user.token,
            registerInfo: state => state.user.registerInfo, //注册信息
            loginInfo: state => state.user.loginInfo, //登录信息
            needLogin: state => state.user.needLogin,
            needRegister: state => state.user.needRegister,
            addressList: state => state.user.addressList,
        }),

        methods: {
            ...mapActions('user', [
                'setDefaultUserInfo', //设置默认的用户信息，用于展示一些公共数据
                'findTokenFromLocalStorage', //从缓存中找出token
                'login', //登录
                'viewLoginModal', //显示登录modal
                'viewRegisterModal', //显示注册modal
                'register', //注册
                'findUserInfo', //获取用户信息
                'setNeedLogin',//设置登录Modal的显示和隐藏
                'setNeedRegister', //设置注册Modal的显示和隐藏
                'analysisAddress' //地址解析
            ]),

            //处理地址解析
            handleSearch (value) {
                if (value !== "" && this.addressList.indexOf(value) === -1) {
                    this.analysisAddress(value);
                }
            },

            wantLogin () {
                this.loginError = false;
                this.checkError = false;
                this.formatError = false;
                if (!this.telephoneCheck(this.loginInfo.phoneOrEmail) && !this.emailCheck(this.loginInfo.phoneOrEmail)) {
                    this.formatError = true;
                    this.$Message.error('Please fill in the correct email or mobile number.');
                    return;
                }
                this.login({
                    "checkInput": () => {
                        this.checkError = true;
                        this.$Message.error('Please complete the necessary information.')
                    },
                    "loginError": () => {
                        this.loginError = true;
                        this.$Message.error('Username or password is incorrect, please check it.')
                    },
                    "loginSuccess": () => {
                        if (this.rememberMe === true) {
                            let storage = window.localStorage;
                            storage.phoneOrEmail = this.loginInfo.phoneOrEmail;
                            storage.password = this.loginInfo.password;
                        }
                        this.$Message.success('Login Success')
                    }
                })
            },

            //必须勾选同意协议，不然就将文字设置为红色以提示
            wantRegister () {
                //检查必要信息
                let info = this.registerInfo;
                if (info.firstName === "" || info.lastName === "" || info.phone === "" || info.email === "" || info.password === "") {
                    this.$Message.error("Please complete the necessary information");
                    return;
                }
                if (info.password !== info.secondPassword) {
                    this.$Message.error("Sorry, the password entered twice is inconsistent");
                    return;
                }
                this.registerPhoneFormatError = false;
                this.registerEmailFormatError = false;
                this.registerPhoneExistError = false;
                this.registerEmailExistError = false;
                if (!this.telephoneCheck(this.registerInfo.phone)) {
                    this.registerPhoneFormatError = true;
                    this.$Message.error('Please fill in the correct mobile number.');
                    return;
                }
                if (!this.emailCheck(this.registerInfo.email)) {
                    this.registerEmailFormatError = true;
                    this.$Message.error('Please fill in the correct email.');
                    return;
                }
                if (this.agree) {
                    this.loadingSignUp = true;
                    this.register({
                        "closeModal": () => {
                            this.loadingSignUp = false;
                            this.$Message.success('Register Success');
                        },
                        "phoneExistError": () => {
                            this.loadingSignUp = false;
                            this.registerPhoneExistError = true;
                            this.$Message.error('Phone exists, please use another phone');
                        },
                        "emailExistError": () => {
                            this.loadingSignUp = false;
                            this.registerEmailExistError = true;
                            this.$Message.error('Email exists, please use another email address');
                        },
                        errorCallback: () => {
                            this.loadingSignUp = false;
                            this.$Message.error('Network error, please try again.');
                        }
                    });
                } else {
                    this.$Message.error('you need to agree the Serrhub Terms & Conditions and Privacy Policy');
                    this.isError = true
                }
            },

            telephoneCheck (str) {
                return true;
                // let matchStr = /^(((1(\s|))|)\([1-9]{3}\)(\s|-|)[1-9]{3}(\s|-|)[1-9]{4})$/;
                // let matchStr2 = /^(((1(\s)|)|)[1-9]{3}(\s|-|)[1-9]{3}(\s|-|)[1-9]{4})$/;
                // return (str.match(matchStr) != null||str.match(matchStr2)!=null);
            },

            emailCheck (str) {
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                return str.match(reg) != null
            },

            //由于 computed 中的属性没有setter方法，所以这里手写个两个setter方法，在modal消失时触发
            changeLoginModelVisible (visible) {
                this.setNeedLogin(visible);
            },

            changeRegisterModelVisible (visible) {
                this.setNeedRegister(visible);
            },

            robotVerified () {
                console.log("不是机器人");

            },
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-width: 1300px;
        background-color: white;
    }

    /*搜索框向上移动30个像素*/
    #search {
      position: relative;
      top: -30px;
    }

    /*用于modal竖向居中*/
    .vertical-center-modal{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .formItem {
      padding: 0;
      margin: 0;
      line-height: 100%;
    }

    /*复选框样式*/
    .ivu-checkbox-checked:hover .ivu-checkbox-inner {
      border-color: #2d8cf0;
      border-top-color: rgb(45, 140, 240);
      border-right-color: rgb(45, 140, 240);
      border-bottom-color: rgb(45, 140, 240);
      border-left-color: rgb(45, 140, 240);
      background-color: #17b5d2;
    }

    span {
      display:-moz-inline-box;
      display:inline-block;
    }

    /*footer固定在底部*/
    #footerDiv{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
    }

    /*在未勾选同意协议时生效*/
    .checkboxError {
        color: red;
    }
</style>
