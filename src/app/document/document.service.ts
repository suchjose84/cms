import { Injectable } from '@angular/core';
import Document from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }
  getDocuments() {
    this.http.get<Document[]>('https://cms-angular-30bbc-default-rtdb.asia-southeast1.firebasedatabase.app/documents.json')
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.error('Error fetching documents: ', error);
        }
      });
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put('https://cms-angular-30bbc-default-rtdb.asia-southeast1.firebasedatabase.app/documents.json', documentsString, {headers})
    .subscribe({
      next: ()=> {
        this.documentListChangedEvent.next([...this.documents]);
  
      }, error: (error) => {
        console.error('Error storing documents: ', error);
      }

    });

  }

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) ?? null;
  } 

  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
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
  //asdfaf


}
