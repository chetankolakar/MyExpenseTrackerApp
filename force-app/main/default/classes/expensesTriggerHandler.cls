public with sharing class expensesTriggerHandler {
    public static void checkifRecordTypeChanged(Map<Id,Expense__c> oldMap,Map<Id,Expense__c> newMap){
        for(Expense__c exp:newMap.values()){
            if(oldMap.get(exp.Id).RecordTypeId!=exp.RecordTypeId){
                if(exp.RecordTypeId=='0125i0000001uSjAAI'){
                    exp.Category__c='N/A';
                }
                else if(exp.RecordTypeId=='0125i0000001uSoAAI'){
                    exp.Return_Status__c='Self';
                }
            }
        }
    }
    public static void updateOutStandingAmount(List<Expense__c> newList,Map<Id,Expense__c> oldMap,Map<Id,Expense__c> newMap){
        Set<Id> debtorIds=new Set<Id>();
        Integer sum=0;
        List<Debtor_Person__c> updatedebtorpersons=new List<Debtor_Person__c>();
        if(oldMap==null  && newMap==null && newList!=null){
            for(Expense__c exp:newList){
                if(exp.RecordTypeId=='0125i0000001uSjAAI'){
                    if(exp.Debtor_Person__c!=null){
                        debtorIds.add(exp.Debtor_Person__c);
                    }
                }
            }
        }
        Map<Id,Debtor_Person__c> debtorpersons=new Map<Id,Debtor_Person__c>([select Id from Debtor_Person__c where Id in : debtorIds]);
        for(Expense__c exp:newList){
            if(exp.RecordTypeId=='0125i0000001uSjAAI'){
                if(!debtorpersons.isEmpty() && debtorpersons.containsKey(exp.Debtor_Person__c)){
                    Debtor_Person__c debt=debtorpersons.get(exp.Debtor_Person__c);
                    //sum=(Integer)debt.Outstanding_Amount__c;
                    //debt.Outstanding_Amount__c=sum+exp.Expense_Amount__c;
                    updatedebtorpersons.add(debt);
                }
            }
        }
        if(updatedebtorpersons.size()>0){
            update updatedebtorpersons;
        }
    }
}