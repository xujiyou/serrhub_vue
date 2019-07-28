<template>
    <div id="search">
        <Row>
            <Col span="4">&nbsp;</Col>
            <Col span="16">
                <Row>
                    <Col span="18" id="shadow">
                        <!--类型选择-->
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
                        <!--分割线-->
                        <Divider type="vertical" style="width: 1px; height: 50px;"/>
                        <!--搜索框-->
                        <input placeholder="SEARCH FOR SERVICE" style="width: 74%; height: 100%;" v-model="text"/>
                    </Col>
                    <Col span="6" id="searchButtonCol">
                        <!--搜索按钮-->
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
                needShowSearchResult: false, //是否展示搜索结果，搜索完再展示
                type: "Categories", //当前搜索类型
                text: "", //要搜索的内容
                searchServiceLinkResult: [] //搜索结果列表
            }
        },
        computed: {
            ... mapState({
                userInfo: state => state.user.userInfo //用户信息
            }),
        },
        methods: {
            ...mapActions('user', [
                'searchServiceLink' //开始搜索
            ]),
            //切换搜索类型
            switchType: function (value) {
                this.type = value;
            },
            search: function () {
                //先将结果置为空数组，避免展示上次搜索的结果
                this.searchServiceLinkResult = [];
                if (this.userInfo.userId === "") {
                    //如果是未登录状态，从公共数据中搜索
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
                    //如果是登录状态，从服务端搜索
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
    /*设置搜索框最小宽度*/
    #search{
        min-width: 1300px;
    }

    /*横条样式*/
    #shadow {
        background-color: #fff;
        border: #17b5d2 solid 1px;
        border-radius: 8px;
        height: 60px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08)
    }

    /*搜索框样式*/
    input {
        border-radius: 8px;
        background-color: #fff;
        outline: none;
        border: none;
        font-size: 16px;
        padding-left: 10px;
    }

    /*搜索按钮距离左侧搜索框20个像素*/
    #searchButtonCol {
        padding-left: 20px;
    }

    /*搜索按钮样式*/
    #searchButton {
        border-radius: 8px;
        background-color: #17b5d2;
        font-size: 18px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08)
    }
</style>