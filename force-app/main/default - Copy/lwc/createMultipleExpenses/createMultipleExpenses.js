import { LightningElement ,track} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateMultipleExpenses extends LightningElement {
    keyIndex = 0;
    @track isRequired=true;
    @track Value='Self useful';
    @track options;
    @track optionslist=[];
 @track itemList = [

    {
        id: 0
    }
 ];

 connectedCallback(){
    this.optionslist.push({label: 'Enjoyment', value: 'Enjoyment'});
    this.options=this.optionslist;
 }
@track expenserectype='0125i0000001uSoAAI';
   addRow(){
             ++this.keyIndex;
        var newItem = [

        {
            id:this.keyIndex
            
        }
        ];
 this.itemList=this.itemList.concat(newItem);
    }
 RemoveRow(event){
        
        if(this.itemList.length>=2){
             this.itemList=this.itemList.filter(element => parseInt(element.id) !== parseInt(event.target.accessKey));
      }
  }

  handleSubmit(){
            var isval = true;
            this.template.querySelectorAll('lightning-input-field').forEach(element => {
                isval=isval && element.reportValidity();
            });
            if(isval){
                this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                    element.submit();
                });
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success!',
                        message: 'Expenses are added Successfully',
                        varient:'success',
                    })
                );
                const closeEvent = new CustomEvent('closemodal');
                this.dispatchEvent(closeEvent);
            /*this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Contact',
                    actionName: 'home',
                },
            });*/
                }
            else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Please Enter All required fields',
                        varient:'error',
    
                })
                );
             }
  }
  handleChange(event){
    console.log('hhhh event '+JSON.stringify(event));
  }
}