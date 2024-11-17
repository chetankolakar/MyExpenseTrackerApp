@isTest
public class WeeklyDataExportTest{
    public static String CRON_EXP = '14 0 0 25 7 ? 2022';
     public static testmethod void test1(){
      Test.startTest();
        Expense__c exp=new Expense__c();
        exp.Name='test1';
        exp.Date__c=Date.newInstance(2022, 07, 23);
        exp.Expense_Amount__c=100;
        exp.Category__c='Enjoyment';
        exp.Return_Status__c='Self';
        insert exp;

       // This test runs a scheduled job at midnight Sept. 3rd. 2022
        
       // Schedule the test job
       String jobId = System.schedule('WeeklyDataExportTest', CRON_EXP, new weekly_Data_export());
      // Get the information from the CronTrigger API object 
         CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime FROM CronTrigger WHERE id = :jobId]; 
       // Verify the expressions are the same System.assertEquals(CRON_EXP, ct.CronExpression); 
      // Verify the job has not run 
      System.assertEquals(0, ct.TimesTriggered); 
      // Verify the next time the job will run 
      System.assertEquals('2022-07-26 14:00:00', String.valueOf(ct.NextFireTime));   
      Test.stopTest();        
     }
}