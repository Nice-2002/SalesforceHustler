/**
 * @description       : 
 * @author            : Meer Hassan
 * @group             : 
 * @last modified on  : 06-07-2026
 * @last modified by  : Meer Hassan
**/
public with sharing class ReverseAString {
    public static String reverseString(String stringValue) {
        String reversedValue = '';
        List<String> splittedValue = stringValue.split('');
        for(Integer i = splittedValue.size() - 1; i >= 0 ; i--){
            reversedValue += splittedValue[i];
        }
        return reversedValue;
    }
}