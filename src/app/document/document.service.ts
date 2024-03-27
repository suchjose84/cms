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
    this.http.get<Document[]>('http://localhost:4000/documents')
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

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) ?? null;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    document.id = "";
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Make HTTP POST request to server
    this.http.post<{ message: string, document: Document }>('http://localhost:4000/documents',
      document,
      { headers: headers })
      .subscribe(
        {
          next: (responseData)=> {
            this.documents.push(responseData.document);
            this.documentListChangedEvent.next(this.documents.slice());
          },
          error: (error) => {
            console.error('Error adding document:', error);
          }
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const index = this.documents.findIndex(d => d.id === originalDocument.id);
  
    if (index === -1) {
      return;
    }
  
    // Preserve the IDs of the original document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;
  
    // Define headers for HTTP request
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Send PUT request to update document in the database
    this.http.put(`http://localhost:4000/documents/${originalDocument.id}`, newDocument, { headers })
      .subscribe({
        next: () => {
          this.documents[index] = newDocument;
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error) => {
          console.error('Error updating document:', error);
        }

      });
  }

  deleteDocument(document: Document) {
    // Check if the document object is valid
    if (!document) {
      return;
    }
  
    // Find the index of the document to be deleted in the documents array
    const index = this.documents.findIndex(d => d.id === document.id);
  
    // If the document is not found, return
    if (index === -1) {
      return;
    }
  
    // Define headers for HTTP request
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // Send DELETE request to delete the document from the database
    this.http.delete(`http://localhost:4000/documents/${document.id}`, { headers })
      .subscribe(
        {
          next: () => {
            this.documents.splice(index, 1);
            this.documentListChangedEvent.next(this.documents.slice());
          },
          error: (error) => {
            console.error('Error deleting document:', error);
            

          }
        }
      );
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
