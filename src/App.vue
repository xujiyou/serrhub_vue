<template>
    <div id="app">
        <Header></Header>
        <Search id="search"></Search>
        <Row>
            <Col span="4"><MyHouse></MyHouse></Col>
            <Col span="16"><ServiceLinkList></ServiceLinkList></Col>
        </Row>
        <Footer id="footerDiv"></Footer>

        <Modal
                title="Login"
                v-model="needLogin"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                width="400"
                :closable="false"
                :mask-closable="false">
            <p slot="header">
              <span>Login</span>
            </p>
            <div style="width: 240px;margin-left:auto;margin-right: auto;">
              <Form ref="formValidate" onsubmit="event.preventDefault()">
                <FormItem prop="Phone or email" class="formItem">
                  <Input type="text" size="large" placeholder="Phone or email" v-model="loginInfo.phoneOrEmail">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password" class="formItem">
                  <Input type="password" size="large" placeholder="Password" v-model="loginInfo.password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="interest" class="formItem">
                  <CheckboxGroup>
                    <Checkbox label="Remember me"></Checkbox>
                    <Button size="small" type="text" style="float: right; margin-top: 4px"
                            html-type="submit"
                            onMouseOut="this.style.color='#515A61'"
                            onMouseOver="this.style.color='#17b5d2'" @click="viewRegisterModal">Register now</Button>
                  </CheckboxGroup>

                </FormItem>
                <FormItem class="formItem">
                  <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large" @click="login">LOGIN</Button>
                </FormItem>
              </Form>
            </div>
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
                    <br/><br/><br/><br/>
                </div>
            </div>
        </Modal>

        <Modal
              title="Register"
              v-model="needRegister"
              class-name="vertical-center-modal"
              :styles="{top: '0px'}"
              width="520"
              :closable="false"
              :mask-closable="false">
        <p slot="header">
          <Button size="small" type="text" icon="ios-arrow-back"
                  onMouseOut="this.style.color='#515A61'"
                  onMouseOver="this.style.color='#17b5d2'" @click="viewLoginModal"></Button>
          <span>Register</span>

        </p>
        <div style="width: 360px;margin-left:auto;margin-right: auto;">
          <Form :label-width="120" :model="registerInfo" ref="formValidate" onsubmit="event.preventDefault()">
            <FormItem label="First Name" :required="true">
              <Input placeholder="First Name" v-model="registerInfo.firstName"></Input>
            </FormItem>
            <FormItem label="Last Name" :required="true">
              <Input placeholder="Last Name" v-model="registerInfo.lastName"></Input>
            </FormItem>
            <FormItem label="Phone" :required="true">
              <Input placeholder="Phone" v-model="registerInfo.phone"></Input>
            </FormItem>
            <FormItem label="Email" :required="true">
              <Input placeholder="Email" v-model="registerInfo.email"></Input>
            </FormItem>
            <FormItem label="Password" prop="password" :required="true">
              <Input type="password" placeholder="Password"  v-model="registerInfo.password"></Input>
            </FormItem>
            <FormItem label="House name">
              <Input placeholder="House name" v-model="registerInfo.houseName"></Input>
            </FormItem>
            <FormItem label="Address" :required="true">
              <Input placeholder="Address" v-model="registerInfo.address"></Input>
            </FormItem>
            <FormItem label="Community name" :required="true">
              <Input placeholder="Community name" v-model="registerInfo.communityName"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" html-type="submit" long style="background-color: #17b5d2; border: 0" size="large" @click="register">REGISTER</Button>
            </FormItem>
          </Form>
        </div>
          <div slot="footer" style="text-align: center">
            <Button size="small" type="text" icon="ios-arrow-back"
                    onMouseOut="this.style.color='#515A61'"
                    onMouseOver="this.style.color='#17b5d2'" @click="viewLoginModal">Back to login</Button>
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
    components: {
        Header,
        Search,
        MyHouse,
        ServiceLinkList,
        Footer
    },
    mounted: function () {
        this.findTokenFromLocalStorage(this);
        if (this.token === undefined || this.token === "") {
            console.log("需要登录");
            this.viewLoginModal(this)
        } else {
            this.findUserInfo(this);
        }
    },
    computed: mapState({
        token: state => state.user.token,
        registerInfo: state => state.user.registerInfo,
        loginInfo: state => state.user.loginInfo,
        needLogin: state => state.user.needLogin,
        needRegister: state => state.user.needRegister
    }),
    methods: mapActions('user', [
        'findTokenFromLocalStorage',
        'login',
        'viewLoginModal',
        'viewRegisterModal',
        'register',
        'findUserInfo'
    ]),
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
    #search {
      position: relative;
      top: -20px;
    }
    .vertical-center-modal{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .formItem {
      padding: 0;
      margin: 0px;
      line-height: 100%;
    }

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

    #footerDiv{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
    }

</style>
