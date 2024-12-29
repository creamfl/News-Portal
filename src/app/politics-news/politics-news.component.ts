import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news-service.service';
import { franc } from 'franc-min';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-politics',
  templateUrl: './politics-news.component.html',
  imports: [CommonModule],
  styleUrls: ['./politics-news.component.scss']
})
export class PoliticsComponent implements OnInit {
  politicsNews: any[] = [];
  filteredPoliticsNews: any[] = [];
  currentCategory: string = 'all';
  currentPage: number = 1;
  articlesPerPage: number = 9;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchPoliticsNews();
  }

  fetchPoliticsNews(): void {
    this.newsService.getPoliticsNews().subscribe({
      next: (data: any) => {
        if (data && data.articles) {
          this.politicsNews = data.articles.filter(
            (article: any, index: number, self: any[]) =>
              article.title !== '[Removed]' &&
              article.description !== '[Removed]' &&
              article.source?.name !== '[Removed]' &&
              index === self.findIndex((t: any) => t.url === article.url)
          );
          this.politicsNews = this.politicsNews.filter((article: any) => {
            const language = franc(article.content);
            return language === 'eng';
          });
          this.applyCategoryFilter(this.currentCategory);
        } else {
          console.error('Error fetching articles:', data);
        }
      },
      error: (error) => {
        console.error('Error fetching politics news:', error);
      }
    });
  }

  applyCategoryFilter(category: string): void {
    this.currentCategory = category;
    if (category === 'all') {
      this.filteredPoliticsNews = this.politicsNews;
    } else {
      this.filteredPoliticsNews = this.politicsNews.filter((article) =>
        article.category === category
      );
    }
    this.currentPage = 1;
  }

  get pagedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.filteredPoliticsNews.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPoliticsNews.length / this.articlesPerPage);
  }
}
