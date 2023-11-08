<script setup>
import UIkit from 'uikit'
import { ref } from 'vue';
import { useLogsStore } from '../stores/logs';
const store = useLogsStore();
const logs = store.logs;
let modalLog = ref({});
let newLogName = ref('');

function setLogModal(log) {
    modalLog.value = {...log};
    UIkit.modal('#delete-log-modal').show();
}

function deleteLog() {
    store.deleteLog(modalLog.value.logId);
    UIkit.modal('#delete-log-modal').hide();
    modalLog.value = {};
}

function addLogModal() {
    UIkit.modal('#add-log-modal').show();
}

function addLog() {
    store.createLog(newLogName.value);
    UIkit.modal('#add-log-modal').hide();
    newLogName.value = '';
}

function updateLogNameModal(log) {
    modalLog.value = {...log};
    UIkit.modal('#edit-log-modal').show();
}

function updateLogName() {
    store.updateLogName(modalLog.value.logId, modalLog.value.name);
    UIkit.modal('#edit-log-modal').hide();
    modalLog.value = {};
}

</script>

<template>
    <main>
        <div class="uk-container uk-padding">
            <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
                <div v-for="(log, index) in logs" :key="index">
                    <div class="uk-card uk-card-default uk-card-body">
                        <h2 class="uk-card-title">{{ log.name }} <button @click="updateLogNameModal(log)"
                                uk-icon="icon: pencil" aria-label="Edit name"></button></h2>
                        <RouterLink class="uk-button uk-button-primary uk-margin-right" :to="'/logs/' + log.logId">View
                            exercises</RouterLink>
                        <button @click="setLogModal(log)" class="uk-button uk-button-danger">Delete</button>
                    </div>
                </div>
                <button @click="addLogModal">
                    <div class="uk-card uk-card-primary uk-card-body uk-text-center">
                        <h2 class="uk-card-title">Add log</h2>
                        <span uk-icon="icon: plus-circle; ratio: 2"></span>
                    </div>
                </button>
            </div>
            <div uk-modal id="delete-log-modal">
                <div class="uk-modal-dialog">
                    <button class="uk-modal-close-default" type="button" uk-close aria-label="Close"></button>
                    <div class="uk-modal-header">
                        <h2 class="uk-modal-title">Delete {{ modalLog.name }}</h2>
                    </div>
                    <div class="uk-modal-body">
                        Are you sure you want delete this log?
                    </div>
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button-default uk-modal-close uk-margin-right"
                            type="button">Cancel</button>
                        <button class="uk-button uk-button-danger" @click="deleteLog" type="button">Delete</button>
                    </div>
                </div>
            </div>
            <div uk-modal id="add-log-modal">
                <div class="uk-modal-dialog">
                    <button class="uk-modal-close-default" type="button" uk-close aria-label="Close"></button>
                    <div class="uk-modal-header">
                        <h2 class="uk-modal-title">Add log</h2>
                    </div>
                    <div class="uk-modal-body">
                        <form class="uk-form-stacked">
                            <label for="log-name" class="uk-form-label">Name</label>
                            <div class="uk-form-controls">
                                <input type="text" class="uk-input" v-model="newLogName" id="log-name">
                            </div>
                        </form>
                    </div>
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button uk-modal-close uk-margin-right" type="button">Cancel</button>
                        <button class="uk-button uk-button-default" @click="addLog" type="button">Save</button>
                    </div>
                </div>
            </div>
            <div uk-modal id="edit-log-modal">
                <div class="uk-modal-dialog">
                    <button class="uk-modal-close-default" type="button" uk-close aria-label="Close"></button>
                    <div class="uk-modal-header">
                        <h2 class="uk-modal-title">Edit log name</h2>
                    </div>
                    <div class="uk-modal-body">
                        <form class="uk-form-stacked">
                            <label for="log-name" class="uk-form-label">Name</label>
                            <div class="uk-form-controls">
                                <input type="text" class="uk-input" v-model="modalLog.name" id="log-name">
                            </div>
                        </form>
                    </div>
                    <div class="uk-modal-footer uk-text-right">
                        <button class="uk-button uk-button uk-modal-close uk-margin-right" type="button">Cancel</button>
                        <button class="uk-button uk-button-default" @click="updateLogName" type="button">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>