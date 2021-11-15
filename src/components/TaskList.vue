<template>
  <el-table v-loading="areTasksLoading" :data="tasks" row-key="id" empty-text="Aucune tâche" stripe style="width: 100%">

    <el-table-column prop="name" label="Tâche"></el-table-column>

    <el-table-column align="right" label="Début et fin" width="150">
      <template #header></template>
      <template #default="scope">
          {{ formatTimestamp(scope.row.startTime) }} - {{ formatTimestamp(scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column align="right" prop="endTime" label="Durée" width="100">
      <template #header></template>
      <template #default="scope">
          {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column align="right" label="Actions" width="200">      
      <template #header></template>
      <template #default="scope">
        <TaskListActions :taskId='scope.row.id' v-on="{
          restart: sendRestart,
          delete: sendDelete
        }"
        @copyTaskname="copyToClipboard(scope.row.name)"
        />
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
  import TaskListActions from "./TaskListActions.vue"

  export default {
      components: {
        TaskListActions,
      },
      emits:['restart', 'delete'],
      data() {
          return {
            tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit' }),

          }
      },
    props: {
      tasks: {
        type: Array,
        default: []
      },
      areTasksLoading: {
        type: Boolean,
        required: true
      }
    },
    methods: {
        formatTimestamp (ts) {
          return this.tsFormatter.format(ts)
        },
        durationBetweenTimestamps (start, end) {
          let seconds = Math.floor((end / 1000) - (start / 1000))
          let minutes = Math.floor(seconds / 60)
          const hours = Math.floor(minutes / 60)
          seconds = seconds % 60
          minutes = minutes % 60
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        },
        sendRestart(data){
          console.log('send restart TaskList ' + data)
          this.$emit('restart', data)
        },
        sendDelete(data){
          // console.log('send delete TaskList ' + data)
          this.$emit('delete', data)
        },
        copyToClipboard(text){
          navigator.clipboard.writeText(text)
        }

    }
  }
</script>