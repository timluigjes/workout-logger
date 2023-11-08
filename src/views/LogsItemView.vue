<script setup>
import UIkit from 'uikit'
import EditExerciseModal from '../components/EditExerciseModal.vue';
import { useRoute } from 'vue-router'
import { useLogsStore } from '../stores/logs';
import { onMounted, ref } from 'vue';
const store = useLogsStore();
const route = useRoute()
const log = store.getLog(route.params.id)
const exercises = log.exercises;
const editExerciseModal = ref(null);
let modalExercise = ref({});
let newExercise = ref({
    name: '',
    sets: 0,
    reps: 0,
    weight: 0
});

function setExerciseModal(exercise) {
    modalExercise.value = exercise;
    UIkit.modal('#delete-exercise-modal').show();
}

function deleteExercise() {
    store.deleteExercise(log.logId, modalExercise.value.exerciseId);
    UIkit.modal('#delete-exercise-modal').hide();
    modalExercise.value = {};
}

function addExerciseModal() {
    UIkit.modal('#add-exercise-modal').show();
}

function addExercise() {
    let obj = newExercise.value;
    store.createExercise(log.logId, obj.name, obj.sets, obj.reps, obj.weight);
    UIkit.modal('#add-exercise-modal').hide();
    newExercise.value = {
        name: '',
        sets: 0,
        reps: 0,
        weight: 0
    };
}

function editExercise(exercise) {
    modalExercise.value = exercise;
    editExerciseModal.value.show();
}

</script>

<template>
    <main>
        <div class="uk-container uk-padding">
            <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
                <div v-for="(exercise, index) in exercises" :key="index">
                    <div class="uk-card uk-card-default uk-card-body">
                        <h2 class="uk-card-title">{{ exercise.name }}</h2>
                        <ul class="uk-list uk-list-disc">
                            <li>Sets: <span>{{ exercise.sets }}</span></li>
                            <li>Reps: <span>{{ exercise.reps }}</span></li>
                            <li>Weight: <span>{{ exercise.weight }}kg</span></li>
                        </ul>
                        <button class="uk-button uk-button-primary uk-margin-right" @click="editExercise(exercise)">Edit</button>
                        <button @click="setExerciseModal(exercise)" type="button"
                            class="uk-button uk-button-danger">Delete</button>
                    </div>
                </div>
                <button @click="addExerciseModal">
                    <div class="uk-card uk-card-primary uk-card-body uk-text-center">
                        <h2 class="uk-card-title">Add Exercise</h2>
                        <span uk-icon="icon: plus-circle; ratio: 2"></span>
                    </div>
                </button>
            </div>
        </div>
        <div uk-modal id="delete-exercise-modal">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Delete {{ modalExercise.name }}</h2>
                </div>
                <div class="uk-modal-body">
                    Are you sure you want delete this exercise?
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Cancel</button>
                    <button class="uk-button uk-button-danger" @click="deleteExercise" type="button">Delete</button>
                </div>
            </div>
        </div>
        <div uk-modal id="add-exercise-modal">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Add exercise</h2>
                </div>
                <div class="uk-modal-body">
                    <form class="uk-form-stacked">
                        <div class="uk-margin">
                            <label for="log-name" class="uk-form-label">Name</label>
                            <div class="uk-form-controls">
                                <input type="text" class="uk-input" v-model="newExercise.name" id="log-name">
                            </div>
                        </div>

                        <div class="uk-margin">
                            <label for="log-name" class="uk-form-label">Sets</label>
                            <div class="uk-form-controls">
                                <input type="text" class="uk-input" v-model="newExercise.sets" id="log-name">
                            </div>
                        </div>

                        <div class="uk-margin">
                            <label for="log-name" class="uk-form-label">Reps</label>
                            <div class="uk-form-controls">
                                <input type="text" class="uk-input" v-model="newExercise.reps" id="log-name">
                            </div>
                        </div>

                        <div class="uk-margin">
                            <label for="log-name" class="uk-form-label">Weight</label>
                            <div class="uk-form-controls">
                                <input type="text" class="uk-input" v-model="newExercise.weight" id="log-name">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button uk-modal-close uk-margin-right" type="button">Cancel</button>
                    <button class="uk-button uk-button-default" @click="addExercise" type="button">Save</button>
                </div>
            </div>
        </div>
        <EditExerciseModal :prop-log="log" :prop-exercise="modalExercise" ref="editExerciseModal"/>
    </main>
</template>