import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../models/noticias.model';
import { NoticiasService } from '../../../services/noticias.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;

  keywork: string;
  date = new Date().toISOString().split('T')[0];
  
  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.cargarNoticias();

  }

  /**
   * Carga noticias por palabra clave
   */
  buscarPalabraClave() {
    this.noticiasService.getEverything(this.keywork, this.date).subscribe(result => {
      this.noticias = [];
      this.noticias.push( ...result.articles );
    });
  }


  /**
   * Carga ultimas noticias
   */
  cargarNoticias(country = 'mx') {
    this.noticiasService.getTopHeadlines(this.date, country)
      .subscribe( resp => {
        this.noticias = [];

        if ( resp.articles.length === 0 ) {
          return;
        }

        this.noticias.push( ...resp.articles );

      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

}
