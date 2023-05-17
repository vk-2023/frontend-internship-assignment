import { Inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpRequestOptions } from '../models/http-request-options.model';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';

const ROOT_URL = 'https://openlibrary.org';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient, private cacheService:CacheService) {}

  get<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    const cachedData = this.cacheService.get(apiPath);
    if (cachedData) {
      return of(cachedData);
    } else {
      return this.httpClient.get<T>(apiPath, config).pipe(
        tap(data => this.cacheService.set(apiPath, data))
      );
    }
    return this.httpClient.get<T>(apiPath, config);
  }

  post<T>(
    url: string,
    body: Record<string, any> = {},
    config?: HttpRequestOptions
  ): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.post<T>(apiPath, body, config);
  }

  delete<T>(url: string, config?: HttpRequestOptions): Observable<T> {
    const apiPath = `${ROOT_URL}${url}`;
    return this.httpClient.delete<T>(apiPath, config);
  }
}
