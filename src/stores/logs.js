import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useExerciseStore } from './exercises'

export const useLogsStore = defineStore('logs', () => {
  const exerciseStore = useExerciseStore()
  const emptyLog = {
    logId: 0,
    name: '',
    exercises: []
  }

  const logs = ref([
    {
      logId: 1,
      name: 'Legs',
      exercises: [
        {
          exerciseId: 1,
          name: 'Leg Press',
          sets: 4,
          reps: 10,
          weight: 100
        },
        {
          exerciseId: 2,
          name: 'Leg Curl',
          sets: 4,
          reps: 10,
          weight: 100
        }
      ]
    },
    {
      logId: 2,
      name: 'Bicep',
      exercises: [
        {
          exerciseId: 1,
          name: 'Bicep Press',
          sets: 4,
          reps: 10,
          weight: 100
        },
        {
          exerciseId: 2,
          name: 'Bicep Curl',
          sets: 4,
          reps: 10,
          weight: 100
        }
      ]
    }
  ])

  function getLog(id) {
    id = parseInt(id)
    let arrResult =  logs.value.filter((log) => {
      return log.logId === id
    })

    if(arrResult.length === 0) {
        throw new Error('Log not found');
    } else {
        return arrResult[0];
    }
  }

  function createLog(name) {
    const log = { ...emptyLog }
    log.name = name
    log.logId = getLastIndex() + 1;
    logs.value.push(log)
  }

  function updateLogName(id, name) {
    const log = getLog(id)
    log.name = name
    updateLog(log)
  }

  function updateLog() {
    return false
  }

  function getLastIndex() {
    const lastItem = [...logs.value].pop();
    return lastItem.logId;
  }

  function deleteLog(id) {
    const index = logs.value.findIndex((log) => {
      return log.logId === id
    })

    logs.value.splice(index, 1)
  }

  function createExercise(logId, name, sets, reps, weight) {
    const log = getLog(logId)
    const exercise = exerciseStore.createExercise(name, sets, reps, weight)
    exercise.exerciseId = log.exercises.length + 1
    log.exercises.push(exercise)
  }

  function updateExercise(logId, exerciseId, name, sets, reps, weight) {
    const log = getLog(logId)
    const exercise = exerciseStore.getExercise(log.exercises, exerciseId)
    exercise.name = name
    exercise.sets = sets
    exercise.reps = reps
    exercise.weight = weight

    //@TODO Test this!
    log.exercises[exerciseId] = exercise
  }

  function deleteExercise(logId, exerciseId) {
    const log = getLog(logId)
    const index = log.exercises.findIndex((exercise) => {
      return exercise.exerciseId === exerciseId
    });

    log.exercises.splice(index, 1)
  }

  return {
    logs,
    createLog,
    updateLogName,
    deleteLog,
    getLog,
    createExercise,
    updateExercise,
    deleteExercise
  }
})
