import { Injectable } from '@angular/core';
import Contact from './contact.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contact: Contact;
  maxContactId: number;

  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();

  }

  getContacts() {
    this.http.get<Contact[]>('http://localhost:4000/contacts')
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

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) ?? null;

  }
  

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    contact.id = "";
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Make HTTP POST request to server
    this.http.post<{ message: string, contact: Contact }>('http://localhost:4000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        {
          next: (responseData)=> {
            this.contacts.push(responseData.contact);
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          error: (error) => {
            console.error('Error adding contact:', error);
          }
        });
  }

  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (!originalContact || !newContact) {
  //     return;
  //   }

  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //       return;
  //   }

  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   // this.storeContacts();
  // }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const index = this.contacts.findIndex(d => d.id === contact.id);
  
    // If the document is not found, return
    if (index === -1) {
      return;
    }
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    this.http.delete(`http://localhost:4000/contacts/${contact.id}`, { headers })
      .subscribe(
        {
          next: () => {
            this.contacts.splice(index, 1);
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          error: (error) => {
            console.error('Error deleting contact:', error);
            

          }
        }
      );


  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const index = this.contacts.findIndex(d => d.id === originalContact.id);
  
    if (index === -1) {
      return;
    }
  
    // Preserve the IDs of the original contact
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;
  
    // Define headers for HTTP request
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Send PUT request to update contact in the database
    this.http.put(`http://localhost:4000/contacts/${originalContact.id}`, newContact, { headers })
      .subscribe({
        next: () => {
          this.contacts[index] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        }

      });
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

