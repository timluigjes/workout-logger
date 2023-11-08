<script setup>
import UIkit from 'uikit'

import { ref, watch } from 'vue';
import { useLogsStore } from '../stores/logs';

const store = useLogsStore();
const props = defineProps(['propLog', 'propExercise']);
const exercise = ref({
   
});

watch(props, () => {
    exercise.value = props.propExercise;
})

function updateExercise() {
    let obj = { ...exercise.value };
    store.updateExercise(props.propLog.logId, props.propExercise.exerciseId, obj.name, obj.sets, obj.reps, obj.weight)
    exercise.value = {
        name: '',
        sets: 0,
        reps: 0,
        weight: 0
    };
    hide();
}

function show() {
    UIkit.modal('#edit-exercise-modal').show();
}

function hide() {
    UIkit.modal('#edit-exercise-modal').hide();
}

defineExpose({show, hide});

</script>
<template>
    <div uk-modal id="edit-exercise-modal">
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close aria-label="Close"></button>
            <div class="uk-modal-header">
                <h2 class="uk-modal-title">Edit exercise</h2>
            </div>
            <div class="uk-modal-body">
                <form class="uk-form-stacked">
                    <div class="uk-margin">
                        <label for="log-name" class="uk-form-label">Name</label>
                        <div class="uk-form-controls">
                            <input type="text" class="uk-input" v-model="exercise.name" id="log-name">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label for="log-name" class="uk-form-label">Sets</label>
                        <div class="uk-form-controls">
                            <input type="text" class="uk-input" v-model="exercise.sets" id="log-name">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label for="log-name" class="uk-form-label">Reps</label>
                        <div class="uk-form-controls">
                            <input type="text" class="uk-input" v-model="exercise.reps" id="log-name">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <label for="log-name" class="uk-form-label">Weight</label>
                        <div class="uk-form-controls">
                            <input type="text" class="uk-input" v-model="exercise.weight" id="log-name">
                        </div>
                    </div>
                </form>
            </div>
            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button uk-modal-close uk-margin-right" type="button">Cancel</button>
                <button class="uk-button uk-button-default" @click="updateExercise" type="button">Save</button>
            </div>
        </div>
    </div>
</template>