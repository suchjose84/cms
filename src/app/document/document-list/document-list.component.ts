import { Component, EventEmitter, Output } from '@angular/core';
import  Document from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  
  documents: Document[] = [
    { id: '1', name: 'CIT 260 - Object Oriented Programming', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', url: 'url1' },
    { id: '2', name: 'CIT 366 - Full Web Stack Development', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', url: 'url2' },
    { id: '3', name: 'CIT 425 - Data Warehousing', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', url: 'url3' },
    { id: '4', name: 'CIT 460 - Enterprise Development', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', url: 'url4' },
    { id: '5', name: 'CIT 495 - Senior Practicum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', url: 'url5' },
  ];
  

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
