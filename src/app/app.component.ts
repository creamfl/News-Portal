import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsService } from './services/news-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule, FooterComponent, FormsModule],
  template: `
  <div class="app-background" [style.backgroundImage]="'url(' + backgroundImage + ')'">
  <app-header></app-header>
  
  
  <div class="app-content">
  <router-outlet></router-outlet>
</div>
  <app-footer></app-footer>
  </div>
`,

styles: [
],

})
export class AppComponent {
  title = 'News App';
  backgroundImage: string | undefined;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getRandomBackgroundImage().subscribe((image) => {
      this.backgroundImage = image;
    });
  }
}
