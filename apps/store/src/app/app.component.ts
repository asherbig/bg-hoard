import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Game } from '@bg-hoard/util-interface';
import { formatRating } from '@bg-hoard/store/util-formatters';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = 'Board Game Hoard';
  games = this.http.get<Game[]>('/api/games');
  formatRating = formatRating;
}
