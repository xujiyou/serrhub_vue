<template>
    <div id="serviceLinkList">
        <div>
            <adsense
                    ad-client="ca-pub-9144523027625187"
                    ad-slot="9144523027625187"
                    ad-style="display: block"
                    ad-format="auto">
            </adsense>
            <!-- 如果服务链接为空，给出提示 -->
            <div v-if="JSON.stringify(houseMap[currentHouseId]) === '{}'">
                Sorry, you haven't added the service link yet. Please
                <Button type="text" style="color: #17b5d2" @click="needAddService = true"><b>add a service link</b></Button>
                .
            </div>
            <div style="float: right" v-if="JSON.stringify(houseMap[currentHouseId]) !== '{}'">
                <!-- 折叠按钮 -->
                <Button :icon="expand ? 'md-funnel' : 'md-expand'"
                        onMouseOut="this.style.borderColor='#D3D6DB'; this.style.color='#D3D6DB'"
                        onMouseOver="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'"
                @click="expand = !expand"></Button>
            </div>
            <div v-for="(value, key) in houseMap[currentHouseId]">
                <Divider orientation="left" size="small" :dashed="true" style="padding-bottom: 8px; padding-top: 6px">
                    <!-- 展示类别 -->
                    <h2>
                        {{key}}
                        <!-- 是否展示服务的操作按钮 -->
                        <Button v-if="currentHouseId !== ''" type="dashed" size="small" shape="circle" icon="md-create"
                                style="margin-left: 2px"
                                @click="showOption(key)"></Button>
                    </h2>
                </Divider>
                <!-- 是否折叠 -->
                <div v-if="expand">
                    <Row :gutter="16">
                        <Col span="6" v-for="serviceLink in value">
                            <a :href="serviceLink.link" target="_blank" style="text-decoration: none; color: #2D3755">
                                <Card style="margin-bottom: 16px;">
                                    <div style="text-align:left;">
                                        <div>
                                            <!-- 服务图片 -->
                                            <img :src="serviceLink.image" style="width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px; object-fit: cover;" >
                                            <!-- 服务链接 -->
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
                                            <!-- 服务标题 -->
                                            <p style="padding: 0 16px 2px 16px"><b>{{serviceLink.title}}</b></p>
                                            <!-- 创建日期 -->
                                            <p style="padding: 0 16px 12px 16px; color: #9A9A9C">Added on {{serviceLink.createDate.substring(0, 10)}}</p>
                                        </div>
                                    </div>
                                </Card>
                            </a>
                            <!-- 两个服务操作按钮 -->
                            <div v-if="option[key] === true" style="position: absolute; top: 10px; left: 24px; z-index: 10">
                                <Button type="error" shape="circle" size="small" icon="md-close" ghost
                                        style="margin-right: 6px"
                                        @click="confirm(serviceLink.title, serviceLink.link)"></Button>
                                <Button type="info" shape="circle" size="small" icon="md-create" ghost
                                        @click="setCurrentServiceLink(serviceLink);needUpdateServiceLink = true"></Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

        <!-- 更新服务信息 -->
        <Modal
                title="Update service"
                v-model="needUpdateServiceLink"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                width="520">
            <p slot="header" style="text-align: center">
                <span>Update service</span>
            </p>
            <div style="width: 360px;margin-left:auto;margin-right: auto;">
                <div v-if="checkUpdateServiceError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                    Please fill in the necessary information.
                </div>
                <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="currentServiceLinkInfo" >
                    <FormItem label="Title" :required="true">
                        <Input placeholder="Title" v-model="currentServiceLinkInfo.title"></Input>
                    </FormItem>
                    <FormItem label="Image" :required="true">
                        <Input placeholder="Image" v-model="currentServiceLinkInfo.image"></Input>
                    </FormItem>
                    <div v-if="checkUpdateLinkError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                        Link not accessible.
                    </div>
                    <FormItem label="Link" :required="true">
                        <Input placeholder="Link" v-model="currentServiceLinkInfo.link"></Input>
                    </FormItem>
                    <FormItem label="Categories" :required="true">
                        <Input placeholder="Categories" v-model="currentServiceLinkInfo.categories"></Input>
                    </FormItem>
                    <FormItem label="contact">
                        <Input placeholder="contact" v-model="currentServiceLinkInfo.contact"></Input>
                    </FormItem>
                    <FormItem label="Phone">
                        <Input placeholder="Phone" v-model="currentServiceLinkInfo.phone"></Input>
                    </FormItem>
                    <FormItem label="Note">
                        <Input placeholder="Note"v-model="currentServiceLinkInfo.note" ></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: center">
                <div style="width: 240px;margin-left:auto;margin-right: auto;">
                    <Button type="primary" long @click="wantUpdateServiceLink" :loading="loadingUpdateService"
                            style="background-color: #17b5d2; border: 0" size="large" >UPDATE SERVICE</Button>
                </div>
            </div>
        </Modal>

        <!-- 添加服务按钮，代码同Header中的添加服务按钮，只有在服务为空时才会有机会弹出这个modal -->
        <Modal
                title="Add Service"
                v-model="needAddService"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                width="520">
            <p slot="header" style="text-align: center">
                <span>Add website</span>
            </p>
            <div style="width: 360px;margin-left:auto;margin-right: auto;">
                <div v-if="checkAddServiceError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                    Please fill in the necessary information.
                </div>
                <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="serviceLinkInfo" >
                    <FormItem label="Title" :required="true">
                        <Input placeholder="Title" v-model="serviceLinkInfo.title"></Input>
                    </FormItem>
                    <div v-if="checkLinkError" style="color: red;padding-left: 120px; padding-bottom: 10px;">
                        Link not accessible.
                    </div>
                    <FormItem label="Link" :required="true">
                        <Input placeholder="Link" v-model="serviceLinkInfo.link"></Input>
                    </FormItem>
                    <FormItem label="Categories" :required="true">
                        <Input placeholder="Categories" v-model="serviceLinkInfo.categories"></Input>
                    </FormItem>
                    <FormItem label="contact">
                        <Input placeholder="contact" v-model="serviceLinkInfo.contact"></Input>
                    </FormItem>
                    <FormItem label="Phone">
                        <Input placeholder="Phone" v-model="serviceLinkInfo.phone"></Input>
                    </FormItem>
                    <FormItem label="Note">
                        <Input placeholder="Note"v-model="serviceLinkInfo.note" ></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: center">
                <div style="width: 240px;margin-left:auto;margin-right: auto;">
                    <Button type="primary" html-type="submit" long @click="wantAddService" :loading="loadingAddService"
                            style="background-color: #17b5d2; border: 0" size="large" >ADD NEW SERVICE</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import Vue from 'vue'
    import VueAdsense from 'vue-adsense'

    Vue.component('adsense', VueAdsense);

    export default {
        name: "ServiceLinkList",
        data: function() {
            return {
                option: {}, //是否展示各个分类的服务的修改删除按钮
                needUpdateServiceLink: false, //是否展示修改modal的按钮
                expand: true, //是否折叠
                needAddService: false, //展示添加服务的modal
                loadingAddService: false,
                loadingUpdateService: false,
                checkAddServiceError: false,
                checkLinkError: false,
                checkUpdateServiceError: false,
                checkUpdateLinkError: false
            }
        },
        computed: {
            ...mapGetters('user', {
                houseMap: 'houseMap', //组装的房屋-服务数据结构
            }),
            ...mapState('user', {
                currentHouseId: 'currentHouseId', //当前房屋ID，用于展示不同房屋的链接
                currentServiceLinkInfo: 'currentServiceLinkInfo', //当前要修改的服务的信息
                serviceLinkInfo: 'serviceLinkInfo', //要添加的服务的信息
            })
        },
        methods: {
            ...mapActions('user', [
                'removeServiceLink', //删除服务
                'setCurrentServiceLink',  //展示修改服务的modal
                'updateServiceLink', //修改服务
                'addServiceLink', //添加服务
            ]),
            //是否展示修改，删除服务的按钮
            showOption: function(key) {
                Vue.set(this.option,key,!this.option[key]);
            },
            //添加服务，由于添加服务很耗时，所以将按钮置为等待，添加成功后将按钮置为正常，下次再添加时，按钮还是正常的
            wantAddService () {
                this.checkAddServiceError = false;
                this.checkLinkError = false;
                if (this.serviceLinkInfo.title === "" || this.serviceLinkInfo.link === "" || this.serviceLinkInfo.categories === "") {
                    this.checkAddServiceError = true;
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
            wantUpdateServiceLink () {
                this.checkUpdateServiceError = false;
                this.checkUpdateLinkError = false;
                if (this.currentServiceLinkInfo.title === "" || this.currentServiceLinkInfo.link === "" || this.currentServiceLinkInfo.categories === "") {
                    this.checkUpdateServiceError = true;
                    return;
                }
                this.loadingUpdateService = true;
                this.updateServiceLink({
                    "closeModel": () => {
                        this.needUpdateServiceLink = false;
                        this.loadingUpdateService = false;
                        this.$Message.success('Update house success')
                    },
                    "linkErrorCallBack": () => {
                        this.checkUpdateLinkError = true;
                        this.loadingUpdateService = false;
                        this.$Message.error('Link not accessible.')
                    }
                })
            },
            //询问是否删除服务
            confirm (title, link) {
                this.$Modal.confirm({
                    title: 'Are you sure you want to remove ' + title + ' ?',
                    onOk: () => {
                        //删除服务
                        this.removeServiceLink({
                            "closeModel": () => this.$Message.success('Remove Success'),
                            "link": link
                        });
                    },
                    onCancel: () => {
                        //取消删除
                        this.$Message.info('Cancel remove');
                    },
                    okText: 'Remove',
                    cancelText: 'Cancel'
                });
            }
        }
    }
</script>

<style scoped>
    /*距离顶部20px，距离底部160px，避免被底部遮挡*/
    #serviceLinkList {
        padding-top: 20px;
        padding-bottom: 160px;
    }
    /*modal框竖向居中*/
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /*网址链接样式*/
    .url {
        margin: 0;
        position: relative; top: -34px; left: 0;
        color: white;
        width: 100%;
        height: 34px;
        background-color: rgba(44,62,80, 0.5);
        padding: 6px 16px 6px 16px;
    }
    .ivu-divider-horizontal.ivu-divider-with-text-left:before {
        width: 1%;
    }
</style>