@RestResource(urlMapping='/case/*/close')
global with sharing class CaseCloseResource {
    
    @HttpPost
    global static void closeCase(string reason){
        
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String[] caseId = req.requestURI.split('/');
        
        Set<Id> casesId = new Set<Id>();
        
        try{
            Id idCase = Id.valueOf(caseId[2]);
            casesId.add(idCase);            
        }
        catch(Exception e){
            System.debug('Error on cast Id: ' + caseId);
            System.debug('ErrMsg: ' + e.getMessage());
        }
        
        CaseService.closeCases(casesId, reason);
    }
}