<template>
    <div id="search">
        <Row>
            <Col span="4">&nbsp;</Col>
            <Col span="16">
                <Row>
                    <Col span="18" id="shadow">
                        <Dropdown style="width: 20%; text-align: center; height: 100%;" placement="bottom-start" v-on:on-click="switchType">
                            <a href="javascript:void(0)" style="color: #172140;font-size: 16px;">
                                {{type}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="Categories" :selected="type === 'Categories'">Categories</DropdownItem>
                                <DropdownItem name="Title" :selected="type === 'Title'">Title</DropdownItem>
                                <DropdownItem name="Link" :selected="type === 'Link'">Link</DropdownItem>
                                <DropdownItem name="Contact" :selected="type === 'Contact'">Contact</DropdownItem>
                                <DropdownItem name="Contact Phone" :selected="type === 'Contact Phone'">Contact Phone</DropdownItem>
                                <DropdownItem name="Note" :selected="type === 'Note'">Note</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Divider type="vertical" style="width: 1px; height: 50px;"/>

                        <input placeholder="SEARCH FOR SERVICE" style="width: 74%; height: 100%;" v-model="text"/>
                    </Col>
                    <Col span="6" id="searchButtonCol">
                        <Button type="info" style="width: 100%;height: 60px;" id="searchButton" @click="search">
                            <b>SEARCH</b>
                        </Button>
                    </Col>
                </Row>

            </Col>
            <Col span="4">&nbsp;</Col>
        </Row>

        <Modal
                title="Search Result"
                v-model="needShowSearchResult"
                class-name="vertical-center-modal"
                :styles="{top: '0px'}"
                :scrollable="true"
                ok-text="OK"
                cancel-text="cancel"
                width="860">
            <p slot="header" style="text-align: center">
                <span>Search Result</span>
            </p>
            <div style="">
                <Row :gutter="16">
                    <Col span="6" v-for="serviceLink in searchServiceLinkResult">
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
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Search",
        data: function () {
            return {
                needShowSearchResult: false,
                type: "Categories",
                text: "",
                searchServiceLinkResult: []
            }
        },
        computed: {
            ... mapState({
                userInfo: state => state.user.userInfo
            }),
        },
        methods: {
            switchType: function (value) {
                this.type = value;
            },
            ...mapActions('user', [
                'searchServiceLink'
            ]),
            search: function () {
                this.searchServiceLinkResult = [];
                if (this.userInfo.userId === "") {
                    let serviceLinkList = this.userInfo.houseList[0].serviceLinkList;
                    for (let i = 0; i < serviceLinkList.length; i++) {
                        let serviceLink = serviceLinkList[i];
                        switch (this.type) {
                            case "Categories" :
                                if (serviceLink.categories.toLowerCase().indexOf(this.text.toLowerCase()) !== -1) {this.searchServiceLinkResult.push(serviceLink)}
                                break;
                            case "Title":
                                if (serviceLink.title.toLowerCase().indexOf(this.text.toLowerCase()) !== -1) {this.searchServiceLinkResult.push(serviceLink)}
                                break;
                            case "Link":
                                if (serviceLink.link.toLowerCase().indexOf(this.text.toLowerCase()) !== -1) {this.searchServiceLinkResult.push(serviceLink)}
                                break;
                        }
                    }
                    this.needShowSearchResult = true
                } else {
                    this.searchServiceLink({
                        "type": this.type,
                        "text": this.text,
                        "callback": (result) => {
                            if (result.length === 0) {
                                this.$Message.info('There is no relevant service link');
                            } else {
                                this.searchServiceLinkResult = result;
                                this.needShowSearchResult = true
                            }
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #search{
        min-width: 1300px;
    }
    #shadow {
        background-color: #fff;
        border: #17b5d2 solid 1px;
        border-radius: 8px;
        height: 60px;
    }
    input {
        border-radius: 8px;
        background-color: #fff;
        outline: none;
        border: none;
        font-size: 16px;
        padding-left: 10px;
    }
    #searchButtonCol {
        padding-left: 20px;
    }
    #searchButton {
        border-radius: 8px;
        background-color: #17b5d2;
        font-size: 18px;
    }
</style>