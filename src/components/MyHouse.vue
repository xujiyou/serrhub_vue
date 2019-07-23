<template>
    <div id="myHouse">
        &nbsp;
        <div v-if="userInfo.userId !== ''">
            <h2>
                My House
                &nbsp;
                <Button type="dashed" size="small" shape="circle" icon="md-add" @click="needAddHouse = true"></Button>
            </h2>
            <br/>
            <Collapse simple accordion :value="currentHouseId" v-on:on-change="seeServiceLike">
                <Panel :name="house.houseId" v-for="house in userInfo.houseList">
                    {{house.houseName}}
                    <p slot="content">
                        <br/>
                        <b>Address:</b> {{house.address}}
                        <br/>
                        <b>Community name:</b> {{house.communityName}}
                        <br/><br/>
                        <Button type="error" shape="circle" size="small" icon="md-close" ghost @click="viewUpdateHouseModel(house);confirm()"></Button>
                        &nbsp;&nbsp;
                        <Button shape="circle" id="addNewWebsite"
                                @click="viewUpdateHouseModel(house); needUpdateHouse = true"
                                onMouseOut="this.style.backgroundColor='transparent'"
                                onMouseOver="this.style.backgroundColor='#f5f5f5'">
                            <b>UPDATE</b>
                        </Button>

                    </p>
                </Panel>
            </Collapse>
            <Modal
                    title="Add house"
                    v-model="needAddHouse"
                    class-name="vertical-center-modal"
                    :styles="{top: '0px'}"
                    width="520">
                <p slot="header" style="text-align: center">
                    <span>Add house</span>
                </p>
                <div style="width: 360px;margin-left:auto;margin-right: auto;">
                    <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="houseInfo" >
                        <FormItem label="House name" :required="true">
                            <Input placeholder="House name" v-model="houseInfo.houseName"></Input>
                        </FormItem>
                        <FormItem label="Address" :required="true">
                            <Input placeholder="Address" v-model="houseInfo.address"></Input>
                        </FormItem>
                        <FormItem label="Community name" :required="true">
                            <Input placeholder="Community name" v-model="houseInfo.communityName"></Input>
                        </FormItem>
                        <FormItem label="Note" :required="true">
                            <Input placeholder="Note"v-model="houseInfo.note" ></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align: center">
                    <div style="width: 240px;margin-left:auto;margin-right: auto;">
                        <Button type="primary" html-type="submit" long @click="add"
                                style="background-color: #17b5d2; border: 0" size="large" >ADD HOUSE</Button>
                    </div>
                </div>
            </Modal>
            <Modal
                    title="Update house"
                    v-model="needUpdateHouse"
                    class-name="vertical-center-modal"
                    :styles="{top: '0px'}"
                    width="520">
                <p slot="header" style="text-align: center">
                    <span>Update house</span>
                </p>
                <div style="width: 360px;margin-left:auto;margin-right: auto;">
                    <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="currentHouseInfo" >
                        <FormItem label="House name" :required="true">
                            <Input placeholder="House name" v-model="currentHouseInfo.houseName"></Input>
                        </FormItem>
                        <FormItem label="Address" :required="true">
                            <Input placeholder="Address" v-model="currentHouseInfo.address"></Input>
                        </FormItem>
                        <FormItem label="Community name" :required="true">
                            <Input placeholder="Community name" v-model="currentHouseInfo.communityName"></Input>
                        </FormItem>
                        <FormItem label="Note" :required="true">
                            <Input placeholder="Note"v-model="currentHouseInfo.note" ></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align: center">
                    <div style="width: 240px;margin-left:auto;margin-right: auto;">
                        <Button type="primary" html-type="submit" long @click="updateHouse(() => { needUpdateHouse = false; $Message.success('Update house success')})"
                                style="background-color: #17b5d2; border: 0" size="large" >UPDATE HOUSE</Button>
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
                                            <img :src="serviceLink.image" style="width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px">
                                            <h2 style="position: relative; top: -34px; left: 16px; color: white" v-if="/(\w*\.(?:com|cn|top))/.exec(serviceLink.link) !== null">
                                                {{
                                                /(\w*\.(?:com|cn|top))/.exec(serviceLink.link)[0]
                                                }}
                                            </h2>
                                        </div>
                                        <div style="position: relative; top: -8px;">
                                            <p style="padding: 0 16px 2px 16px"><b>{{serviceLink.title}}</b></p>
                                            <p style="padding: 0 16px 12px 16px; color: #9A9A9C">Due day {{serviceLink.createDate.substring(0, 10)}}</p>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                            <div style="position: absolute; top: 10px; left: 24px; z-index: 10">
                                <Button type="error" shape="circle" size="small" icon="md-close" ghost
                                        style="margin-right: 6px"
                                        @click="removeServiceFromArray(serviceLink)"></Button>
                            </div>
                        </Col>
                    </Row>
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
                needAddHouse: false,
                needUpdateHouse: false,
                showChooseService: false,
                cacheServiceLinkList: []
            }
        },
        computed: {
            ... mapState({
                userInfo: state => state.user.userInfo,
                houseInfo: state => state.user.houseInfo,
                currentHouseInfo: state => state.user.currentHouseInfo,
                currentHouseId: state => state.user.currentHouseId,
            }),
        },
        methods: {
            ...mapActions('user', [
                'viewAddHouseModel',
                'viewUpdateHouseModel',
                'addHouse',
                'updateHouse',
                'removeHouse',
                'seeServiceLike',
                'addAllServiceLink'
            ]),
            add () {
                this.addHouse((serviceLinkList) => {
                    console.log("serviceLinkList: " + serviceLinkList);
                    this.needAddHouse = false;
                    this.$Message.success('Add house success');
                    if (serviceLinkList.length !== 0) {
                        this.cacheServiceLinkList = serviceLinkList;
                        this.showChooseService = true;
                    }
                })
            },
            confirm () {
                this.$Modal.confirm({
                    title: 'Are you sure you want to remove ' + this.currentHouseInfo.houseName + ' ?',
                    onOk: () => {
                        this.removeHouse(() => this.$Message.success('Remove Success'));
                    },
                    onCancel: () => {
                        this.$Message.info('Cancel remove');
                    },
                    okText: 'Remove',
                    cancelText: 'Cancel'
                });
            },
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
            makeSureAddAll () {
                for (let i = 0; i < this.cacheServiceLinkList.length; i++) {
                    this.addAllServiceLink(this.cacheServiceLinkList[i])
                }
            }
        }
    }
</script>

<style scoped>
    #myHouse {
        margin-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 160px;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #addNewWebsite {
        background-color: transparent;
        color: #17b5d2;
        border-color: #17b5d2;
        border-width: 1px;
        padding: 2px 8px 2px 8px;
    }
    .ivu-btn-primary {
        background-color: red;
    }
</style>