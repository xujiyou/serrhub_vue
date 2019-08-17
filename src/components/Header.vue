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
                        @click="$bvModal.show('myAccount')">
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

        <!-- title -->
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

        <!-- sub title -->
        <div id="subTitle">
            <Row>
                <Col span="4">&nbsp;</Col>
                <Col span="16">
                    <h2>classified usual website.</h2>
                </Col>
                <Col span="4">&nbsp;</Col>
            </Row>
        </div>

        <b-modal id="myAccount"
                 header-bg-variant="dark"
                 header-text-variant="light"
                title=""
                 centered
                :hide-footer="true"
                size="xl"
                style="padding: 0; margin: 0; border: 0">
            <Row>

                <Col span="8" style="text-align: center;">
                    <h3 style="margin-bottom: 10px">My profile</h3>
                    <br/>
                    <img :src='userInfo.profileImage' class="avatar" alt="avatar"/>
                    <div class="editAvatar">
                        <Upload action="https://boot.serrhub.com/api/user/updateAvatar"
                                :headers="{'Authorization': 'serrhub' + token}"
                                :data="{'userId': userInfo.userId}"
                                :show-upload-list="false"
                                name="file"
                                :on-success="uploadSuccess"
                                :on-exceeded-size="bigFile"
                                style="cursor:pointer;"
                                :max-size="512">
                            <Icon type="ios-videocam" :size="36"></Icon>
                        </Upload>
                    </div>
                    <h3 style="margin-bottom: 10px">{{userInfo.username}}</h3>
                    <p style="padding-bottom: 2px; font-size: 18px">
                        Phone: {{userInfo.phone}}
                    </p>
                    <p style="padding-bottom: 2px; font-size: 18px">
                        Email: {{userInfo.email}}
                    </p>
                    <br/><br/>
                </Col>

                <Col span="16" style="padding-left: 64px; padding-right: 64px;border-left: #f5f5f5 solid 1px">
                    <h3 style="margin-bottom: 10px">Update your profile</h3>
                    <br/>
                    <Form inline style="padding: 0; margin: 0" >
                        <FormItem label="First Name" label-position="top" style="padding: 0 20px 0 0; margin: 0">
                            <Input placeholder="First Name" v-model="firstName"></Input>
                        </FormItem>
                        <FormItem label="Last Name" label-position="top" style="padding: 0; margin: 0">
                            <Input placeholder="Last Name" v-model="lastName"></Input>
                        </FormItem>
                    </Form>
                    <div style="">
                        <Form style="padding: 0; margin: 0">
                            <FormItem label="Phone" label-position="top" style="padding: 0; margin: 0">
                                <Input placeholder="Input your new phone" v-model="phone"></Input>
                            </FormItem>
                            <FormItem label="Email" label-position="top" style="padding: 0; margin: 0">
                                <Input placeholder="Input your new email" v-model="email"></Input>
                            </FormItem>
                            <Divider :dashed="true"></Divider>
                            <FormItem label="Old Password" label-position="top" style="padding: 0; margin: 0">
                                <Input type="password" placeholder="Input your old password" v-model="oldPassword"></Input>
                            </FormItem>
                            <FormItem label="New Password" label-position="top" style="padding: 0 0 20px 0; margin: 0">
                                <Input type="password" placeholder="Input your new password" v-model="newPassword"></Input>
                            </FormItem>
                            <FormItem style="padding: 0; margin: 0">
                                <Input type="password" placeholder="Confirm your new password" v-model="secondPassword"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <Button type="text" id="updateInfoButton"
                            onMouseOut="this.style.backgroundColor='transparent'"
                            onMouseOver="this.style.backgroundColor='#f5f5f5'"
                            @click="updateProfile">
                        <b>&nbsp;&nbsp;UPDATE&nbsp;&nbsp;</b>
                    </Button>
                </Col>
            </Row>
        </b-modal>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Header",

        data() {
            return {
                showMyAccount: false,
                showUploadList: true,
                firstName: "",
                lastName: "",
                oldPassword: "",
                newPassword: "",
                secondPassword: "",
                phone: "",
                email: ""
            }
        },

        computed: {
            ... mapState({
                userInfo: state => state.user.userInfo,
                token: state => state.user.token
            }),
        },

        methods: {
            ...mapActions('user', [
                'viewLoginModal', //view login modal
                'viewRegisterModal', //view register modal
                'logout',
                'beginUpdateUserName',
                'beginUpdatePassword',
                'beginUpdatePhone',
                'beginUpdateEmail'
            ]),

            //update avatar success，replace user avatar
            uploadSuccess (response, file, fileList) {
                this.userInfo.profileImage = response;
                this.showUploadList = false;
                this.$Message.success('Upload avatar success.')
            },

            //image is big
            bigFile () {
                this.$Message.error('Files are too large and the maximum limit is 512 KB.')
            },

            wantLogout () {
                this.logout(() => this.$Message.info('Logout success.'));
            },

            updateProfile () {
                if (this.firstName !== "" && this.lastName !== "") {
                    this.updateUserName();
                }

                if (this.phone !== "") {
                    this.updatePhone();
                }
                if (this.email !== "") {
                    if (!this.emailCheck(this.email)) {
                        this.$Message.error('Please fill in the correct email.');
                        return;
                    }
                    this.updateEmail();
                }

                if (this.oldPassword !== "" && this.newPassword !== "" && this.secondPassword !== "") {
                    if (this.newPassword !== this.secondPassword) {
                        this.$Message.error('Please fill in the correct email.');
                        return;
                    }
                    this.updatePassword();
                }
            },

            updateUserName () {
                this.beginUpdateUserName({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    successCallback: () => {
                        this.firstName = "";
                        this.lastName = "";
                        this.$Message.success('Update success.');
                    },
                    errorCallback: (msg) => {
                        this.$Message.error(msg);
                    },
                    networkError: () => {
                        this.$Message.error('Network error, please try again.');
                    }
                });
            },

            updatePhone () {
                this.beginUpdatePhone({
                    phone: this.phone,
                    successCallback: () => {
                        this.phone = "";
                        this.$Message.success('Update success.');
                    },
                    errorCallback: (msg) => {
                        this.$Message.error(msg);
                    },
                    networkError: () => {
                        this.$Message.error('Network error, please try again.');
                    }
                });
            },

            updateEmail () {
                this.beginUpdateEmail({
                    "email": this.email,
                    successCallback: () => {
                        this.$Message.success('Update success.');
                        this.$bvModal.show('myAccount');
                        this.email = "";
                    },
                    errorCallback: (msg) => {
                        this.$Message.error(msg);
                    },
                    networkError: () => {
                        this.$Message.error('Network error, please try again.');
                    }
                });
            },

            updatePassword () {
                this.beginUpdatePassword({
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                    secondPassword: this.secondPassword,
                    successCallback: () => {
                        this.$Message.success('Update success.');
                        this.$bvModal.hide('myAccount');
                        this.oldPassword = "";
                        this.newPassword = "";
                        this.secondPassword = "";
                        this.logout(() => {
                            this.$Message.info('Please login again.');
                            this.viewLoginModal();
                        })
                    },
                    errorCallback: (msg) => this.$Message.error(msg),
                    networkError: () =>
                        this.$Message.error('Network error, please try again.')
                });
            },

            // check email format
            emailCheck (str) {
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                return str.match(reg) != null
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

    #updateInfoButton {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 2px;
        padding: 6px 16px 6px 16px;
        margin-right: 60px;
        margin-top: 20px;
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

    .avatar {
        object-fit: cover;
        height: 200px;
        width: 200px;
        border-radius: 100px;
        border: white solid 4px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08)
    }

    .editAvatar {
        height: 48px;
        width: 48px;
        border-radius: 24px;
        line-height: 42px;
        text-align: center;
        border: white solid 2px;
        background-color: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        position: relative;
        left: 60%;
        top: -46px;
        margin-bottom: -32px;
    }
</style>