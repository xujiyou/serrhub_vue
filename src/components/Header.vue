<template>
    <div id="header">
        <div id="buttonGroup">
            <!-- userId为空字符串说明未登录，显示未登录的两个按钮 -->
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
            <!-- 若已登录，显示已登录的两个按钮 -->
            <div v-if="userInfo.userId !== ''">
               <Button shape="circle" type="text" id="myAccount"
                       onMouseOut="this.style.backgroundColor='transparent'"
                       onMouseOver="this.style.backgroundColor='#fff'"
                        @click="showMyAccount = true">
                   <b>&nbsp;MY ACCOUNT&nbsp;</b>
               </Button>
               <Button shape="circle" type="text" id="logoutButton"
                       onMouseOut="this.style.backgroundColor='transparent'"
                       onMouseOver="this.style.backgroundColor='#fff'"
                       @click="wantLogout">
                   <b>&nbsp;&nbsp;LOGOUT&nbsp;&nbsp;</b>
               </Button>
            </div>
        </div>
        <!-- 标题 -->
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
        <!-- 副标题 -->
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
                width="320">
            <p slot="header" style="text-align: center">
                <span>MY ACCOUNT</span>
            </p>
            <div style="width: 280px;margin-left:auto;margin-right: auto;">
                <Card>
                    <!-- 点击头像上传图片 -->
                    <div style="text-align:left;">
                        <Upload action="https://boot.serrhub.com/api/user/updateAvatar"
                                :headers="{'Authorization': 'serrhub' + token}"
                                :data="{'userId': userInfo.userId}"
                                :show-upload-list="showUploadList"
                                name="file"
                                :on-success="uploadSuccess"
                                :on-exceeded-size="bigFile"
                                style="cursor:pointer;"
                                :max-size="512">
                            <div>
                                <img :src='userInfo.profileImage'
                                     style="width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px; object-fit: cover;">
                            </div>
                        </Upload>
                        <div style="margin-top: 12px">
                            <p style="padding-bottom: 2px">
                                <b>{{userInfo.username}}</b>
                                <Button size="small" shape="circle" icon="md-create"
                                        onMouseOut=" this.style.color='#9A9A9C'"
                                        onMouseOver=" this.style.color='#17b5d2'"
                                        style="margin-left: 2px; border: none;color: #9A9A9C"
                                        @click="gotoUpdateUserName"></Button>
                            </p>
                            <p style="padding-bottom: 2px; color: #9A9A9C">
                                Phone: {{userInfo.phone}}
                                <Button size="small" shape="circle" icon="md-create"
                                        onMouseOut=" this.style.color='#9A9A9C'"
                                        onMouseOver=" this.style.color='#17b5d2'"
                                        style="margin-left: 2px; border: none;color: #9A9A9C"
                                        @click="gotoUpdatePhone"></Button>
                            </p>
                            <p style="padding-bottom: 2px; color: #9A9A9C">
                                Email: {{userInfo.email}}
                                <Button size="small" shape="circle" icon="md-create"
                                        onMouseOut=" this.style.color='#9A9A9C'"
                                        onMouseOver=" this.style.color='#17b5d2'"
                                        style="margin-left: 2px; border: none;color: #9A9A9C"
                                        @click="gotoUpdateEmail"></Button>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" long style="background-color: #17b5d2; border: 0"
                        size="large" @click="gotoUpdatePassword">Update Password</Button>
            </div>
        </Modal>

        <Modal title="Update User Name"
               v-model="needUpdateUserName"
               class-name="vertical-center-modal"
               :styles="{top: '0px'}"
               width="320"
               :mask-closable="false">
            <p slot="header" style="text-align:center">
                <span>Update user name</span>
            </p>
            <div style="text-align:center">
                <i-input v-model="firstName" placeholder="First name" style="width: 240px"></i-input>
                <br/><br/>
                <i-input v-model="lastName" placeholder="Last name" style="width: 240px"></i-input>
            </div>
            <div slot="footer">
                <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large"
                        @click="wantUpdateUserName">UPDATE</Button>
            </div>
        </Modal>

        <Modal title="Update User Name"
               v-model="needUpdatePassword"
               class-name="vertical-center-modal"
               :styles="{top: '0px'}"
               width="320"
               :mask-closable="false">
            <p slot="header" style="text-align:center">
                <span>Update password</span>
            </p>
            <div style="text-align:center">
                <i-input type="password" v-model="oldPassword" placeholder="Old password" style="width: 240px"></i-input>
                <br/><br/>
                <i-input type="password" v-model="newPassword" placeholder="New password" style="width: 240px"></i-input>
                <br/><br/>
                <i-input type="password" v-model="secondPassword" placeholder="Confirm password" style="width: 240px"></i-input>
            </div>
            <div slot="footer">
                <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large"
                        @click="wantUpdatePassword">UPDATE</Button>
            </div>
        </Modal>

        <Modal title="Update Phone"
               v-model="needUpdatePhone"
               class-name="vertical-center-modal"
               :styles="{top: '0px'}"
               width="320"
               :mask-closable="false">
            <p slot="header" style="text-align:center">
                <span>Update phone</span>
            </p>
            <div style="text-align:center">
                <i-input v-model="phone" placeholder="Phone" style="width: 240px"></i-input>
            </div>
            <div slot="footer">
                <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large"
                        @click="wantUpdatePhone">UPDATE</Button>
            </div>
        </Modal>

        <Modal title="Update Email"
               v-model="needUpdateEmail"
               class-name="vertical-center-modal"
               :styles="{top: '0px'}"
               width="320"
               :mask-closable="false">
            <p slot="header" style="text-align:center">
                <span>Update Email</span>
            </p>
            <div style="text-align:center">
                <i-input v-model="email" placeholder="Email" style="width: 240px"></i-input>
            </div>
            <div slot="footer">
                <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large"
                        @click="wantUpdateEmail" :loading="loadingEmailUpdate">UPDATE</Button>
            </div>
        </Modal>

        <Modal title="Email Code"
               v-model="needInputEmailCode"
               class-name="vertical-center-modal"
               :styles="{top: '0px'}"
               width="320"
               :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <span>Mailbox verification code</span>
            </p>
            <div style="text-align:center">
                <i-input v-model="userEmailCode" placeholder="Mailbox verification code" style="width: 240px"></i-input>
            </div>
            <div slot="footer">
                <Button type="primary" long style="background-color: #17b5d2; border: 0" size="large" @click="submitEmailCode">SUBMIT</Button>
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
                showMyAccount: false, //是否展示我的账户信息
                showUploadList: true,
                needUpdateUserName: false,
                needUpdatePassword: false,
                needUpdatePhone: false,
                needUpdateEmail: false,
                firstName: "",
                lastName: "",
                oldPassword: "",
                newPassword: "",
                secondPassword: "",
                phone: "",
                email: "",
                serverEmailCode: "",
                userEmailCode: "",
                needInputEmailCode: false,
                loadingEmailUpdate: false,
            }
        },
        computed: {
            ... mapState({
                userInfo: state => state.user.userInfo, //用户信息
                token: state => state.user.token
            }),
        },
        methods: {
            ...mapActions('user', [
                'viewLoginModal', //显示登录modal
                'viewRegisterModal', //显示注册modal
                'logout', //注销
                'beginUpdateUserName',
                'beginUpdatePassword',
                'beginUpdatePhone',
                'beginUpdateEmail',
                'beginSendEmailCode'
            ]),
            //更新头像成功执行，替换用户的头像
            uploadSuccess (response, file, fileList) {
                this.userInfo.profileImage = response;
                this.showUploadList = false;
                this.$Message.success('Upload avatar success.')
            },
            bigFile () {
                this.$Message.error('Files are too large and the maximum limit is 512 KB.')
            },
            wantLogout () {
                this.logout(() => {
                    this.$Message.info('Logout success.')
                })
            },
            gotoUpdateUserName () {
                this.showMyAccount = false;
                this.needUpdateUserName = true;
                this.firstName = this.userInfo.firstName;
                this.lastName = this.userInfo.lastName;
            },
            gotoUpdatePassword () {
                this.showMyAccount = false;
                this.needUpdatePassword = true;
            },
            gotoUpdatePhone () {
                this.showMyAccount = false;
                this.needUpdatePhone = true;
                this.phone = this.userInfo.phone;
            },
            gotoUpdateEmail () {
                this.showMyAccount = false;
                this.needUpdateEmail = true;
                this.email = this.userInfo.email;
            },
            wantUpdateUserName () {
                this.beginUpdateUserName({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    successCallback: () => {
                        this.$Message.success('Update success.');
                        this.needUpdateUserName = false;
                    },
                    errorCallback: (msg) => {
                        this.$Message.error(msg);
                    },
                    networkError: () => {
                        this.$Message.error('Network error, please try again.');
                    }
                });
            },
            wantUpdatePhone () {
                this.beginUpdatePhone({
                    phone: this.phone,
                    successCallback: () => {
                        this.$Message.success('Update success.');
                        this.needUpdatePhone = false;
                    },
                    errorCallback: (msg) => {
                        this.$Message.error(msg);
                    },
                    networkError: () => {
                        this.$Message.error('Network error, please try again.');
                    }
                });
            },
            wantUpdateEmail () {
                if (!this.emailCheck(this.email)) {
                    this.$Message.error('Please fill in the correct email.');
                    return;
                }
                this.loadingEmailUpdate = true;
                this.beginSendEmailCode({
                    email: this.email,
                    successCallback: (emailCode) => {
                        this.serverEmailCode = emailCode;
                        this.needInputEmailCode = true;
                        console.log("emailCode:" + emailCode);
                    },
                    emailFormatError: (errMsg) => {
                        this.$Message.error(errMsg);
                        this.loadingEmailUpdate = false;
                    },
                    emailExistError: (errMsg) => {
                        this.$Message.error(errMsg);
                        this.loadingEmailUpdate = false;
                    },
                    errorCallback: () => {
                        this.$Message.error('Network error, please try again.');
                        this.loadingEmailUpdate = false;
                    }
                });
            },
            wantUpdatePassword () {
                this.beginUpdatePassword({
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                    secondPassword: this.secondPassword,
                    successCallback: () => {
                        this.$Message.success('Update success.');
                        this.needUpdatePassword = false;
                        this.logout(() => {
                            this.$Message.info('Please login again.');
                            this.viewLoginModal();
                        })
                    },
                    errorCallback: (msg) => {
                        this.$Message.error(msg);
                    },
                    networkError: () => {
                        this.$Message.error('Network error, please try again.');
                    }
                });
            },
            emailCheck (str) {
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                return str.match(reg) != null
            },
            submitEmailCode () {
                if (this.userEmailCode === this.serverEmailCode) {
                    this.needInputEmailCode = false;
                    this.loadingEmailUpdate = false;
                    this.beginUpdateEmail({
                        "email": this.email,
                        successCallback: () => {
                            this.$Message.success('Update success.');
                            this.needUpdateEmail = false;
                        },
                        errorCallback: (msg) => {
                            this.$Message.error(msg);
                        },
                        networkError: () => {
                            this.$Message.error('Network error, please try again.');
                        }
                    });
                } else {
                    this.$Message.error('The validation code is incorrect. Please fill it in again.');
                }
            },
        }
    }
</script>

<style scoped>
    /*设置Header高度，宽度，背景*/
    #header {
        height: 300px;
        width: 100%;
        background-size: cover;
        background-image: url("../assets/home.jpg");
        background-repeat: no-repeat;
    }

    /*按钮距离顶部30个像素，在页面右边*/
    #buttonGroup {
        padding-top: 30px;
        text-align: right;
    }

    /*login按钮样式*/
    #loginButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 10px;
    }

    /*register按钮样式*/
    #registerButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 60px;
    }

    /*myAccount按钮样式*/
    #myAccount {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 10px;
    }

    /*登出按钮样式*/
    #logoutButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 60px;
    }

    /*标题距离顶部30个像素*/
    #title {
        margin-top: 30px;
    }

    /*一级标题样式*/
    h1{
        font-size: 40px;
        line-height: 120%;
    }

    /*二级标题样式*/
    h2 {
        margin-top: 10px;
        color: #9A9A9C;
        font-size: 30px;
    }
</style>