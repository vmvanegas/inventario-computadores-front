import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  URL_MOUSELIST = environment.url_mouseList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_MOUSELIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_MOUSELIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_MOUSELIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_MOUSELIST}/${id}`, {headers: this.headers})
  }

  create(mouse) {
    return this.http.post(this.URL_MOUSELIST, mouse, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_MOUSELIST}/${id}`, {headers: this.headers})
  }

  update(mouse) {
    return this.http.put(`${this.URL_MOUSELIST}/${mouse.id}`, mouse, {headers: this.headers})
  }

}
