import { Component, Input, OnChanges } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import {
  searchByAuthorResponseDocs,
  searchByTitleResponseDocs,
} from 'src/app/core/models/searchByTitleOrAuthor-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnChanges{
  @Input() booksList: Book[]=[];
  @Input() subjectName: string='';
  @Input() booksSearched: searchByTitleResponseDocs[] | searchByAuthorResponseDocs[]=[]
  // @Input() booksListByTitle: searchByTitleResponseDocs[]=[];
  // @Input() booksListByAuthor: searchByAuthorResponseDocs[]=[];


  isLoading: boolean = true;

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.booksSearched.length / this.itemsPerPage);
  }

  get visibleItems(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.booksSearched.slice(start, end);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  ngOnChanges(): void {
    // console.log(this.booksSearched)
    if (this.booksList.length>0 || this.booksSearched.length>0 ) {
      // console.log(this.booksList);
      // console.log('present');
      this.isLoading = false;
      // console.log(this.isLoading);
    }
  }


  // searchedBooks?: Book[] | searchByAuthorResponseDocs[] | searchByTitleResponseDocs[]
  // isSearchByTitle:boolean = true
  // booksListBySearch: searchByTitleResponseDocs[] | searchByAuthorResponseDocs[] = this.isSearchByTitle ? this.booksListByTitle : this.booksListByAuthor
  // constructor(){
  //   console.log('tableview')
  //   console.log(this.booksListByTitle)
  // }
}
