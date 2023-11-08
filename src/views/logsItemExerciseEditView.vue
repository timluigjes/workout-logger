<script setup>
import { useRoute } from 'vue-router'
import { useLogsStore } from '../stores/logs';
import { ref } from 'vue';
import { useExerciseStore } from '../stores/exercises';

const store = useLogsStore();
const exerciseStore = useExerciseStore();
const route = useRoute()
const log = store.getLog(route.params.logId)
const exercise = exerciseStore.getExercise(log.exercises, route.params.exerciseId)
console.log(exercise);
</script>
<template>
    <main>
        <div class="uk-container uk-padding">

        </div>
    </main>
</template>