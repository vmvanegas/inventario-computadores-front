import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargadorService {

  URL_CARGADORLIST = environment.url_cargadorList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_CARGADORLIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_CARGADORLIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_CARGADORLIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_CARGADORLIST}/${id}`, {headers: this.headers})
  }

  create(cargador) {
    return this.http.post(this.URL_CARGADORLIST, cargador, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_CARGADORLIST}/${id}`, {headers: this.headers})
  }

  update(cargador) {
    return this.http.put(`${this.URL_CARGADORLIST}/${cargador.id}`, cargador, {headers: this.headers})
  }

}
