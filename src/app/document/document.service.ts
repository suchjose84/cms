import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

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

  // deleteDocument(document: Document) {
  //   if (!document) {
  //      return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //      return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.documentChangedEvent.emit(this.documents.slice());
  // }
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
  
    const index = this.documents.findIndex(doc => doc.id === document.id);
    if (index === -1) {
      return;
    }
  
    this.documents.splice(index, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }


}
