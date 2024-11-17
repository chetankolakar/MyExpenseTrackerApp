import { LightningElement , track} from 'lwc';
import getExpensesByDate from '@salesforce/apex/Expense_summary_controller.getExpensesByDate';

export default class ExpensesByDates extends LightningElement {
    @track startdate;
    @track enddate;
    @track disablebutton=true;
    @track expensedata;
    @track expensedataexist=true;
    @track catogories;

    startDateChange(event){
        this.startdate = event.target.value;
        console.log('aaaa '+this.enddate);
        if (this.enddate!=='' && this.enddate!==undefined && this.enddate!==null){
                if(this.enddate<=this.startdate){
                    this.showToast("", "Start date must be before date than end date","error","dismissible");
                    this.disablebutton=true;
                }
                else{
                    this.disablebutton=false;
                 }
        }
      }

    endDateChange(event){
        this.enddate = event.target.value;
        if(this.startdate!==null && this.startdate!==undefined && this.startdate!==''){
            if(this.startdate>=this.enddate){
                    this.showToast("", "End date must be after date than start date","error","dismissible");
                    this.disablebutton=true;
             }
             else{
                this.disablebutton=false;
             }
        }
        }
    showToast(title, message, variant, mode) {
            const event = new ShowToastEvent({
                "title": title,
                "message": message,
                "variant": variant,
                "mode": mode
            });
            this.dispatchEvent(event);
        }

        handleClick(event) {
            getExpensesByDate({
                dateFrom: this.startdate,
                dateTo: this.enddate
            })
            .then(result=> {
                this.expensedata=result;
                this.expensedataexist=true;
                this.catogories=Object.keys(this.expensedata);        
            })
            .catch((error) => {
               console.log('hhhh errr'+error);
            });  
        }
}