public with sharing class AccountController {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountsForLazyLoading(Integer offsetSize, Integer limitSize) {
        return [
            Select Id, Name, Industry, Phone, Type 
            From Account 
            Order By LastModifiedDate Desc
            LIMIT :limitSize
            Offset :offsetSize
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalAccounts() {
        return [Select COUNT() From Account];
    }
}