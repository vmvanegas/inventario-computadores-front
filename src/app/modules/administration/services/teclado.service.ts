import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecladoService {

  URL_TECLADOLIST = environment.url_tecladoList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_TECLADOLIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_TECLADOLIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_TECLADOLIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_TECLADOLIST}/${id}`, {headers: this.headers})
  }

  create(teclado) {
    return this.http.post(this.URL_TECLADOLIST, teclado, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_TECLADOLIST}/${id}`, {headers: this.headers})
  }

  update(teclado) {
    return this.http.put(`${this.URL_TECLADOLIST}/${teclado.id}`, teclado, {headers: this.headers})
  }

}
