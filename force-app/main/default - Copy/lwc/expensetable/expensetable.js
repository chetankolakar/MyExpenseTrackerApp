import { LightningElement, api, track} from 'lwc';
const columns = [
    { label: 'Date', fieldName: 'Date__c', type: 'Date',fixedWidthh: 10,hideDefaultActions: true,typeAttributes:{
        month: "2-digit",
        day: "2-digit"
    },
    alignment: 'left'},
    { label: 'Expense Name', fieldName: 'Name' ,wrapText: 'false',fixedWidthh: 40,ideDefaultActions: true},
    {
        label: 'Amount',
        fieldName: 'Expense_Amount__c',
        type: 'number',
        cellAttributes: { alignment: 'right' },
        hideDefaultActions: true,
        fixedWidthh: 40,
        alignment: 'right'
    },
];

export default class Expensetable extends LightningElement {
    @api catogory;
    @api expensedata;
    @track data;
    @track tempcat;
    @track sumtotal=0;
    columns=columns;
    connectedCallback(){
        var datamap = this.expensedata;
        this.tempcat=JSON.stringify(this.catogory);
        console.log('gggg '+JSON.stringify(this.catogory));
            for(var key in datamap){
                console.log('hhhhhh '+key);
                if (key===this.catogory){
                    console.log('iiiii '+JSON.stringify(datamap[key]));
                    this.data=datamap[key];
                }
            }
            for(var i=0;i<this.data.length;i++){
                this.sumtotal=this.sumtotal+this.data[i].Expense_Amount__c;
                console.log('opopopo '+this.data[i].Expense_Amount__c);
            }
    }
}