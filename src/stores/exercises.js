import { defineStore } from 'pinia'

export const useExerciseStore = defineStore('exercises', () => {
  const emptyExercise = {
    exerciseId: 0,
    name: '',
    sets: 0,
    reps: 0,
    weight: 0
  }

  function createExercise(name, sets, reps, weight) {
    const exercise = { ...emptyExercise }
    exercise.name = name
    exercise.sets = sets
    exercise.reps = reps
    exercise.weight = weight

    return exercise
  }

  function getExercise(exercises, id) {
    id = parseInt(id)

    let arrResult = exercises.filter((exercise) => {
      return exercise.exerciseId === id
    });

    if(arrResult.length === 0) {
        throw new Error('Exercise not found');
    } else {
        return arrResult[0];
    }
  }

  function getExerciseIndex(exercises, id) {
    id = parseInt(id);

    let index = exercises.findIndex(exercise => {
      return exercise.exerciseId === id;
    });

    if(index === -1) {
      throw new Error('Exercise not found');
    } 

    return index;
  }

  return { createExercise, getExercise, getExerciseIndex }
})
