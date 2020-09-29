public class CaseService {
    
    public static void closeCases(Set<Id> casesId, string closeReason){

        if(casesId == null && casesId.isEmpty()){
            
            System.debug('Lista de Ids vazia');
            return;
        }
        
        List<Case> casesToClose = new List<Case>();
        
        for(Id caseId : casesId){
            Case toClose = new Case(Id = caseId);
            toClose.Reason = closeReason;
            toclose.Status = 'Closed';
            casesToClose.add(toClose);
        }
        
        try{
            
            update casesToClose;
        }
        catch(Exception e){
            
            System.debug('Erro ao atualizar os casos');
            System.debug('ErrMsg: ' + e.getMessage());
        }
    }
}