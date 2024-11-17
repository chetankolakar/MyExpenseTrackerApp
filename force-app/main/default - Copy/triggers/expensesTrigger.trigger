trigger expensesTrigger on Expense__c (before insert,before update,after update,after insert) {
    if(Trigger.isUpdate){
        if(Trigger.isBefore){
            expensesTriggerHandler.checkifRecordTypeChanged(Trigger.oldMap,Trigger.newMap);
    }
        if(Trigger.isafter){

        }
   }
    if(Trigger.isInsert){
        if(Trigger.isafter){
            expensesTriggerHandler.updateOutStandingAmount(Trigger.new,NULL,NULL);
        }
    }
}