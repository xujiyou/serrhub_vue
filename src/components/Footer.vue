<template>
    <div id="footer">

        <!-- bottom border-->
        <Divider style="margin: 0 0 20px 0"></Divider>

        <!-- bottom some button -->
        <Row>
            <Col span="4">&nbsp;&nbsp;</Col>
            <Col span="16" style="text-align: center">
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">© Serrhub Help</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">Privacy&Term</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">About</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">Contact</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">Mobile App</Button>
            </Col>
            <Col span="4">&nbsp;&nbsp;</Col>
        </Row>

        <br/>

    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    /*按钮间隔*/
    Button {
        margin-right: 20px;
        margin-left: 20px;
    }
</style>
