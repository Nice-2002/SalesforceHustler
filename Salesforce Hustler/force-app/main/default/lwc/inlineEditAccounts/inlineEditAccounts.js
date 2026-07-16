import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import updateAccounts from '@salesforce/apex/AccountController.updateAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class InlineEditAccounts extends LightningElement {
    wiredAccountsResult;
    @track accounts = [];
    @track draftValues = [];

    columns = [
        {label: 'Name', fieldName: 'Name', editable: true},
        {label: 'Industry', fieldName: 'Industry', editable: true},
        {label: 'Phone', fieldName: 'Phone', editable: true}
    ];

    @wire(getAccounts)
    wiredAccounts(result){
        this.wiredAccountsResult = result;
        const { data, error } = result;
        if(data){
            this.accounts = data;
        }
        else if(error){
            console.error(error);
        }
    }

    handleSave(event){
        const records = event.detail.draftValues.map(draft => {
            return { ...draft };
        });

        updateAccounts({ accList: records })
            .then(errors => {
                if(errors.length > 0) {
                    this.showToast('Partial Success', errors.join(', '), 'warning');
                }
                else {
                    this.showToast('Success', 'All records updated', 'success');
                }
                this.draftValues = [];
                console.log('Before refresh apex');
                return refreshApex(this.wiredAccountsResult);
            })
            .catch(error => {
                this.showToast('Error updating records', error.body?.message || 'Unknown error', 'error');
            });
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}