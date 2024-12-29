import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { franc } from 'franc-min';
import { NewsService } from '../services/news-service.service';

@Component({
  selector: 'app-entertainment-news',
  imports: [CommonModule],
  templateUrl: './entertainment-news.component.html',
  styleUrls: ['./entertainment-news.component.scss']
})
export class EntertainmentNewsComponent implements OnInit {
  entertainmentNews: any[] = [];
  filteredEntertainmentNews: any[] = [];
  currentCategory: string = 'all';
  currentPage: number = 1;
  articlesPerPage: number = 9;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchEntertainmentNews();
  }

  fetchEntertainmentNews(): void {
    this.newsService.getEntertainmentNews().subscribe({
      next: (data: any) => {
        if (data && data.articles) {
          this.entertainmentNews = data.articles.filter(
            (article: any, index: number, self: any[]) =>
              article.title !== '[Removed]' &&
              article.description !== '[Removed]' &&
              article.source?.name !== '[Removed]' &&
              index === self.findIndex((t: any) => t.url === article.url)
          );

          this.entertainmentNews = this.entertainmentNews.filter((article: any) => {
            const language = franc(article.content);
            return language === 'eng';
          });

          this.applyCategoryFilter(this.currentCategory);
        } else {
          console.error('Error fetching articles: Invalid data format.', data);
        }
      },
      error: (error) => {
        console.error('Error fetching entertainment news:', error);
      }
    });
  }

  applyCategoryFilter(category: string): void {
    this.currentCategory = category;
    if (category === 'all') {
      this.filteredEntertainmentNews = this.entertainmentNews;
    } else {
      this.filteredEntertainmentNews = this.entertainmentNews.filter(
        (article) => article.category === category
      );
    }
    this.currentPage = 1; 
  }

  get pagedArticles(): any[] {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.filteredEntertainmentNews.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEntertainmentNews.length / this.articlesPerPage);
  }
}
