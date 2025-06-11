import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelService } from '../../services/marvel.service';
import { CeilPipe } from '../../pipes/ceil-pipe';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, FormsModule, CeilPipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  currentPage = 1;
  limit = 54;
  total = 0;
  searchTerm: string = '';

  constructor(
    private marvelService: MarvelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(offset: number = 0) {
    this.marvelService.getCharacters(offset, this.limit, this.searchTerm).subscribe((res: any) => {
      this.characters = res.data.results;
      this.total = res.data.total;
    });
  }

  searchCharacters() {
    this.currentPage = 1; 
    this.loadCharacters();
  }

  nextPage() {
    if ((this.currentPage * this.limit) < this.total) {
      this.currentPage++;
      this.loadCharacters((this.currentPage - 1) * this.limit);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters((this.currentPage - 1) * this.limit);
    }
  }

  goToCharacter(character: any) {
    this.router.navigate(['/character', character.id]);
  }
}
