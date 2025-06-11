import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarvelService } from '../../services/marvel.service';
import { CeilPipe } from '../../pipes/ceil-pipe';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, CeilPipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  currentPage = 1;
  limit = 54;
  total = 0;

  constructor(
    private marvelService: MarvelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    const offset = (this.currentPage - 1) * this.limit;
    this.marvelService.getCharacters(offset, this.limit).subscribe((res: any) => {
      this.characters = res.data.results;
      this.total = res.data.total;
    });
  }

  nextPage() {
    if ((this.currentPage * this.limit) < this.total) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  goToCharacter(character: any) {
    this.router.navigate(['/character', character.id]);
  }
}
