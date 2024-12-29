import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
  },

  {
    path: 'breaking-news',
    loadComponent: () => {
      return import('./breaking-news/breaking-news.component').then((m) => m.BreakingNewsComponent);
    },
  },

  {
    path: 'sports-news',
    loadComponent: () => {
      return import('./sports-news/sports-news.component').then(
        (m) => m.SportsNewsComponent
      );
    },
  },

  {
    path: 'politics-news',
    loadComponent: () => {
      return import('./politics-news/politics-news.component').then(
        (m) => m.PoliticsComponent
      );
    },
  },

  {
    path: 'entertainment-news',
    loadComponent: () => {
      return import('./entertainment-news/entertainment-news.component').then(
        (m) => m.EntertainmentNewsComponent
      );
    },
  },

  {
    path: 'finance',
    loadComponent: () => {
      return import('./finance/finance.component').then(
        (m) => m.FinanceComponent
      );
    },
  },

  {
    path: 'search',
    loadComponent: () => {
      return import('./search/search.component').then(
        (m) => m.SearchComponent
      );
    },
  },
];

