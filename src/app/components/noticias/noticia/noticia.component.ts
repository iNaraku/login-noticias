import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../../../models/noticias.model';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor() { }

  ngOnInit() {

    console.log('Favoritos', this.enFavoritos );
  
  }

  abrirNoticia() {
    // window.location.ancestorOrigins.

  }

}
