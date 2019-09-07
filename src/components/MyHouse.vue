<template>
    <div id="myHouse">
        &nbsp;
        <div v-if="userInfo.userId !== ''">

            <!-- 如果房屋为空，给出提示 -->
            <p v-if="userInfo.houseList.length === 0" style="line-height: 1.4">
                Sorry, you haven't added the house yet. Please
                <Button type="text" style="color: #17b5d2" @click="needAddHouse = true"><b>add it</b></Button>
                .
            </p>

            <h4 v-if="userInfo.houseList.length !== 0" style="padding-left: 16px">
                My House
                <Button size="small" shape="circle" icon="md-add"
                        style="margin-left: 2px; color: #17b5d2; border: none; box-shadow: none; background-color: transparent"
                        onMouseOut="this.style.color='#17b5d2'"
                        onMouseOver="this.style.color='#2c3e50'"
                        @click="needAddHouse = true"></Button>
            </h4>
            <br/>

            <Collapse simple accordion :value="currentHouseId" v-on:on-change="seeServiceLike" v-if="userInfo.houseList.length !== 0">
                <Panel :name="house.houseId" v-for="house in userInfo.houseList">
                    <span v-if="currentHouseId === house.houseId" style="color: #2c3e50">{{house.houseName}}</span>
                    <span v-if="currentHouseId !== house.houseId">{{house.houseName}}</span>
                    <p slot="content">
                        <br/>
                        <b>Address:</b> {{house.address}}
                        <br/>
                        <span v-if="house.communityName !== undefined && house.communityName !== '' && house.communityName !== null">
                            <b>Community name:</b> {{house.communityName}}
                        </span>
                        <span v-if="house.note !== undefined && house.note !== '' && house.note !== null">
                            <b>Note:</b> {{house.note}}
                        </span>
                        <br/><br/>
                        <Button shape="circle" id="addNewWebsite"
                                @click="needAddService = true"  style="box-shadow: none;"
                                onMouseOver="this.style.borderColor='#2c3e50'; this.style.color='#2c3e50'"
                                onMouseOut="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'">
                            <b>ADD SERVICE</b>
                        </Button>
                        <Dropdown style="padding-left: 20px; text-align: center;">
                            <a href="javascript:void(0)" style="color: #17b5d2;font-size: 18px;">
                                <Icon type="ios-arrow-down" style="margin-top: 4px;"></Icon>
                            </a>
                            <Dropdown-menu slot="list">
                                <Button shape="circle" id="UpdateButton" style="box-shadow: none;"
                                        @click="viewUpdateHouseModel(house); needUpdateHouse = true"
                                        onMouseOver="this.style.borderColor='#2c3e50'; this.style.color='#2c3e50'"
                                        onMouseOut="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'">
                                    <b>Update</b>
                                </Button>
                                <br/>
                                <Button shape="circle" id="removeButton" style="margin-bottom: 10px;box-shadow: none;"
                                        @click="viewUpdateHouseModel(house);confirm()"
                                        onMouseOver="this.style.borderColor='#2c3e50'; this.style.color='#2c3e50'"
                                        onMouseOut="this.style.borderColor='red'; this.style.color='red'">
                                    <b>Remove</b>
                                </Button>
                            </Dropdown-menu>
                        </Dropdown>
                    </p>
                </Panel>
            </Collapse>

            <Modal
                    title="Add house"
                    v-model="needAddHouse"
                    class-name="vertical-center-modal"
                    :styles="{top: '0px'}"
                    width="560">
                <p slot="header" style="text-align: center">
                    <span>Add house</span>
                </p>
                <div style="width: 400px;margin-left:auto;margin-right: auto;">
                    <div v-if="checkAddHouseError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                        Please fill in the necessary information.
                    </div>
                    <Form :label-width="120" ref="formValidate" :model="houseInfo" >
                        <FormItem label="House name" :required="true">
                            <Input placeholder="House name" v-model="houseInfo.houseName" size="large"></Input>
                        </FormItem>
                        <FormItem label="Address" :required="true">
                            <AutoComplete
                                    v-model="houseInfo.address"
                                    :data="addressList"
                                    @on-search="handleSearch"
                                    placeholder="Address" size="large"></AutoComplete>
                        </FormItem>
                        <FormItem label="Community name">
                            <Input placeholder="Community name" v-model="houseInfo.communityName" size="large"></Input>
                        </FormItem>
                        <FormItem label="Note">
                            <Input placeholder="Note" v-model="houseInfo.note" size="large"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align: center">
                    <div style="width: 280px;margin-left:auto;margin-right: auto;">
                        <Button type="primary" long @click="wantAddHouse" shape="circle"
                                onMouseOut="this.style.backgroundColor='#17b5d2'"
                                onMouseOver="this.style.backgroundColor='#2c3e50'"
                                style="background-color: #17b5d2; border: 0; box-shadow: none; height: 40px; line-height: 20px" size="large" >ADD HOUSE</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                    title="Update house"
                    v-model="needUpdateHouse"
                    class-name="vertical-center-modal"
                    :styles="{top: '0px'}"
                    width="560">
                <p slot="header" style="text-align: center">
                    <span>Update house</span>
                </p>
                <div style="width: 400px;margin-left:auto;margin-right: auto;">
                    <div v-if="checkUpdateHouseError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                        Please fill in the necessary information.
                    </div>
                    <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="currentHouseInfo" >
                        <FormItem label="House name" :required="true">
                            <Input placeholder="House name" v-model="currentHouseInfo.houseName" size="large"></Input>
                        </FormItem>
                        <FormItem label="Address" style="text-align: left" :required="true">
                            <AutoComplete
                                    v-model="currentHouseInfo.address"
                                    :data="addressList"
                                    @on-search="handleSearch"
                                    placeholder="Address" size="large"></AutoComplete>
                        </FormItem>
                        <FormItem label="Community name">
                            <Input placeholder="Community name" v-model="currentHouseInfo.communityName" size="large"></Input>
                        </FormItem>
                        <FormItem label="Note">
                            <Input placeholder="Note" v-model="currentHouseInfo.note" size="large"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align: center">
                    <div style="width: 280px;margin-left:auto;margin-right: auto;">
                        <Button type="primary" long @click="wantUpdateHouse" shape="circle"
                            onMouseOut="this.style.backgroundColor='#17b5d2'"
                            onMouseOver="this.style.backgroundColor='#2c3e50'"
                            style="background-color: #17b5d2; border: 0; box-shadow: none; height: 40px; line-height: 20px" size="large" >UPDATE HOUSE</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                    title="Choose service link"
                    v-model="showChooseService"
                    class-name="vertical-center-modal"
                    :styles="{top: '0px'}"
                    :scrollable="true"
                    ok-text="OK"
                    cancel-text="cancel"
                    @on-ok="makeSureAddAll"
                    width="860">
                <p slot="header" style="text-align: center">
                    <span>Choose service link</span>
                </p>
                <div style="">
                    <Row :gutter="16">
                        <Col span="6" v-for="serviceLink in cacheServiceLinkList">
                            <a :href="serviceLink.link" target="_blank" style="text-decoration: none; color: #2D3755">
                                <Card style="margin-bottom: 16px;">
                                    <div style="text-align:left;">
                                        <div>
                                            <img :src="getImage(serviceLink)"
                                                 style="width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px">
                                            <h2 class="url" v-if="/(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link) === null">
                                                Service Link
                                            </h2>
                                            <h2 class="url" v-if="/(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link) !== null">
                                                {{
                                                /(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link)[0]
                                                }}
                                            </h2>
                                        </div>
                                        <div style="position: relative; top: -8px;">
                                            <p style="padding: 0 16px 2px 16px"><b>{{serviceLink.title}}</b></p>
                                            <p style="padding: 0 16px 12px 16px; color: #9A9A9C">Added on {{serviceLink.createDate.substring(0, 10)}}</p>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                            <div style="position: absolute; top: 10px; left: 24px; z-index: 10">
                                <Button type="error" shape="circle" size="small" icon="md-close" ghost
                                        style="margin-right: 6px; box-shadow: none"
                                        @click="removeServiceFromArray(serviceLink)"></Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>

            <Modal
                    title="Add Service"
                    v-model="needAddService"
                    class-name="vertical-center-modal"
                    :styles="{top: '0px'}"
                    width="560">
                <p slot="header" style="text-align: center">
                    <span>Add website</span>
                </p>
                <div style="width: 400px;margin-left:auto;margin-right: auto;">
                    <div v-if="checkAddServiceError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                        Please fill in the necessary information.
                    </div>
                    <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="serviceLinkInfo" >
                        <FormItem label="Title" :required="true">
                            <Input placeholder="Title" v-model="serviceLinkInfo.title" size="large"></Input>
                        </FormItem>
                        <div v-if="checkLinkError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                            Link not accessible.
                        </div>
                        <FormItem label="Link" :required="true">
                            <Input placeholder="Link" v-model="serviceLinkInfo.link" size="large"></Input>
                        </FormItem>
                        <FormItem label="Categories" :required="true">
                            <Input placeholder="Categories" v-model="serviceLinkInfo.categories" size="large"></Input>
                        </FormItem>
                        <FormItem label="contact">
                            <Input placeholder="contact" v-model="serviceLinkInfo.contact" size="large"></Input>
                        </FormItem>
                        <FormItem label="Phone">
                            <Input placeholder="Phone" v-model="serviceLinkInfo.phone" size="large"></Input>
                        </FormItem>
                        <FormItem label="Note">
                            <Input placeholder="Note"v-model="serviceLinkInfo.note" size="large"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align: center">
                    <div style="width: 280px;margin-left:auto;margin-right: auto;">
                        <Button type="primary" html-type="submit" long @click="wantAddService" :loading="loadingAddService"
                                onMouseOut="this.style.backgroundColor='#17b5d2'" shape="circle"
                                onMouseOver="this.style.backgroundColor='#2c3e50'"
                                style="background-color: #17b5d2; border: 0;box-shadow: none;height: 40px; line-height: 20px" size="large" >ADD NEW SERVICE</Button>
                    </div>
                </div>
            </Modal>
        </div>

    </div>
