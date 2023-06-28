import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTaskStore = defineStore('task', () => {

  // STATES 
  const tasks = ref([])

  const taskToUpdateObj = ref({});
  const taskToUpdate= ref('')
  
  // ACTIONS 
  // read tasks
  const readTasks = () => {
    fetch('http://pos.test/api/tasks')
    .then(res => res.json())
    .then(data => {
      tasks.value = data.tasks
    })
    .catch(err => console.log(err))
  }
  readTasks()
  
  // create task
  const addTask = (fromData) => {
  
    fetch('http://pos.test/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fromData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.status !== 'passes') {
        // 
      }else {
            tasks.value.push(fromData)
      }
      
    })
    .catch(err => console.log(err))
  }
  
  const editTask = (id) => {
    tasks.value.map((task) => {
        if(task.id == id) {
          taskToUpdateObj.value = task
          taskToUpdate.value = task.title
        }
    })
  }
  
  const updateTask = (id) => {
    tasks.value = tasks.value.map((task) => {
      if(task.id === id) {
        return {...task, id: id, title: taskToUpdate.value}
      }
      return task
    })
    taskToUpdate.value = ''
  }
  
  const deleteTask = (id) => {
    console.log(id)
    tasks.value = tasks.value.filter((task) => task.id != id)
  }
  
    return {
      tasks, 
      taskToUpdateObj, 
      taskToUpdate,
      readTasks,
      addTask,
      editTask,
      updateTask,
      deleteTask
    }
})