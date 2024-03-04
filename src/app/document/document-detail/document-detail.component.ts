import { Component, Input, OnInit } from '@angular/core';
import Document from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  document: Document;
  nativeWindow: any;

  constructor(private documentService: DocumentService, private route: ActivatedRoute, private router: Router, private windRefService: WindRefService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
      this.nativeWindow = this.windRefService.getNativeWindow();
    })
  }

  onView() {
    if(this.document.url) {
      this.nativeWindow.open(this.document.url, '_blank');
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
