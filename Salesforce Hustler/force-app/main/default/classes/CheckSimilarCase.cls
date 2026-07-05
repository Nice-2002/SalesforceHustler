/**
 * @description       : 
 * @author            : Meer Hassan
 * @group             : 
 * @last modified on  : 06-07-2026
 * @last modified by  : Meer Hassan
**/
public with sharing class CheckSimilarCase {
    public static void isSimilarCaseExists(List<Case> newCases) {
        List<Case> existingRecords = [SELECT Id, Description FROM Case];

        for(Case c: newCases){
            if(c.description == null){
                return;
            }

            String newDescription = c.description.replaceAll('[^A-Za-z0-9 ]', '').toLowerCase();
            List<String> newDescriptionList = newDescription.split('\\s+');
            Set<String> newDescriptionSet = new Set<String>(newDescriptionList);

            for(Case existingCase: existingRecords){
                if(existingCase.description == null){
                    return;
                }
                String existingDescription = existingCase.description.replaceAll('[^A-Za-z0-9 ]', '').toLowerCase();
                List<String> existingDescriptionList = existingDescription.split('\\s+');

                Integer commonCount = 0;
                for(String word: existingDescriptionList){
                    if(newDescriptionSet.contains(word)){
                        commonCount += 1;
                    }
                }
                if(commonCount * 2 > newDescriptionSet.size()){
                    c.addError('Description is similar to an exising Case record. Please use a different description.');
                }
            }
        }
    }
}