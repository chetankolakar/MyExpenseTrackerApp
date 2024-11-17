global class weeklyBackUpScheduler implements Schedulable {
    // This method is called by the system when the scheduled job runs
    global void execute(SchedulableContext sc) {
        CreateAndSendCSVFileViaEmail.createAndSendCSVFile();
    }
}