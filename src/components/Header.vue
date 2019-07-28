<template>
    <div id="header">
        <div id="myInfo">
            <div v-if="userInfo.userId === ''">
                <Button shape="circle" id="loginButton"
                        onMouseOut="this.style.backgroundColor='transparent'"
                        onMouseOver="this.style.backgroundColor='#fff'"
                        @click="viewLoginModal">
                    <b>&nbsp;&nbsp;&nbsp;LOGIN&nbsp;&nbsp;&nbsp;</b>
                </Button>
                <Button shape="circle" id="registerButton"
                        onMouseOut="this.style.backgroundColor='transparent'"
                        onMouseOver="this.style.backgroundColor='#fff'"
                        @click="viewRegisterModal">
                    <b>&nbsp;&nbsp;REGISTER&nbsp;&nbsp;</b>
                </Button>
            </div>
           <div v-if="userInfo.userId !== ''">
               <Button shape="circle" type="text" id="myAccount"
                       onMouseOut="this.style.backgroundColor='transparent'"
                       onMouseOver="this.style.backgroundColor='#fff'"
                        @click="showMyAccount = true">
                   <b>&nbsp;MY ACCOUNT&nbsp;</b>
               </Button>
<!--               <Button shape="circle" id="addNewWebsite"-->
<!--                       onMouseOut="this.style.backgroundColor='transparent'"-->
<!--                       onMouseOver="this.style.backgroundColor='#fff'"-->
<!--                       @click="needAddWebsite = true">-->
<!--                   <b>ADD NEW SERVICE</b>-->
<!--               </Button>-->
               <Button shape="circle" type="text" id="logoutButton"
                       onMouseOut="this.style.backgroundColor='transparent'"
                       onMouseOver="this.style.backgroundColor='#fff'"
                       @click="logout">
                   <b>&nbsp;&nbsp;LOGOUT&nbsp;&nbsp;</b>
               </Button>
           </div>
        </div>
        <div id="title">
            <Row>
                <Col span="4">&nbsp;</Col>
                <Col span="16">
                    <h1>ANYTHING YOU NEED, <br/>
                        WE’VE GOT YOU COVERED.</h1>

                </Col>
                <Col span="4">&nbsp;</Col>
            </Row>
        </div>
        <div id="subTitle">
            <Row>
                <Col span="4">&nbsp;</Col>
                <Col span="16">
                    <h2>classified usual website.</h2>
                </Col>
                <Col span="4">&nbsp;</Col>
            </Row>
        </div>


        <Modal
                title="MY ACCOUNT"
                v-model="showMyAccount"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                ok-text="OK"
                cancel-text="cancel"
                width="260">
            <p slot="header" style="text-align: center">
                <span>MY ACCOUNT</span>
            </p>
            <div style="width: 220px;margin-left:auto;margin-right: auto;">
                <Card style="margin-bottom: 16px;">
                    <div style="text-align:left;">
                        <Upload action="http://boot.serrhub.com/api/user/updateAvatar"
                                :headers="{'Authorization': 'serrhub' + token}"
                                :data="{'userId': userInfo.userId}"
                                :show-upload-list="false"
                                name="file"
                                :on-success="uploadSuccess">
                            <div>
                                <img :src='imageSrc' style="width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px">
                            </div>
                        </Upload>
                        <div style="margin-top: 12px">
                            <p style="padding: 0 16px 2px 16px"><b>{{userInfo.username}}</b></p>
                            <p style="padding: 0 16px 2px 16px; color: #9A9A9C">Phone: {{userInfo.phone}}</p>
                            <p style="padding: 0 16px 12px 16px; color: #9A9A9C">Email: {{userInfo.email}}</p>
                        </div>
                    </div>

<!--                    <div style="position: absolute; top: 8px; left: 8px; z-index: 10">-->
<!--                        -->
<!--                        <Button type="info" shape="circle" size="small" icon="md-create" ghost-->
<!--                                @click=""></Button>-->
<!--                    </div>-->
                </Card>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" long style="background-color: #17b5d2; border: 0"
                        size="large" @click="showMyAccount = false">OK</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Header",
        data() {
            return {
                showMyAccount: false,
                imageSrc: '',
            }
        },
        mounted () {
            let image = this.userInfo.profileImage;
            console.log(image);
            if (image === undefined || image === null || image === "") {
                this.imageSrc = 'https://pic3.zhimg.com/19554be26eaaace6f99476ef9c6e0ed2_xll.jpg';
            } else {
                this.imageSrc = image;
            }
        },
        computed: {
            ... mapState({
                serviceLinkInfo: state => state.user.serviceLinkInfo,
                userInfo: state => state.user.userInfo,
                token: state => state.user.token
            }),
        },
        methods: {
            ...mapActions('user', [
                'addServiceLink',
                'viewLoginModal',
                'viewRegisterModal',
                'setNeedLogin',
                'logout'
            ]),
            uploadSuccess (response, file, fileList) {
                this.userInfo.profileImage = response;
                this.imageSrc = response;
                console.log(response)
            }
        }
    }
</script>

<style scoped>
    #header {
        height: 300px;
        width: 100%;
        background-size: cover;
        background-image: url("../assets/home.jpg");
        background-repeat: no-repeat;
    }
    #myInfo {
        padding-top: 30px;
        text-align: right;
    }
    #loginButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 10px;
    }
    #registerButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 60px;
    }
    #myAccount {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 10px;
    }
    #addNewWebsite {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 10px;
    }
    #logoutButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 60px;
    }
    #title {
        margin-top: 30px;
    }
    h1{
        font-size: 40px;
        line-height: 120%;
    }
    h2 {
        margin-top: 10px;
        color: #9A9A9C;
        font-size: 30px;
    }
</style>