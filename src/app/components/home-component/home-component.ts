import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {
  characters: any[] = [];

  constructor(
    private marvelService: MarvelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.marvelService.getCharacters().subscribe((res: any) => {
      this.characters = res.data.results;
    });
  }

  goToCharacter(character: any) {
    this.router.navigate(['/character', character.id]);
  }  
}
