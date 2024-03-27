import { Component, OnInit } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit{

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute


  ){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        const id = params['id'];
        if(!id) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(id);
        console.log(this.originalDocument);
        if(!this.originalDocument) {
          return;
        }
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        this.editMode = true;
        
      }
    );
    // console.log(this.editMode);
    
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value._id,
      value.id,
      value.name,
      value.description,
      value.url
    );

    if(this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);

  }
  

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   // Update the properties of the original document directly
  //   this.originalDocument.name = value.name;
  //   this.originalDocument.description = value.description;
  //   this.originalDocument.url = value.url;
  
  //   if (this.editMode) {
  //     this.documentService.updateDocument(this.originalDocument);
  //   } else {
  //     this.documentService.addDocument(this.originalDocument);
  //   }
  //   this.router.navigate(['/documents']);
  // }
  

  onCancel() {
    this.router.navigate(['/documents']);
  }
  

}
