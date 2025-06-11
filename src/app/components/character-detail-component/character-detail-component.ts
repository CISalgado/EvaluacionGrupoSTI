import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-character-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail-component.html',
  styleUrl: './character-detail-component.css'
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private marvelService: MarvelService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.marvelService.getCharacterById(id).subscribe((res: any) => {
      this.character = res.data.results[0];
    });
  }

  goHome() {
    window.history.back();
  }
}
