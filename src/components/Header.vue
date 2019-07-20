<template>
    <div id="header">
        <div id="myInfo">
            <Button shape="circle" type="text" id="myAccount"
                    onMouseOut="this.style.color='#515A61'"
                    onMouseOver="this.style.color='#17b5d2'" >
                <b>MY ACCOUNT</b>
            </Button>
            <Button shape="circle" id="addNewWebsite"
                    onMouseOut="this.style.backgroundColor='transparent'"
                    onMouseOver="this.style.backgroundColor='#fff'"
                    @click="needAddWebsite = true">
                <b>ADD NEW SERVICE</b>
            </Button>
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
                title="Add website"
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
                    <FormItem label="Image" :required="true">
                        <Input placeholder="Image" v-model="serviceLinkInfo.image"></Input>
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
                            style="background-color: #17b5d2; border: 0" size="large" >ADD WEBSITE</Button>
                </div>
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
                needAddWebsite: false,
            }
        },
        computed: {
            ... mapState({
                serviceLinkInfo: state => state.user.serviceLinkInfo
            }),
        },
        methods: {
            ...mapActions('user', [
                'addServiceLink'
            ]),
        }
    }
</script>

<style scoped>
    #header {
        height: 300px;
        width: 100%;
        background-size: cover;
        background-image: url("../assets/chilun.jpg");
        background-color: #fff;
        background-repeat: no-repeat;
    }
    #myInfo {
        padding-top: 30px;
        text-align: right;
    }
    #myAccount {
        border-width: 2px;
        padding: 10px 16px 10px 16px;
        margin-right: 20px;
    }
    #addNewWebsite {
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