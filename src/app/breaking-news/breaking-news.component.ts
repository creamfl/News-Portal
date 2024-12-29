import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news-service.service';
import { franc } from 'franc-min';

@Component({
  selector: 'app-breaking-news',
  imports: [CommonModule],
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  currentCategory: string = 'all';
  currentPage: number = 1;
  articlesPerPage: number = 9;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchBreakingNews();
  }

  fetchBreakingNews() {
    this.newsService.getBreakingNews().subscribe(
      (data) => {
        if (data && data.articles) {
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
        }else {
          console.error('Error fetching articles:', data);
        }
      },
      (error) => {
        console.error('Error fetching breaking news:', error);
      }
    );
  }

  applyCategoryFilter(category: string) {
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

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages() {
    return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
  }
}
