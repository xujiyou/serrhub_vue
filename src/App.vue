<template>
    <div id="app">
        <!-- 头部，背景图，标题，副标题，四个操作按钮 -->
        <Header></Header>
        <!-- 搜索框，用于搜索服务连接 -->
        <Search id="search"></Search>
        <Row>
            <!-- 左侧房屋列表 -->
            <Col span="4"><MyHouse></MyHouse></Col>
            <!-- 右侧服务列表 -->
            <Col span="16"><router-view></router-view></Col>
        </Row>
        <!-- 底部 -->
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
            <div style="width: 240px;margin-left:auto;margin-right: auto;">
              <Form>
                  <!-- Phone or email -->
                <FormItem prop="Phone or email" class="formItem">
                  <Input type="text" size="large" placeholder="Phone or email" v-model="loginInfo.phoneOrEmail">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                  <br/>
                  <!-- Password -->
                <FormItem prop="password" class="formItem">
                  <Input type="password" size="large" placeholder="Password" v-model="loginInfo.password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                  <br/>
                  <!-- 操作选项 -->
                <FormItem prop="interest" class="formItem">
                  <CheckboxGroup>
                      <!-- Remember me -->
                    <Checkbox label="Remember me"></Checkbox>
                      <!-- 按钮，用于从登录modal切换到注册modal，向左浮动-->
                    <Button size="small" type="text" style="float: right; margin-top: 4px"
                            onMouseOut="this.style.color='#515A61'"
                            onMouseOver="this.style.color='#17b5d2'" @click="viewRegisterModal">Register now</Button>
                  </CheckboxGroup>
                </FormItem>
                  <br/>
                  <!-- 登录按钮，登录时执行login方法 -->
                <FormItem class="formItem">
                  <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large" @click="login">LOGIN</Button>
                </FormItem>

              </Form>
            </div>
            <!-- Modal底部，暂未实现 -->
            <div slot="footer" style=" text-align: center">
                <div style="width: 240px;margin-left:auto;margin-right: auto;">
                    <br/>
                    <Button  size="large" long type="primary" style="border: 0;text-align: left; background-color: #2D4585">
                      <span style="width: 30px; "><Icon type="logo-facebook" style="color: #fff"></Icon></span>
                      <span style="width: 210px; text-align: center;padding-right: 60px">FACEBOOK</span>
                    </Button>
                    <br/>&nbsp;
                    <Button  size="large" long type="primary" style="border: 0;text-align: left; background-color: #139BE8">
                      <span style="width: 30px; "><Icon type="logo-twitter" style="color: #fff"></Icon></span>
                      <span style="width: 210px; text-align: center;padding-right: 60px">TWITTER</span>
                    </Button>
                    <br/>&nbsp;
                    <Button  size="large" long type="primary" style="border: 0;text-align: left; background-color: #EF2A2A">
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
            <!-- 标题-->
          <span>Register</span>

        </p>
        <div style="width: 440px;margin: auto;text-align: center">
            <!-- First Name And Last Name，显示在一行 -->
            <Form inline>
                <FormItem :required="true">
                    <Input placeholder="First Name *" v-model="registerInfo.firstName"></Input>
                </FormItem>
                <FormItem :required="true">
                    <Input placeholder="Last Name *" v-model="registerInfo.lastName"></Input>
                </FormItem>
            </Form>
            <!-- 362和68是精心调的，用于和上面的行对其 -->
            <div style="width: 362px; text-align: center">
                  <Form :label-width="68">
                      <FormItem :required="true">
                          <Input placeholder="Phone *" v-model="registerInfo.phone"></Input>
                      </FormItem>
                      <FormItem :required="true">
                          <Input placeholder="Email *" v-model="registerInfo.email"></Input>
                      </FormItem>
                      <FormItem prop="password">
                          <Input type="password" placeholder="Password *"  v-model="registerInfo.password"></Input>
                      </FormItem>
                      <FormItem prop="password">
                          <Input type="password" placeholder="Confirm password *"  v-model="registerInfo.secondPassword"></Input>
                      </FormItem>
                      <!-- 分割线 -->
                      <Divider orientation="left" size="small" :dashed="true" style="margin-left: 68px; padding-right: 68px; margin-bottom: 20px">
                          <!-- 按钮，用于展示或隐藏额外选项 -->
                          <Button type="text" size="small"
                                  style="margin-left: 2px"
                                  onMouseOut="this.style.color='#2c3e50'"
                                  onMouseOver="this.style.color='#17b5d2'"
                                  @click="showExcessOption = !showExcessOption">
                              more option
                              <Icon :type="showExcessOption ? 'ios-arrow-down' : 'ios-arrow-forward'" />
                          </Button>
                      </Divider>
                      <!-- 额外选项 -->
                      <div v-if="showExcessOption">
                          <FormItem>
                              <Input placeholder="House name" v-model="registerInfo.houseName"></Input>
                          </FormItem>
                          <FormItem>
                              <Input placeholder="Address" v-model="registerInfo.address"></Input>
                          </FormItem>
                          <FormItem>
                              <Input placeholder="Community name" v-model="registerInfo.communityName"></Input>
                          </FormItem>
                      </div>
                      <!-- 是否同于用户协议，未勾选时点注册会变为红色，勾选后变为默认颜色 -->
                      <FormItem style="color: darkgray">
                          <Checkbox v-model="agree" style="line-height: 1.3" v-bind:class="{checkboxError: isError}" @on-change="isError = false">
                              &nbsp;&nbsp;By clicking on "Sign up", you agree to the Serrhub Terms & Conditions and Privacy Policy
                          </Checkbox>
                      </FormItem>
                      <!-- 注册按钮，注册时执行 wantRegister 方法 -->
                      <FormItem>
                          <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large" @click="wantRegister">SIGN UP</Button>
                      </FormItem>
                  </Form>
              </div>
          </div>
          <div slot="footer" style="text-align: center">
              <!-- 按钮，用于从注册modal切换到登录modal-->
            <Button size="small" type="text" icon="ios-arrow-back"
                    onMouseOut="this.style.color='#515A61'"
                    onMouseOver="this.style.color='#17b5d2'"
                    @click="viewLoginModal">Go to Login</Button>
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
          "showExcessOption": false, //注册时，是否显示额外的选项
          "agree": false, //是否同意用户协议
          "isError": false //用户协议是否是红色的
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
            //如果缓存中没有token，就弹出登录modal
            this.viewLoginModal(this)
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
    },
    computed: mapState({
        token: state => state.user.token,
        registerInfo: state => state.user.registerInfo, //注册信息
        loginInfo: state => state.user.loginInfo, //登录信息
        needLogin: state => state.user.needLogin,
        needRegister: state => state.user.needRegister
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
            'setNeedRegister' //设置注册Modal的显示和隐藏
        ]),
        //必须勾选同意协议，不然就将文字设置为红色以提示
        wantRegister () {
            if (this.agree) {
                this.register();
            } else {
                this.isError = true
            }
        },
        //由于 computed 中的属性没有setter方法，所以这里手写个两个setter方法，在modal消失时触发
        changeLoginModelVisible (visible) {
            this.setNeedLogin(visible);
        },
        changeRegisterModelVisible (visible) {
            this.setNeedRegister(visible);
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
