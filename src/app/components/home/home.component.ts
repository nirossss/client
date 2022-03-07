import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moviesData = []
  genres = []
  detailsId: string = ''
  searchInput: string = ''

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getMovies().subscribe((data) => {
      this.moviesData = data.movies
      this.createGenres()
    });
  }

  createGenres(): void {
    this.genres = this.moviesData.map(m => {
      return m.genres.join(',')
    }).join(',').split(',').sort().filter((g, i, self) => {
      return self.indexOf(g) === i
    })
  }

  submitSearch(): void {
    this.homeService.getSearch(this.searchInput).subscribe((data) => {
      this.moviesData = data.movies
      this.createGenres()
    });
  }
}
