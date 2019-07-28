<template>
    <div id="serviceLinkList">
        <div>
            <div v-if="JSON.stringify(houseMap[currentHouseId]) === '{}'">
                Sorry, you haven't added the service link yet. Please
                <Button type="text" style="color: #17b5d2" @click="needAddWebsite = true"><b>add a service link</b></Button>
                .
            </div>
            <div style="float: right" v-if="JSON.stringify(houseMap[currentHouseId]) !== '{}'">
                <Button :icon="expand ? 'md-funnel' : 'md-expand'" class="pack"
                        onMouseOut="this.style.borderColor='#D3D6DB'; this.style.color='#D3D6DB'"
                        onMouseOver="this.style.borderColor='#17b5d2'; this.style.color='#17b5d2'"
                @click="expand = !expand"></Button>
            </div>
            <div v-for="(value, key) in houseMap[currentHouseId]">
                <Divider orientation="left" size="small" :dashed="true">
                    <h1>
                        {{key}}
                        <Button v-if="currentHouseId !== ''" type="dashed" size="small" shape="circle" icon="md-create"
                                style="margin-left: 2px"
                                @click="showOption(key)"></Button>
                    </h1>
                </Divider>
                <div v-if="expand">
                    <Row :gutter="16">
                        <Col span="6" v-for="serviceLink in value">
                            <a :href="serviceLink.link" target="_blank" style="text-decoration: none; color: #2D3755">
                                <Card style="margin-bottom: 16px;">
                                    <div style="text-align:left;">
                                        <div>
                                            <img :src="serviceLink.image" style="width: 100%; height: 136px;border-top-left-radius: 4px; border-top-right-radius: 4px; object-fit: cover;" >
                                            <h2 class="url" v-if="/(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link) !== null">
                                                {{
                                                /(\w*\.(?:com|cn|top|org|net))/.exec(serviceLink.link)[0]
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
                            <div v-if="option[key] === true" style="position: absolute; top: 10px; left: 24px; z-index: 10">
                                <Button type="error" shape="circle" size="small" icon="md-close" ghost
                                        style="margin-right: 6px"
                                        @click="confirm(serviceLink.title, serviceLink.link)"></Button>
                                <Button type="info" shape="circle" size="small" icon="md-create" ghost
                                        @click="viewUpdateServiceLinkModel(serviceLink);needUpdateServiceLink = true"></Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
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
                <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="currentServiceLinkInfo" >
                    <FormItem label="Title" :required="true">
                        <Input placeholder="Title" v-model="currentServiceLinkInfo.title"></Input>
                    </FormItem>
                    <FormItem label="Image" :required="true">
                        <Input placeholder="Image" v-model="currentServiceLinkInfo.image"></Input>
                    </FormItem>
                    <FormItem label="Link" :required="true">
                        <Input placeholder="Link" v-model="currentServiceLinkInfo.link"></Input>
                    </FormItem>
                    <FormItem label="Categories" :required="true">
                        <Input placeholder="Categories" v-model="currentServiceLinkInfo.categories"></Input>
                    </FormItem>
                    <FormItem label="contact" :required="true">
                        <Input placeholder="contact" v-model="currentServiceLinkInfo.contact"></Input>
                    </FormItem>
                    <FormItem label="Phone" :required="true">
                        <Input placeholder="Phone" v-model="currentServiceLinkInfo.phone"></Input>
                    </FormItem>
                    <FormItem label="Note" :required="true">
                        <Input placeholder="Note"v-model="currentServiceLinkInfo.note" ></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: center">
                <div style="width: 240px;margin-left:auto;margin-right: auto;">
                    <Button type="primary" long @click="updateServiceLink(() => { needUpdateServiceLink = false; $Message.success('Update house success')})"
                            style="background-color: #17b5d2; border: 0" size="large" >UPDATE SERVICE</Button>
                </div>
            </div>
        </Modal>
        <Modal
                title="Add Service"
                v-model="needAddWebsite"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                width="520">
            <p slot="header" style="text-align: center">
                <span>Add website</span>
            </p>
            <div style="width: 360px;margin-left:auto;margin-right: auto;">
                <Form :label-width="120" ref="formValidate" onsubmit="event.preventDefault()" :model="serviceLinkInfo" >
                    <FormItem label="Title" :required="true">
                        <Input placeholder="Title" v-model="serviceLinkInfo.title"></Input>
                    </FormItem>
                    <FormItem label="Link" :required="true">
                        <Input placeholder="Link" v-model="serviceLinkInfo.link"></Input>
                    </FormItem>
                    <FormItem label="Categories" :required="true">
                        <Input placeholder="Categories" v-model="serviceLinkInfo.categories"></Input>
                    </FormItem>
                    <FormItem label="contact" :required="true">
                        <Input placeholder="contact" v-model="serviceLinkInfo.contact"></Input>
                    </FormItem>
                    <FormItem label="Phone" :required="true">
                        <Input placeholder="Phone" v-model="serviceLinkInfo.phone"></Input>
                    </FormItem>
                    <FormItem label="Note" :required="true">
                        <Input placeholder="Note"v-model="serviceLinkInfo.note" ></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: center">
                <div style="width: 240px;margin-left:auto;margin-right: auto;">
                    <Button type="primary" html-type="submit" long @click="addServiceLink(() => { needAddWebsite = false; $Message.success('Add website success')})"
                            style="background-color: #17b5d2; border: 0" size="large" >ADD NEW SERVICE</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import Vue from 'vue'

    export default {
        name: "ServiceLinkList",
        data: function() {
            return {
                option: {},
                needUpdateServiceLink: false,
                expand: true,
                needAddWebsite: false,
            }
        },
        mounted: function () {
            console.log(this.$route.query.house)
        },
        computed: {
            ...mapGetters('user', {
                houseMap: 'houseMap',
            }),
            ...mapState('user', {
                currentHouseId: 'currentHouseId',
                currentServiceLinkInfo: 'currentServiceLinkInfo',
                serviceLinkInfo: 'serviceLinkInfo',
            })
        },
        methods: {
            ...mapActions('user', [
                'removeServiceLink',
                'viewUpdateServiceLinkModel',
                'updateServiceLink',
                'addServiceLink',
            ]),
            showOption: function(key) {
                Vue.set(this.option,key,!this.option[key]);
                console.log(this.option[key])
            },
            confirm (title, link) {
                this.$Modal.confirm({
                    title: 'Are you sure you want to remove ' + title + ' ?',
                    onOk: () => {
                        this.removeServiceLink({
                            "closeModel": () => this.$Message.success('Remove Success'),
                            "link": link
                        });
                    },
                    onCancel: () => {
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
    #serviceLinkList {
        padding-top: 20px;
        padding-bottom: 160px;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
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
    .pack {

    }
</style>