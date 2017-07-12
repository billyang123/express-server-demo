<template>
<div style="padding:10px 0" ref="tagForm">
    <Form :model="tagForm" :rules="tagRule">
        <Form-item prop="name">
            <Input type="text" v-model="tagForm.name" placeholder="标签名称..."></Input>
        </Form-item>
        <Form-item prop="describe">
            <Input type="textarea" v-model="tagForm.describe" placeholder="标签描述..."></Input>
        </Form-item>
    </Form>
</div>
</template>
<script>
    export default {
        data () {
            return {
                tagForm: {
                    name: '',
                    describe: ''
                },
                tagRule: {
                    name: [
                        { required: true, message: '请填写标签名称', trigger: 'blur' }
                    ],
                    describe: [
                        { required: true, message: '请填写标签描述', trigger: 'blur' },
                        { type: 'string', min: 15, message: '长度不够', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getData() {
                return this.tagForm;
            }
        }
    }
</script>