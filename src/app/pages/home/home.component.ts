import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/noticias.model';
import { NoticiasService } from '../../services/noticias.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService,
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.cargarNoticias();
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

  loadData( event ) {

    console.log(event);

    this.cargarNoticias( event );
  }

  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadlines()
      .subscribe( resp => {
        console.log('noticias', resp );

        if ( resp.articles.length === 0 ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        // this.noticias = resp.articles;
        this.noticias.push( ...resp.articles );

        if ( event ) {
          event.target.complete();
        }

      });
  }

}
