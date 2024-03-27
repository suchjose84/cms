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
    this.http.get<Message[]>('http://localhost:4000/messages/')
    .subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      },
      error: (error: any) => {
        console.error('Error fetching messages: ', error);
      }
    });
  }

  getMessage(id: string) {
    return this.messages.find(doc => doc.id === id) ?? null;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // Clearing id assuming it's a new message
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Make HTTP POST request to server
    this.http.post<{ msge: string, message: Message }>('http://localhost:4000/messages',
      message,
      { headers: headers })
      .subscribe(
        {
          next: (responseData) => {
            this.messages.push(responseData.message);
            this.messageListChangedEvent.next(this.messages.slice());
          },
          error: (error) => {
            console.error('Error adding message:', error);
          }
        });
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
