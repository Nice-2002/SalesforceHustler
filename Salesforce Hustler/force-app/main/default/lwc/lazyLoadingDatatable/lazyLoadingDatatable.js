import { LightningElement, track } from 'lwc';
import getAccountsForLazyLoading from '@salesforce/apex/AccountController.getAccountsForLazyLoading';
import getTotalAccounts from '@salesforce/apex/AccountController.getTotalAccounts';

export default class LazyLoadingDatatable extends LightningElement {
    @track data = [];
    @track columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Type', fieldName: 'Type' }
    ];

    rowLimit = 20;
    rowOffset = 0;
    totalRecords = 0;

    connectedCallback() {
        this.loadTotalRecords();
    }

    loadTotalRecords() {
        getTotalAccounts().then(count => {
            this.totalRecords = count;
            this.loadData();
        });
    }

    loadData() {
        getAccountsForLazyLoading({ offsetSize: this.rowOffset, limitSize: this.rowLimit })
            .then(result => {
                this.data = [...this.data, ...result];
            })
            .catch(error => {
                console.log('Error loading accounts: ', error);
            });
    }

    handlerLoadMore(event) {
        if(this.data.length >= this.totalRecords) {
            event.target.isLoading = false;
            return;
        }
        this.loadData();
        event.target.isLoading = false;
    }
}