import { Injectable } from '@angular/core';
import Contact from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();

  }

  getContacts() {
    this.http.get<Contact[]>('https://cms-angular-30bbc-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json')
    .subscribe({
      next: (contacts: Contact[]) => {
        // Sorting function
        const customSort = (a: Contact, b: Contact) => {
          const aContainsTeam = a.name.toLowerCase().includes('team');
          const bContainsTeam = b.name.toLowerCase().includes('team');

          if (aContainsTeam === bContainsTeam) {
              return a.name.localeCompare(b.name);
          } else {
              return aContainsTeam ? 1 : -1;
          }
      };
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort(customSort);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      error: (error: any) => {
        console.error('Error fetching contacts: ', error);
      }

    });
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put('https://cms-angular-30bbc-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json', contactsString, {headers})
    .subscribe({
      next: ()=> {
        this.contactListChangedEvent.next([...this.contacts]);
  
      }, error: (error) => {
        console.error('Error storing contacts: ', error);
      }

    });

  }

  getContact(id: string): Contact | null {
    console.log(id);
    return this.contacts.find(contact => contact.id === id) ?? null;

  }

  addContact(newContact: Contact): void {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
  
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
  
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (!isNaN(currentId)) {
        maxId = Math.max(maxId, currentId);
      }
    }
    return maxId;
  }




}

