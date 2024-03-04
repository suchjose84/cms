import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import Contact from '../contact.model';
import { ContactService } from '../contact.service';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{

  originalContact: Contact;
  contact: Contact;
  contacts: Contact[];
  groupContacts: Contact[];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,

  ){}
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return;
      }
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      this.editMode = true;
  
      // Ensure groupContacts is always initialized
      this.groupContacts = this.contact.group ? JSON.parse(JSON.stringify(this.contact.group)) : [];
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    if(this.editMode) {
      const newContact = new Contact(
        this.originalContact.id,
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        this.originalContact.group
      );
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      const newContact = new Contact(
        '',
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        null
      )
      // console.log(newContact.group);
      console.log(newContact);
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);

  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  
  //Method to delete the contact using the red X button
onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}


}

