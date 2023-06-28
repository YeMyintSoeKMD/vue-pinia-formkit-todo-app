<template>
  <div class="container my-5"> 
    <hr>
    <div v-if="taskToUpdate.length > 0">
    <div class="input-group mb-3">
      <input type="text" v-model="taskToUpdate" class="form-control" placeholder="Add new task">
      <button class="btn btn-success" type="button" @click="taskStore.updateTask(taskToUpdateObj.id)">Update</button>
    </div>
  </div>
  <div v-else>
        <FormKit 
        type="form"
        :actions="false"
        @submit="taskStore.addTask"
        id="taskForm"
        
        >
          <FormKit
          type="text"
          name="title"
          id="title"
          placeholder="Enter new task"
          validation="required|length:3"
          :errors="[]"
          input-class="form-control"
        />
        <FormKit
          type="submit"
          label="Save"
          input-class="btn btn-success"
        />
        </FormKit>
  </div>
  
    <!-- <div v-if="taskToUpdate.length > 0">
    <div class="input-group mb-3">
      <input type="text" v-model="taskToUpdate" class="form-control" placeholder="Add new task">
      <button class="btn btn-success" type="button" @click="taskStore.updateTask(taskToUpdateObj.id)">Update</button>
    </div>
  </div>
  <div v-else>
    <div class="input-group mb-3">
      <input type="text" v-model="newTask" @input="taskStore.taskInput" class="form-control" placeholder="Add new task">
      <button class="btn btn-success" type="button" @click="taskStore.addTask">Add</button>
    </div>
    <span :class="msgStatus">{{ taskMsg }}</span>
  </div> -->
    
    <div v-for="(task, index) in tasks" :key="index" class="alert alert-success alert-dismissible fade show" role="alert">
      <span @click="taskStore.editTask(task.id)" role="button">{{task.title}}</span>
      <button class="btn-close" aria-label="Close" @click="taskStore.deleteTask(task.id)"></button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import {storeToRefs} from 'pinia'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const { tasks, 
      newTask, 
      taskToUpdateObj, 
      taskToUpdate, 
      taskMsg, 
      msgStatus } = storeToRefs(taskStore)

</script>

<style scoped>
</style>