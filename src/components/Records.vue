<script setup lang="ts">
import { IAccountRecord } from "./../stores/state.ts"
import { onMounted, ref,onBeforeMount } from "vue"
import { useAccountsStore } from "./../stores/state.ts"

const maxInputChars = 10;
const accounts = useAccountsStore()
let records:Array<IAccountRecord> = [];

onBeforeMount( ()=>{
accounts.loadAccounts();
records = accounts.records
});

const add = () => {
    let record:IAccountRecord ={};
    accounts.addItem(record);
}

const onChange =()=>{
    if(document.querySelectorAll(".p-invalid").length===0)
        accounts.saveRecords();
}

const remove = (index)=>{
    accounts.removeItem(index);
    accounts.saveRecords();
}

const itemsTypeSelect = [
    "Локальная","LDAP"
]

</script>
<template>
<form id="my-form">
<label class="records-text"> Учетные записи</label> <app-button class="btn-add" severity="primary" variant="outlined" icon="pi pi-plus" @click="add"/>
<div class="alert-message"><div class="question">?</div> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ';'</div>
<table id="accounts">
    <thead>
        <tr>
            <th class="table-header">
                Метки
            </th>
            <th class="table-header">
                Тип учетной записи
            </th>
            <th class="table-header">
                Логин
            </th>
            <th class="table-header">
                Пароль
            </th>
            <th>
            </th>
        </tr>
    </thead>
    <tbody>
    <tr v-for="record in records">
    <td class="table-cell">
          <app-input-text class="input" :id="`list-label-${record.key}`" v-model="record.label" />
        </td>
    <td class="table-cell">
          <app-select class="select"  :options=itemsTypeSelect placeholder="Выберите тип" id="type" v-model="record.type" @change="onChange" />
        </td>
    <template v-if="record.type==='Локальная'">
        <td class="table-cell">
            <app-input-text class="input" :id="`list-login-${record.key}`" :invalid="!record.login||record.login.length>10"  v-model="record.login" @change="onChange"/>
            </td>
        <td class="table-cell">
            <app-password class="input" :id="`list-password-${record.key}`" :invalid="!record.password||record.password.length>10" v-model="record.password" @change="onChange"/>
            </td>
    </template>
    <td class="table-cell" v-if="record.type==='LDAP'" colspan="2">
        <app-input-text class="input" :id="`list-login-${record.key}`" :invalid="!record.login||record.login.length>10" v-model="record.login" @change="onChange"/>
    </td>
    <td class="table-cell">
        <app-button class="btn-delete" severity="primary" variant="outlined" icon="pi pi-trash" @click="remove(record.key)"/>
    </td>
    </tr>
    </tbody>
</table>
</form>
</template>
<style @scoped>
.records-text{
    font-size:22px;
    line-height:22px;
    font-weight:600;
}
.select{
    width:100%;
}
.input{
    width:100%;
}
.alert-message{
    background-color:rgb(240,240,240);
    line-height:18px;
    font-size:18px;
    height:auto;
    display:inline flex;
    align-items:center;
    justify-content:center;
}
.question{
    border: 2px solid black;
    border-radius:50%;
    height:30px;
    width:30px;
    min-width:30px;
    text-align:center;
    align-items:center;
    justify-content:center;
    display:inline-flex;
    margin-right:18px;
}
</style>