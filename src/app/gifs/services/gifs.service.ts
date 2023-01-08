import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'R6UAH35SJOJD1i4TO9JO8azMZJEjn3Y7'
  private url       : string = 'https:api.giphy.com/v1/gifs'      
  private _historial: string[] = []

  public resultados: Gif[] = []

  get historial() {
    return[...this._historial]
  }
  
  constructor( private http: HttpClient) {
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')! )
    }
  }


  buscarGifs( query:string ) {

    query = query.trim().toLowerCase()

    if( !this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,10)
      localStorage.setItem('historial', JSON.stringify( this._historial ))
    }

    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.url}/search`, { params })
      .subscribe( (resp ) => {
        this.resultados = resp.data
      })

  }

  
}
