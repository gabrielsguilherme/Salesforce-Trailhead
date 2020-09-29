trigger OrderEventTrigger on Order_Event__e (after insert) {
    
    List<Task> tasks = new List<Task>();
    User q = [Select Id From User Where IsActive = true LIMIT 1];
    
    for(Order_Event__e event: Trigger.New) {
        if(event.Has_Shipped__c == true)  {
            Task tk = new Task();
            tk.Priority = 'Medium';
            tk.Status = 'New';
            tk.Subject = 'Follow up on shipped order ' +event.Order_Number__c;
            tk.OwnerId = q.id;
            tasks.add(tk);
        }
    }
    
    insert tasks;
}