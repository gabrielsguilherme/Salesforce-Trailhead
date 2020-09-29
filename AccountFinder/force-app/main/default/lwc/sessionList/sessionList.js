import { LightningElement, track, wire } from 'lwc';
import getSessions from '@salesforce/apex/SessionController.getSessions';

export default class SessionList extends LightningElement {

  @track sessions = [];

  @track searchKey = '';

@wire(getSessions, { searchKey: '$searchKey' })

wiredSessions({ error, data }) {
  if (data) {
    this.sessions = data;
  } else if (error) {
    this.sessions = [];
    throw new Error('Failed to retrieve sessions');
  }
}

handleSearchKeyInput(event) {
  clearTimeout(this.delayTimeout);
  const searchKey = event.target.value;
  // eslint-disable-next-line @lwc/lwc/no-async-operation
  this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
  }, 300);
}

 
  handleSearchKeyInput(event) {
    const searchKey = event.target.value.toLowerCase();
    this.sessions = this.allSessions.filter(
      session => session.name.toLowerCase().includes(searchKey)
    );
  }
 
  handleSessionClick(event) {
    const { sessionId } = event.currentTarget.dataset;
    const navigateEvent = new CustomEvent('navigate', {
      detail: sessionId
    });
    this.dispatchEvent(navigateEvent);
  }

}