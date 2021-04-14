import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../models/noticias.model';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
