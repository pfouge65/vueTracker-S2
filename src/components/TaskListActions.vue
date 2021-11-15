<template>
    <el-button size="small" @click="sendCopyTaskname" circle>
        <el-icon size="17px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></svg>
        </el-icon>
    </el-button>
    <el-button size="small" @click="sendRestart" type="primary" circle>
        <el-icon size="17px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"></path></svg>
        </el-icon>
    </el-button>
    <el-button size="small" @click="sendDelete" type="danger" circle>
        <el-icon size="17px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path></svg>
        </el-icon>
    </el-button>
</template>

<script>
    export default {
        props: {
            taskId: {
                type: String,
                required : true 
            },
        },
        emits:['restart', 'delete', 'copyTaskname'],
        methods: {
            sendRestart() {
                // console.log('send Restart TaskListAction ' + this.taskId)
                this.$emit('restart', this.taskId)
            },
            sendDelete(){
                // console.log('send Delete TasklistAction ' + this.taskId)
                this.$emit('delete', this.taskId)
            },
            sendCopyTaskname(){
                console.log('send copyTaskname TasklistAction ' + this.taskId)
                this.$emit('copyTaskname')
            }
        },
    }
</script>

<style lang="scss" scoped>
.el-button{
    height: 30px !important;
    width: 30px !important;
    padding: 0 !important;
    
}
</style>