<template>
    <div id="footer">

        <!-- bottom border-->
        <Divider style="margin: 0 0 20px 0"></Divider>

        <!-- bottom some button -->
        <Row>
            <Col span="4">&nbsp;&nbsp;</Col>
            <Col span="16" style="text-align: center">
                <!--                ©-->
                <Button size="small" type="text" style="box-shadow: none;"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">About</Button>
                <Button size="small" type="text" style="box-shadow: none;"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">Serrhub Help</Button>
                <Button size="small" type="text" style="box-shadow: none;" @click="viewPrivacy"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">Privacy&Term</Button>
                <Button size="small" type="text" style="box-shadow: none;"
                        onMouseOut="this.style.color='#515A61'"
                        onMouseOver="this.style.color='#17b5d2'">Contact</Button>
                <Poptip trigger="hover">
                    <Button size="small" type="text" style="box-shadow: none;"
                            onMouseOut="this.style.color='#515A61'"
                            onMouseOver="this.style.color='#17b5d2'">Mobile App</Button>
                    <div class="api" slot="content" style="text-align: center; width: 300px;padding: 12px">
                        <div style="display: inline-block; width: 136px">
                            <b style="color: #17b5d2">Google Play</b>
                            <br/><br/>
                            <img src="../assets/serrhub-www.png"
                                 style="padding: 0;height: 120px; width: 120px; object-fit: cover;" >
                        </div>
                        <div style="width: 4px; display: inline-block"></div>
                        <div style="display: inline-block; width: 136px">
                            <b style="color: #17b5d2">Apple Store</b>
                            <br/><br/>
                            <img src="../assets/serrhub-www.png"
                                 style="padding: 0;height: 120px; width: 120px; object-fit: cover;" >
                        </div>
                    </div>
                </Poptip>
            </Col>
            <Col span="4">&nbsp;&nbsp;</Col>
        </Row>

        <br/>

        <Modal
                fullscreen
                v-model="needViewPrivacy"
                class-name="vertical-center-modal"
                styles="">
            <div style="padding: 32px">
                <Privacy></Privacy>
            </div>
            <div slot="footer" style="text-align: center">
                <div style="width: 240px;margin-left:auto;margin-right: auto;">
                    <Button type="primary" html-type="submit" long @click="needViewPrivacy = false"
                            onMouseOut="this.style.backgroundColor='#17b5d2'"
                            onMouseOver="this.style.backgroundColor='#2c3e50'"
                            style="background-color: #17b5d2; border: 0;box-shadow: none" size="large" >OK</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Privacy from "./Privacy";

    export default {
        name: "Footer",

        data () {
            return {
                needViewPrivacy: false
            };
        },

        components: {
            Privacy
        },

        methods: {
            viewPrivacy () {
                this.needViewPrivacy = true;
            }
        }
    }
</script>

<style scoped>
    /*按钮间隔*/
    Button {
        margin-right: 20px;
        margin-left: 20px;
    }
</style>
