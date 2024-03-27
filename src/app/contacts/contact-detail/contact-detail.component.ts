import { Component, OnInit, Input } from '@angular/core';

import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
  @Input() contact: Contact;
  // contact: Contact;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      // this.contactService.getContacts();
      this.contact = this.contactService.getContact(id);
      // console.log(this.contact);

    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');

  }

}
