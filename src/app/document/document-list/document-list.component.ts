import { Component, OnDestroy, OnInit } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService){}

  ngOnInit() {

    this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
    
    
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    
  }

}
