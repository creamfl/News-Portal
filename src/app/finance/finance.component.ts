import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { franc } from 'franc-min';
import { NewsService } from '../services/news-service.service';

@Component({
  selector: 'app-finance',
  imports: [CommonModule],
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit, AfterViewInit, OnDestroy {
  financeNews: any[] = [];
  filteredFinanceNews: any[] = [];
  currentCategory: string = 'all';
  currentPage: number = 1;
  articlesPerPage: number = 9;
  private widgetInitialized = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchFinanceNews();
  }

  fetchFinanceNews(): void {
    this.newsService.getFinanceNews().subscribe({
      next: (data: any) => {
        if (data && data.articles) {
          this.financeNews = data.articles.filter(
            (article: any, index: number, self: any[]) =>
              article.title !== '[Removed]' &&
              article.description !== '[Removed]' &&
              article.source?.name !== '[Removed]' &&
              index === self.findIndex((t: any) => t.url === article.url)
          );
          this.financeNews = this.financeNews.filter((article: any) => {
            const language = franc(article.content);
            return language === 'eng';
          });
          this.applyCategoryFilter(this.currentCategory);
        } else {
          console.error('Error fetching articles:', data);
        }
      },
      error: (error) => {
        console.error('Error fetching sports news:', error);
      }
    });
  }

  applyCategoryFilter(category: string): void {
    this.currentCategory = category;
    if (category === 'all') {
      this.filteredFinanceNews = this.financeNews;
    } else {
      this.filteredFinanceNews = this.financeNews.filter((article) =>
        article.category === category
      );
    }
    this.currentPage = 1;
  }

  ngAfterViewInit(): void {
    if (!this.widgetInitialized) {
      this.loadTradingViewWidget();
      this.widgetInitialized = true;
    }
  }

  ngOnDestroy(): void {
    this.cleanupWidget();
  }

  loadTradingViewWidget(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "proName": "FOREXCOM:SPXUSD",
          "title": "S&P 500 Index"
        },
        {
          "proName": "FOREXCOM:NSXUSD",
          "title": "US 100 Cash CFD"
        },
        {
          "proName": "FX_IDC:EURUSD",
          "title": "EUR to USD"
        },
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "Ethereum"
        }
      ],
      "isTransparent": false,
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "locale": "en"
    });

    const container = document.getElementById('tradingview-widget')!;
    container.appendChild(script);
  }

  cleanupWidget(): void {
    const container = document.getElementById('tradingview-widget');
    if (container) {
      container.innerHTML = '';
    }
  }

  get pagedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    return this.filteredFinanceNews.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFinanceNews.length / this.articlesPerPage);
  }
}
