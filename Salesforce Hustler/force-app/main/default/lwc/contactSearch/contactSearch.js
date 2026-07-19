import { LightningElement, track } from 'lwc';
import searchContacts from '@salesforce/apex/ContactSearchController.searchContacts'

export default class ContactSearch extends LightningElement {
    isSearching = false;
    searchValue = '';
    isFirstSearch = true;
    @track contacts = [];

    columns = [
        {  label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phaone', type: 'phone' }
    ];

    get isLoading() {
        return !this.isSearching;
    }

    get isContactsAvailable() {
        console.log(this.contacts.length != 0);
        return this.contacts.length != 0;
    }

    get isContactsNotAvailable() {
        return !this.isContactsAvailable && !this.isFirstSearch;
    }

    get isButtonDisabled() {
        return this.searchValue.length < 2;
    }

    handleChange(event) {
        this.searchValue = event.target.value;
    }

    handleKeyDown(event) {
        if(event.key === 'Enter' && !this.isButtonDisabled) {
            this.fetchContacts();
        }
    }

    async fetchContacts() {
        this.isSearching = true;
        this.isFirstSearch = false;
        try{
            const result = await searchContacts({ name: this.searchValue });
            console.log(result);
            this.contacts = result;
        }
        catch(error) {
            console.error('Error fetching records', error);
        }
        finally {
            this.isSearching = false;
        }
    }
}