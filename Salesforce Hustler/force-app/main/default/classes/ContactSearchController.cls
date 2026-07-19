public with sharing class ContactSearchController {
    @AuraEnabled
    public static List<Contact> searchContacts(String name) {
        String searchKey = '%' + name + '%';
        return [Select Id, Name, Email, Phone From Contact Where Name Like :searchKey];
    }
}