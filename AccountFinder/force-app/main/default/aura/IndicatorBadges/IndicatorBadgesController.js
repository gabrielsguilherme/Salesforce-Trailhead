({
  doInit : function(component, event, helper) {
    var sObj = component.get("v.sObjectName");
    if(sObj){
      helper.getLabelForRecord(component, sObj);
    }
  },
   getBadgesForRecord : function(component, recId, sObj) {
    var action = component.get("c.getIndicators");
    action.setParams({
      recId : recId,
      objectName : sObj
    });
    action.setCallback(this, function(response){
      var state = response.getState();
      if(state === "SUCCESS"){
        var badges = response.getReturnValue();
        component.set("v.badgeList", badges);
      } else if (state === "ERROR"){
        console.log('Error: ' + JSON.stringify(response.error));
      } else {
        console.log('Unknown problem, state: ' + state + ', error: ' + JSON.stringify(response.error));
      }
    });
    $A.enqueueAction(action);
  },
  //future code here
})