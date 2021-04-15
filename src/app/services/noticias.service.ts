import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaTopHeadlines } from '../models/noticias.model';


const apiKey = environment.noticiasApiKey;
const apiUlr = environment.noticiasApiUlr;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 1;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient ) { }


  private ejecutarQuery<T>( query: string ) {

    query = apiUlr + query;

    return this.http.get<T>( query, { headers } );

  }


  /**
   * Obtiene las ultimas noticias
   * @param date fecha de noticia
   * @param country clave de pais
   * @returns 
   */
  getTopHeadlines(date: string, country: string) {

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=${ country }&page=${ this.headlinesPage }&from=${ date }&to=${ date }`);
  }


  /**
   * Obtiene las ultims notidicas por categoria
   * @param categoria categoria de noticia
   * @returns 
   */
  getTopHeadlinesCategoria( categoria: string ) {

    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`);

  }


  /**
   * Obtiene las ultimas noticias por palabra clave en titulo
   * @param work palabra clave
   * @param date fecha de noticia
   * @returns 
   */
  getEverything(work: string, date: string) {

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/everything?q=${ work }&from=${ date }&to=${ date }&language=es`);

  }
}
