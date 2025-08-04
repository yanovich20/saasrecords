import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
export interface IAccountRecord{
  key:number
  label:string
  type:string
  login:string
  password:string|null
}
interface ILabel{
  text:string;
}
export const useAccountsStore = defineStore('accounts', () => {
  const count = ref(0)
  let records = reactive(new Array<IAccountRecord>())
  function loadAccounts() {
     let recordsLocal = localStorage.getItem("my_account_records_key");
     let recordsToLoad = recordsLocal?JSON.parse(recordsLocal):[];
     for(let index=0;index<recordsToLoad.length;index++)
     {
        let record = recordsToLoad[index];
        let label:string="";
        if(record.label.length>0){
          let labels = record.label.map((item:ILabel)=>item.text)
          label = labels.join(";");
        }
        let newRecord:IAccountRecord = {
          key:record.key,
          label:label,
          type:record.type,
          login:record.login,
          password:record.password};
          records.push(newRecord);
     }
    if(records.length>0)
        count.value = Math.max(...records.map(item => item.key));
      else 
        count.value = 0;
  }

  function saveRecords(){
      let arrayToSave = new Array();
      for(let index=0;index<records.length;index++)
      {
        let record = records[index];
        let array =[];
        if(record.type=="LDAP")
        {
          record.password = null;
        }
        if(record.label)
        {
          let labels:Array<string> = record.label.split(";");
          for(let jndex:number=0;jndex<labels.length;jndex++){
            let obj = {"text":labels[jndex]};
            array.push(obj);
          }
        }
        let objToSave = {key:record.key,label:array,login:record.login,password:record.password,type:record.type};
        arrayToSave.push(objToSave);
      }
      localStorage.setItem("my_account_records_key",JSON.stringify(arrayToSave));
  }

  function removeItem(key:number){
    let newRecords:Array<IAccountRecord> = [];
    let indexSearch =-1;
    for(let index=0;index<records.length;index++)
    {
      let record = records[index];
      if(record.key==key)
      {
        indexSearch =index;
      }
    }
    if(indexSearch!=-1)
      records.splice(indexSearch,1);
  }

  function addItem(record:IAccountRecord)
  {
    count.value++;
    record.key=count.value;
    record.type="Локальная";
    records.push(record);
  }
  return { count, records, loadAccounts, removeItem, addItem, saveRecords }
})
