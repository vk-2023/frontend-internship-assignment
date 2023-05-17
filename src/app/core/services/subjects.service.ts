import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';
import {
  searchByAuthorResponseDocs,
  searchByTitleResponseDocs,
  searchbyAuthorResponse,
  searchbyTitleResponse,
} from '../models/searchByTitleOrAuthor-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string): Observable<BookResponse> {
    const limit = 10;
    return this.apiService.get(
      `/subjects/${subjectName
        .toLowerCase()
        .split(' ')
        .join('_')}.json?limit=${limit}`
    );
  }

  getBooksByAuthor(
    authorName: string,
    limit: number,
    offset: number
  ): Observable<searchbyAuthorResponse> {
    return this.apiService.get(
      `/search.json?author=${authorName}&limit=${limit}&offset=${offset}`
    );
  }

  getBooksByTitle(
    bookTitle: string,
    limit: number,
    offset: number
  ): Observable<searchbyTitleResponse> {
    return this.apiService.get(
      `/search.json?title=${bookTitle}}&limit=${limit}&offset=${offset}`
    );
  }
}
