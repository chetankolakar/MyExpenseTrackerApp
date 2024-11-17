import { LightningElement , track} from 'lwc';

export default class AddMultipleExpense extends LightningElement {
    @track addMultipleExpenses = false;
    handleMultipleExpensesClick(event){
        this.addMultipleExpenses = true;
    }
    closemodal(){
        this.addMultipleExpenses = false;
    }
}