</template>


<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "MyHouse",

        data: () => {
            return {
                needAddHouse: false, //是否显示添加房屋的modal
                needUpdateHouse: false, //是否显示更新房屋的modal
                showChooseService: false, //是否展示待添加的服务modal
                needAddService: false, //是都展示添加服务的modal
                cacheServiceLinkList: [], //待添加的服务列表
                loadingAddService: false, //是都在等待添加服务
                checkAddHouseError: false,
                checkUpdateHouseError: false,
                checkAddServiceError: false,
                checkLinkError: false
            }
        },

        computed: {
            ... mapState({
                userInfo: state => state.user.userInfo, //用户信息
                houseInfo: state => state.user.houseInfo, //新添加房屋的信息
                currentHouseInfo: state => state.user.currentHouseInfo, //当前房屋的信息
                currentHouseId: state => state.user.currentHouseId, //当前房屋的ID
                serviceLinkInfo: state => state.user.serviceLinkInfo, //新添加的服务信息
                addressList: state => state.user.addressList,
            }),
        },

        methods: {
            ...mapActions('user', [
                'viewUpdateHouseModel', //显示更新房屋的modal
                'addHouse', //添加房屋
                'updateHouse', //更新房屋信息
                'removeHouse', //删除房屋
                'addAllServiceLink', //添加小区内的所有的服务链接
                'addServiceLink', //添加服务链接
                'seeServiceLike', //查看当前房屋的服务链接列表
                'analysisAddress'
            ]),

            clickOption(key) {
                console.log(key);
            },

            getImage (serviceLink) {
                if (serviceLink.image === null || serviceLink.image === '' || serviceLink.image === undefined) {
                    return 'https://boot.serrhub.com/api/image/id/5d6cddf4e1787e1e3162cf7d';
                } else {
                    return serviceLink.image;
                }
            },

            //处理地址解析
            handleSearch (value) {
                if (value !== "" && this.addressList.indexOf(value) === -1) {
                    this.analysisAddress(value);
                }
            },

            wantAddHouse () {
                this.checkAddHouseError = false;
                if (this.houseInfo.houseName === "" || this.houseInfo.address === "") {
                    this.checkAddHouseError = true;
                    this.$Message.error('Please fill in the necessary information.');
                    return;
                }
                this.addHouse((serviceLinkList) => {
                    this.needAddHouse = false;
                    this.$Message.success('Add house success'); //提示添加房屋成功
                    if (serviceLinkList.length !== 0) {
                        //如果小区的服务链接不是空，让用户选择是否添加
                        this.cacheServiceLinkList = serviceLinkList;
                        this.showChooseService = true;
                    }
                })
            },

            wantUpdateHouse () {
                this.checkUpdateHouseError = false;
                if (this.currentHouseInfo.houseName === "" || this.currentHouseInfo.address === "") {
                    this.checkUpdateHouseError = true;
                    this.$Message.error('Please fill in the necessary information.');
                    return;
                }
                this.updateHouse(() => {
                    this.needUpdateHouse = false;
                    this.$Message.success('Update house success')
                })
            },

            //添加服务，由于添加服务很耗时，所以将按钮置为等待，添加成功后将按钮置为正常，下次再添加时，按钮还是正常的
            wantAddService () {
                this.checkAddServiceError = false;
                this.checkLinkError = false;
                if (this.serviceLinkInfo.title === "" || this.serviceLinkInfo.link === "" || this.serviceLinkInfo.categories === "") {
                    this.checkAddServiceError = true;
                    this.$Message.error('Please fill in the necessary information.');
                    return;
                }

                this.loadingAddService = true;
                this.addServiceLink({
                    "closeModel": () => {
                        this.needAddService = false;
                        this.loadingAddService = false;
                        this.$Message.success('Add website success.') //提示添加服务成功
                    },
                    "linkErrorCallBack": () => {
                        this.checkLinkError = true;
                        this.loadingAddService = false;
                        this.$Message.error('Link not accessible.')
                    }
                });
            },

            //询问是否确定删除房屋
            confirm () {
                this.$Modal.confirm({
                    title: 'Are you sure you want to remove ' + this.currentHouseInfo.houseName + ' ?',
                    onOk: () => {
                        //删除房屋，删除完成后，提示删除成功
                        this.removeHouse(() => this.$Message.success('Remove Success'));
                    },
                    onCancel: () => {
                        //提示取消删除
                        this.$Message.info('Cancel remove');
                    },
                    okText: 'Remove',
                    cancelText: 'Cancel'
                });
            },

            //在添加房屋后，服务端会给出本小区房屋的服务链接列表，如果其中有不想要的，可以去掉
            removeServiceFromArray (serviceLink) {
                let index = -1;
                for (let i = 0; i < this.cacheServiceLinkList.length; i++) {
                    if (serviceLink.link === this.cacheServiceLinkList[i].link) {
                        index = i;
                        break;
                    }
                }
                this.cacheServiceLinkList.splice(index, 1);
            },

            //在添加房屋后，服务端会给出本小区房屋的服务链接列表，可以确定添加想要的服务链接
            makeSureAddAll () {
                for (let i = 0; i < this.cacheServiceLinkList.length; i++) {
                    this.addAllServiceLink(this.cacheServiceLinkList[i])
                }
            }
        }
    }
</script>

<style scoped>
    /*边距*/
    #myHouse {
        margin-top: 20px;
        padding-left: 12px;
        padding-right: 12px;
        padding-bottom: 160px;
    }

    /*modal竖向居中*/
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /*更新房屋信息按钮的样式*/
    #updateHouse {
        background-color: transparent;
        color: #2c3e50;
        border-color: #2c3e50;
        border-width: 1px;
        margin-left: 8px;
        padding: 2px 10px 2px 10px;
    }

    /*添加服务信息按钮的样式*/
    #addNewWebsite {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 1px;
        margin-top: 8px;
        padding: 4px 16px 4px 16px;
    }

    #UpdateButton {
        background-color: transparent;
        color: #17b5d2;
        border: none;
        margin-top: 8px;
        padding: 4px 16px 4px 16px;
    }

    #removeButton {
        background-color: transparent;
        color: red;
        border: none;
        margin-top: 8px;
        padding: 4px 16px 4px 16px;
    }

    .url {
        margin: 0;
        position: relative; top: -34px; left: 0;
        color: white;
        width: 100%;
        height: 34px;
        background-color: rgba(44,62,80, 0.5);
        padding: 6px 16px 6px 16px;
    }
</style>