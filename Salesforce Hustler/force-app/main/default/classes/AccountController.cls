public with sharing class AccountController {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts() {
        return [Select Id, Name, Industry, Phone From Account LIMIT 50];
    }

    @AuraEnabled
    public static List<String> updateAccounts(List<Account> accList) {
        List<String> errors = new List<String>();
        Database.SaveResult[] results = Database.update(accList, false);
        
        for(Integer i = 0; i < results.size(); i++) {
            if(!results[i].isSuccess()) {
                errors.add('Failed to update record ' + accList[i].Id + ': ' + results[i].getErrors()[0].getMessage());
            }
        }

        return errors;
    }
}