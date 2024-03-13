import { Injectable, OnInit } from '@angular/core';
import Message from './message-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  maxMessageId: number;

  messageListChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    this.http.get<Message[]>('https://cms-angular-30bbc-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json')
    .subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => a.id.localeCompare(b.id));
        this.messageListChangedEvent.next(this.messages.slice());
      }
    });
  }
  
  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http.put<Message[]>('https://cms-angular-30bbc-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json', messagesString, {headers})
    .subscribe({
      next: () => {
        this.messageListChangedEvent.next([...this.messages]);

      }, error: (error) => {
        console.error('Error storing documents: ', error);
      }

    });
  }

  getMessage(id: string) {
    return this.messages.find(doc => doc.id === id) ?? null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages();


  }

  getMaxId() {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  


}
