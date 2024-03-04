import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) ?? null;
  }
  // getDocument(id: string): Document | null {
  //   const document = this.documents.find(doc => doc.id === id);
  //   if (!document) {
  //     console.error(`Document with ID ${id} not found.`);
  //     return null;
  //   }
  //   return document;
  // }  

  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next([...this.documents]);
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
        return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
        return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
        return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (!isNaN(currentId)) {
        maxId = Math.max(maxId, currentId);
      }
    }
    return maxId;
  }



}
