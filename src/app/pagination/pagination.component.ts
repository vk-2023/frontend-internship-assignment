import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'front-end-internship-assignment-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() currentPage!: number;

  @Output() pageChanged = new EventEmitter<PageEvent>();

  onPageChanged(event: PageEvent) {
    // console.log({event})
    this.pageChanged.emit(event);
  }
}
