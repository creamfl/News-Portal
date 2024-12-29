import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news-service.service';
import { franc } from 'franc-min';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  currentCategory: string = 'all';
  currentPage: number = 1;
  articlesPerPage: number = 9;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews('latest');
  }

  public fetchNews(query: string) {
    this.newsService.getNews(query).subscribe({
      next: (data) => {
        if (data.status === 'ok') {
          this.articles = data.articles.filter(
            (article: any, index: number, self: any[]) =>
              article.title !== '[Removed]' &&
              article.description !== '[Removed]' &&
              article.source?.name !== '[Removed]' &&
              index === self.findIndex((t: any) => t.url === article.url)
          );
          this.articles = this.articles.filter((article: any) => {
            const language = franc(article.content);
            return language === 'eng';
          });
          this.applyCategoryFilter(this.currentCategory);
        } else {
          console.error('Error fetching articles:', data);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  applyCategoryFilter(category: string): void {
    this.currentCategory = category;
    if (category === 'all') {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.articles.filter((article) =>
        article.category === category
      );
    }
    this.currentPage = 1;
  }

  get pagedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.filteredArticles.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
  }
}
