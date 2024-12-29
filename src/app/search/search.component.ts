import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { franc } from 'franc-min';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports: [CommonModule],
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  filteredNews: any[] = [];
  allNews: any[] = [];
  currentPage: number = 1;
  articlesPerPage: number = 9;
  isLoading: boolean = false;
  errorMessage: string = '';

  private NEWS_API_KEY = 'ba0d4cd3f600426daaf37f7f39efe033';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.fetchNewsData(this.searchQuery);
      }
    });
  }

  fetchNewsData(query: string): void {
    this.isLoading = true;
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${this.NEWS_API_KEY}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        this.allNews = response.articles || [];
        this.filterAndProcessNews();
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching news data:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch news data. Please try again later.';
      }
    });
  }

  filterAndProcessNews(): void {
    this.filteredNews = this.allNews
      .filter(
        (article: any, index: number, self: any[]) =>
          article.title !== '[Removed]' &&
          article.description !== '[Removed]' &&
          article.source?.name !== '[Removed]' &&
          index === self.findIndex((t: any) => t.url === article.url)
      )
      .filter((article: any) => {
        const language = franc(article.content || '');
        return language === 'eng';
      });
  }

  get pagedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.filteredNews.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredNews.length / this.articlesPerPage);
  }
}
