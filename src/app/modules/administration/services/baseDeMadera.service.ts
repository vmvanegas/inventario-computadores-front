import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseDeMaderaService {

  URL_BASEDEMADERALIST = environment.url_baseDeMaderaList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_BASEDEMADERALIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_BASEDEMADERALIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_BASEDEMADERALIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_BASEDEMADERALIST}/${id}`, {headers: this.headers})
  }

  create(baseDeMadera) {
    return this.http.post(this.URL_BASEDEMADERALIST, baseDeMadera, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_BASEDEMADERALIST}/${id}`, {headers: this.headers})
  }

  update(baseDeMadera) {
    return this.http.put(`${this.URL_BASEDEMADERALIST}/${baseDeMadera.id}`, baseDeMadera, {headers: this.headers})
  }

}
