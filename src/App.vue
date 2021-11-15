<template>
  <el-container class="mainContainer">
    <el-aside width="200px">
      <TheMenue />
    </el-aside>

    <el-container>
      <el-header height="60px">
        <TheTopTask ref="TheTopTask" @newTask="addTask($event)"/>
      </el-header>

      <el-main>
        <TaskList :tasks="tasks" :areTasksLoading="areTasksLoading" v-on="{
          restart: sendRestartTask,
          delete: deleteTask
        }" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { v4 as uuid } from '@lukeed/uuid';

import * as TaskService from './services/TaskService'

import TaskList from './components/TaskList.vue'
import TheMenue from './components/TheMenue.vue'
import TheTopTask from './components/TheTopTask.vue'


export default{
  components: {
    TheMenue,
    TheTopTask,
    TaskList,
  },
  data() {
    return {
      tasks: [],
      areTasksLoading: true
    }
  },
  methods: {
    async addTask({ name, startTime }) {
      this.tasks.unshift({
        id: uuid(),
        name, 
        startTime,
        endTime: Date.now()
        })
        console.log(this.tasks[0].id)
        console.log(this.tasks[0].name)
        console.log(this.tasks[0].startTime)
        console.log(this.tasks[0].endTime)

        try{
        await TaskService.updateAll(this.tasks)
        }catch(e){
          console.error(e)
        }
    },
    sendRestartTask(taskId){
      
      // Récupération du nom de l'ancienne tâche
      let newTaskname = null
      this.tasks.forEach(task => {
        if (task.id === taskId) {
          newTaskname = task.name
        }
      })

      this.$refs.TheTopTask.restartTask(newTaskname)

    },
    async deleteTask (taskId) {
      // console.log('delete ' + taskID)
      let taskIndex = null
      this.tasks.forEach((task, index) => {
        if (task.id === taskId) {
          taskIndex = index
        }
      })

      this.tasks.splice(taskIndex, 1)

      try{
      await TaskService.updateAll(this.tasks)
      }catch(e){
        console.error(e)
      }
    },
  },
  async created() {
    try{
    this.tasks = await TaskService.getAll()

    }catch(e){
      console.error(e)
    }
    this.areTasksLoading = false
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
}
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mainContainer{
  height: 100%;
}
.el-header {
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding: 0 !important;
  border-bottom: solid 1px #e6e6e6;
  .el-input .el-input__inner{
    border: none !important;
  }
}
.el-aside {
  color: var(--el-text-color-primary);
  border-right: solid 1px #e6e6e6;

}
</style>

