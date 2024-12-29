import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private NEWS_API_KEY = 'ba0d4cd3f600426daaf37f7f39efe033';
  private PEXELS_API_KEY = '6Air38HJZSxMFj4P7Btcx8ITkoZOWKXKb5HvKY8V0s6ZZs3VDGJyXOXI'; 


  constructor(private http: HttpClient) {}

  getNews(query: string): Observable<any> {
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${this.NEWS_API_KEY}`;
    return this.http.get(url);
  }

  getBreakingNews(): Observable<any> {
    return this.getNews('breaking-news');
  }

  getSportsNews(): Observable<any> {
    return this.getNews('sports');
  }

  getPoliticsNews(): Observable<any> {
    return this.getNews('politics');
  }

  getEntertainmentNews(): Observable<any> {
    return this.getNews('funny');
  }

  getFinanceNews(): Observable<any> {
    return this.getNews('finance');
  }

  getRandomBackgroundImage(): Observable<string> {
    const url = 'https://api.pexels.com/v1/search?query=nature&per_page=50';
    return this.http.get<any>(url, {
      headers: { Authorization: this.PEXELS_API_KEY },
    }).pipe(
      map((response) => {
        const randomPhoto = response.photos[Math.floor(Math.random() * response.photos.length)];
        return randomPhoto.src.large2x;
      })
    );
  }
}
