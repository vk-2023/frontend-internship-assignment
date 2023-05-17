import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import {
  searchByAuthorResponseDocs,
  searchByTitleResponseDocs,
  searchbyAuthorResponse,
  searchbyTitleResponse,
} from 'src/app/core/models/searchByTitleOrAuthor-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  // booksByTitle: searchByTitleResponseDocs[] = [];
  // booksByAuthor: searchByAuthorResponseDocs[] = [];
  booksSearched: searchByAuthorResponseDocs[] | searchByTitleResponseDocs[] =
    [];

  constructor(private subjectsService: SubjectsService) {
    this.bookSearch = new FormControl('');
  }

  // isLoading: boolean = true;
  searchOptions = ['Book Title', 'Author Name'];
  searchBy: any = this.searchOptions[0];
  isSearchByTitle: boolean = true;
  searchValue: string = '';
  isFound: boolean = true;
  limit: number = 10;
  offset: number = 1;
  currentPage: number = 1;
  totalItems!: number;

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        if (value.trim() !== '') {
          this.searchValue = value;
          // console.log(this.isLoading);
          // console.log(this.searchValue !== '');
          this.setBooks(value);
          // console.log({ value });
        } else {
          // console.log('else')
          // this.isLoading=false;
          this.isFound = true;
          this.searchValue = value;
        }
      });
  }

  onOptionSelected(data: any) {
    // this.isLoading = true;

    //Author selected
    if (data.value === this.searchOptions[1]) {
      this.isSearchByTitle = false;
    }

    // Title selected
    else {
      this.isSearchByTitle = true;
    }

    // if user has already searched something and then if he changes the option,
    // then table-view-component should update accordingly
    if (this.searchValue !== '') {
      this.setBooks(this.searchValue);
    }

    // console.log(data.value);
  }

  setBooks(value: string) {
    // this.isLoading=true;
    this.isFound = true;
    !this.isSearchByTitle
      ? this.subjectsService
          .getBooksByAuthor(value, this.limit, this.offset)
          .subscribe((books) => {
            this.booksSearched = books.docs;
            // console.log(books);
            this.tasksAftersetingBook(books);
          })
      : this.subjectsService
          .getBooksByTitle(value, this.limit, this.offset)
          .subscribe((books) => {
            this.booksSearched = books.docs;
            // console.log(books);
            this.tasksAftersetingBook(books);
          });
  }

  tasksAftersetingBook(books: searchbyAuthorResponse | searchbyTitleResponse) {
    // this.isLoading = false;
    if (books.num_found == 0) {
      this.isFound = false;
    } else {
      this.totalItems = books.num_found;
      this.isFound = true;
    }
  }

  onPageChange(event: PageEvent) {
    // console.log(event.pageIndex)
    this.offset = event.pageIndex * this.limit + 1;
    // console.log(this.offset)
    this.setBooks(this.searchValue);
  }

  // pagination code
}
