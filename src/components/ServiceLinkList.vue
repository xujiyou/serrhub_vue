<template>
    <div id="serviceLinkList">
        <div>
            <!-- 如果服务链接为空，给出提示 -->
            <div v-if="JSON.stringify(houseMap[currentHouseId]) === '{}'">
                Sorry, you haven't added the service link yet. Please
                <Button type="text" style="color: #17b5d2" @click="needAddService = true"><b>add a service link</b></Button>
                .
            </div>
            <div style="float: right" v-if="JSON.stringify(houseMap[currentHouseId]) !== '{}'">
                <!-- 折叠按钮 -->
                <Button :icon="expand ? 'md-funnel' : 'md-expand'" style="box-shadow: none;background-color: transparent"
                        onMouseOut="this.style.borderColor='#D3D6DB'; this.style.color='#D3D6DB'"
                        onMouseOver="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'"
                @click="expand = !expand"></Button>
            </div>
            <div v-for="(value, key) in houseMap[currentHouseId]">
                <Divider orientation="left" size="small" :dashed="true" style="padding-bottom: 8px; padding-top: 6px">
                    <!-- 展示类别 -->
                    <h4>
                        {{key}}
                    </h4>
                </Divider>
                <!-- 是否折叠 -->
                <transition name="slide-fade">
                    <div v-if="expand">
                        <Row :gutter="16">
                            <Col span="6" v-for="serviceLink in value">
                                <a :href="serviceLink.link" target="_blank" style="text-decoration: none; color: #2D3755; cursor: pointer;">
                                    <Card style="margin-bottom: 16px;padding: 0">
                                        <div style="text-align:left;padding: 0">
                                            <div style="padding: 0; margin: 0; border: 0">
                                                <!-- 服务图片 -->
                                                <img :src="getImage(serviceLink)"
                                                     style="padding: 0;width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px; object-fit: cover;" >
                                                <!-- 服务链接 -->
                                                <p class="url" v-if="/(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link) === null">
                                                    <b>Service Link</b>
                                                </p>
                                                <p class="url" v-if="/(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link) !== null">
                                                    <b>{{
                                                        /(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link)[0]
                                                        }}</b>
                                                </p>
                                            </div>
                                            <!-- 服务标题 -->
                                            <p style="padding: 0 16px 2px 16px"><b>{{serviceLink.title}}</b></p>
                                            <!-- 创建日期 -->
                                            <p style="padding: 0 16px 12px 16px; color: #9A9A9C" v-if="serviceLink.createDate !== null && serviceLink.createDate !== undefined">
                                                Added on {{serviceLink.createDate.substring(0, 10)}}
                                            </p>

                                        </div>
                                    </Card>
                                </a>
                                <!-- 两个服务操作按钮 -->
                                <div v-if="currentHouseId !== ''" style="position: absolute; top: 12px; left: 8px; z-index: 10">
                                    <Dropdown style="padding-left: 16px; text-align: center;">
                                        <Button size="small"
                                                style="color: #17b5d2; border: none; box-shadow: none; background-color: rgba(255, 255, 255, 0.8)"
                                                onMouseOut="this.style.color='#17b5d2'"
                                                onMouseOver="this.style.color='#2c3e50'">
                                            <Icon type="ios-arrow-down" size="10"></Icon>
                                        </Button>
                                        <Dropdown-menu slot="list">
                                            <Upload action="https://boot.serrhub.com/api/image/upload"
                                                    :headers="{'Authorization': 'serrhub' + token}"
                                                    :show-upload-list="false"
                                                    name="file"
                                                    :on-success="uploadSuccess"
                                                    :on-exceeded-size="bigFile"
                                                    style="cursor:pointer;"
                                                    :max-size="512">
                                                <Button shape="circle" id="UpdateImageButton" style="box-shadow: none;"
                                                        @click="setCurrentServiceLink(serviceLink)"
                                                        onMouseOver="this.style.borderColor='#2c3e50'; this.style.color='#2c3e50'"
                                                        onMouseOut="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'">
                                                    <b>Update image</b>
                                                </Button>
                                            </Upload>
                                            <Button shape="circle" id="UpdateButton" style="box-shadow: none;"
                                                    @click="setCurrentServiceLink(serviceLink);needUpdateServiceLink = true"
                                                    onMouseOver="this.style.borderColor='#2c3e50'; this.style.color='#2c3e50'"
                                                    onMouseOut="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'">
                                                <b>Edit</b>
                                            </Button>
                                            <br/>
                                            <Button shape="circle" id="removeButton" style="margin-bottom: 10px;box-shadow: none;"
                                                    @click="confirm(serviceLink.title, serviceLink.link)"
                                                    onMouseOver="this.style.borderColor='#2c3e50'; this.style.color='#2c3e50'"
                                                    onMouseOut="this.style.borderColor='red'; this.style.color='red'">
                                                <b>Remove</b>
                                            </Button>
                                        </Dropdown-menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </transition>
            </div>

<!--            <InArticleAdsense-->
<!--                    data-ad-client="ca-pub-9144523027625187"-->
<!--                    data-ad-slot="1234567890">-->
<!--            </InArticleAdsense>-->
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
                        onMouseOut="this.style.backgroundColor='#17b5d2'"
                        onMouseOver="this.style.backgroundColor='#2c3e50'"
                        style="background-color: #17b5d2; border: 0;box-shadow: none" size="large" >UPDATE SERVICE</Button>
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
                        onMouseOut="this.style.backgroundColor='#17b5d2'"
                        onMouseOver="this.style.backgroundColor='#2c3e50'"
                        style="background-color: #17b5d2; border: 0;box-shadow: none" size="large" >ADD NEW SERVICE</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        name: "ServiceLinkList",

        data: function() {
            return {
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
                userInfo: 'userInfo',
                token: 'token',
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

            getImage (serviceLink) {
                if (serviceLink.image === null || serviceLink.image === '' || serviceLink.image === undefined) {
                    return 'https://boot.serrhub.com/api/image/id/5d6cddf4e1787e1e3162cf7d';
                } else {
                    return serviceLink.image;
                }
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
                        this.$Message.success('Update service success')
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
            },

            //update avatar success，replace user avatar
            uploadSuccess (response, file, fileList) {
                this.currentServiceLinkInfo.image = response;
                this.wantUpdateServiceLink();
                this.$Message.success('Upload service image success.')
            },

            //image is big
            bigFile () {
                this.$Message.error('Files are too large and the maximum limit is 512 KB.')
            },
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
        margin-bottom: -24px;
        position: relative;
        top: -34px;
        left: 0;
        bottom: 30px;
        color: white;
        width: 100%;
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        background-color: rgba(44,62,80, 0.5);
        padding: 0 16px 0 16px;
    }

    #UpdateButton {
        background-color: transparent;
        color: #17b5d2;
        border: none;
        margin-top: 8px;
        padding: 4px 16px 4px 16px;
    }

    #UpdateImageButton {
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

    .ivu-divider-horizontal.ivu-divider-with-text-left:before {
        width: 1%;
    }

    .slide-fade-enter-active {
        transition: all .4s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(120px);
        opacity: 0;
    }
</style>