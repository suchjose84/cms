import { Component, OnInit } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{
  documents: Document[] = [];

  constructor(private documentService: DocumentService){}

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
    this.documents = this.documentService.getDocuments();
    
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

}
