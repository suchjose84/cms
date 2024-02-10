import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(){
    return this.documents.slice();

  }

  getDocument(id: string) {
    const document = this.documents.find(doc => doc.id === id);
    return document ? { ...document } : null; //returns the document object using the spread operator if it's truthy

  }
}
