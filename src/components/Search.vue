<template>
    <div id="search">
        <Row>
            <Col span="4">&nbsp;</Col>
            <Col span="16">
                <Row>
                    <Col span="18" id="shadow">
                        <Dropdown style="width: 16%; text-align: center; height: 100%;">
                            <a href="javascript:void(0)" style="color: #172140;font-size: 16px;">
                                Categories
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem disabled>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem divided>北京烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Divider type="vertical" style="width: 1px; height: 50px;"/>

                        <input placeholder="SEARCH FOR WEBSITE" style="width: 78%; height: 100%;" />
                    </Col>
                    <Col span="6" id="searchButtonCol">
                        <Button type="info" style="width: 100%;height: 60px;" id="searchButton">
                            <b>SEARCH</b>
                        </Button>
                    </Col>
                </Row>

            </Col>
            <Col span="4">&nbsp;</Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "Search"
    }
</script>

<style scoped>
    #search{
        min-width: 1300px;
    }
    #shadow {
        background-color: #fff;
        box-shadow: 2px 5px 4px -4px rgba(6,6,6,.0), 2px 4px 4px 2px rgba(6,6,6,.20), 2px 3px 5px 2px rgba(6,6,6,.12);
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
        box-shadow: 2px 5px 4px -4px rgba(0,0,0,.2), 2px 4px 4px 2px rgba(0,0,0,.14), 2px 3px 5px 2px rgba(0,0,0,.12);
        border-radius: 8px;
        background-color: #17b5d2;
        font-size: 18px;
    }
</style>