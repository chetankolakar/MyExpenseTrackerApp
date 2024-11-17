public class CreateAndSendCSVFileViaEmail 
{
    public static void createAndSendCSVFile()
    {
        List<Expense__c> expenseList = new List<Expense__c>();
        expenseList = [Select Id, Name,Date__c,Expense_Amount__c,Return_Status__c,Category__c,RecordType.Name,Archive__c from Expense__c order by Date__c asc];

        //Separating field values using comma and storing in a list of string-'expenseDetails' 
        //The field values are displayed in different cells in CSV file when comma is encountered
        List<String> expenseDetails = new List<String>();
        if(expenseList != NULL && !expenseList.isEmpty())
        {
            for(Expense__c expObj: expenseList)
            {
                expenseDetails.add(expObj.RecordType.Name+ ',' +expObj.Date__c + ',' + expObj.Name + ',' + expObj.Expense_Amount__c+ ','+expObj.Return_Status__c+','+expObj.Category__c + ',' +expObj.Archive__c);
            }
        }
       
        //Creating CSV file
        String csvFile;
        String csvColumnHeader = 'Record Type,Date,Expense Name, Expense Amount,Return Status,Category,Archived\n';
        List<String> csvRowValues = new List<String>();
        
        //To add an attachment, Messaging.EmailFileAttachment class is used
        Messaging.EmailFileAttachment attach;
        if(expenseDetails != NULL && !expenseDetails.isEmpty())
        {
            csvFile = csvColumnHeader + String.join(expenseDetails,'\n');
            attach = new Messaging.EmailFileAttachment();
            attach.setContentType('text/csv');
            attach.setFileName('Expenses as on '+string.valueof(System.today())+'.csv');
            attach.setInline(true);
            attach.Body = Blob.valueOf(csvFile);
        }       
        
        //Creating recipient list
        List<String> recipientList = new List<String>();
        recipientList.add('chetankolakar@gmail.com');
        recipientList.add('chetankolakar123@gmail.com');
        //Sending email and attaching the CSV file
        List<Messaging.SingleEmailMessage> mailsList = new List<Messaging.SingleEmailMessage>();
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(recipientList);
        mail.setSubject('List of Expenses as on '+string.valueof(System.today()));
        String body = 'Refer below file for expenses as on '+string.valueof(System.today());
        mail.setHtmlBody(body);
        if(attach != NULL)
        {
            mail.setFileAttachments(new Messaging.EmailFileAttachment[] { attach });//Set File Attachment
        }
        mailsList.add(mail);
        Messaging.SendEmailResult[] sendEmailResults = Messaging.sendEmail(mailsList);
    }
}