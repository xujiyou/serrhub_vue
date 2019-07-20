<template>
    <div id="footer">
        <Divider style="margin: 0 0 20px 0"></Divider>
        <Row>
            <Col span="4">&nbsp;&nbsp;</Col>
            <Col span="16" style="text-align: center">
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">© applauncher Help</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">safety</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">privacy</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">feedback</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">terms</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">about</Button>
                <Button size="small" type="text"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">mobile</Button>
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
#footer {
    border-top: 1px solid #d8d8d8;
}
Button {
    margin-right: 20px;
    margin-left: 20px;
}
</style>