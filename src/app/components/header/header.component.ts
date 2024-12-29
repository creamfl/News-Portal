import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = signal('My News Portal');

  searchQuery: string = '';

  constructor(private router: Router) {}

  searchNews() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  } 
}
