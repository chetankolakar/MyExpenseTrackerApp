import { LightningElement , track} from 'lwc';
import getExpensesByDate from '@salesforce/apex/Expense_summary_controller.getExpensesByDate';
import expensesSummary from '@salesforce/apex/Expense_summary_controller.expensesSummary';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Expensesummariser extends LightningElement {
    clickedButtonLabel;
    @track startdate;
    @track enddate;
    @track expensedata;
    @track catogories;
    @track disablebutton=true;
    @track summarydata;
    @track isLoaded=true;
    @track expensedataexist=true;
    @track message;
    @track totalfamilycontribution=0;
    @track ownexpenditure=0;
    @track totalSaving=0;
    @track totalloanpaid=0;
    @track sumtotal=0;
    @track summarydataexist=false;
    //@track akshayTotal;
    @track thisMonthTotal;
    @track outStandingamt;
    @track isrefreshClicked=false;
    @track otherexpenditure=0;
    @track netExpenditure=0;
    @track averagefamily=0;
    @track averagepersonel=0;
    @track totalshopping=0;
    @track shoppingpercent=0;
    @track otherpercent=0;
    @track askshaypercent=0;
    @track familypercent=0;
    @track ownExpenditurepercent=0;
    @track savingspercent=0;
    @track loanpercent =0;
    @track totalExpenditurepercent=0;
    @track addMultipleExpenses = false;
    @track averageEarning=0;
    @track overAllSummary;
    connectedCallback(){
        expensesSummary()
        .then((result=> {
            this.isrefreshClicked=false;
            this.summarydata=JSON.stringify(result);
            this.overAllSummary = result;
            console.log('hhhhh '+this.summarydata);
            //console.log('hhhhh2 '+this.result.akshayPercent);
            this.totalfamilycontribution=result.familyContribution;
            this.ownexpenditure=result.ownExpenditure;
            this.totalSaving=result.totalSaving;
            this.totalloanpaid=result.totalLoan;
            this.sumtotal=result.totalEarning;
            //this.akshayTotal=result.akshayTotal;
            this.thisMonthTotal=result.thisMonthTotal;
            this.outStandingamt=result.outStandingamt;
            this.otherexpenditure=result.otherExpenditure;
            this.averagefamily=result.monthlyAverageFamily;
            this.averageEarning=result.monthlyEarning;
            this.averagepersonel=result.monthlyAveragePersonel;
            this.totalshopping=result.totalShopping;
            this.familypercent=result.familycontributionpercent;
            this.ownExpenditurepercent=result.ownExpenditurepercent;
            this.savingspercent=result.savingspercent;
            this.loanpercent =result.loanpercent ;
            this.shoppingpercent=result.totalShoppingPercent;
            this.otherpercent=result.otherPercent;
            this.askshaypercent=result.akshayPercent;
            this.netExpenditure=this.sumtotal-this.totalSaving;
            this.summarydataexist=true;
            this.totalExpenditurepercent=100-this.savingspercent;
    }))
    .catch((error) => {
        if(error !== undefined && error.body !== undefined){
            this.message = 'Error received: code' + error.errorCode + ', ' +
                'message ' + error.body.message;
        }
    }); 
    }
    handleRefresh(event){
        this.summarydataexist=false;
        this.isrefreshClicked=true;
        this.connectedCallback();

    }
    handleClick(event) {
        this.clickedButtonLabel = event.target.label;
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
    handleMultipleExpensesClick(event){
        this.addMultipleExpenses = true;
    }
    closemodal(){
        this.addMultipleExpenses = false;
    }
}