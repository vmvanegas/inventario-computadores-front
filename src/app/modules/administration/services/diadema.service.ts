import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiademaService {

  URL_DIADEMALIST = environment.url_diademaList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_DIADEMALIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_DIADEMALIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_DIADEMALIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_DIADEMALIST}/${id}`, {headers: this.headers})
  }

  create(diadema) {
    return this.http.post(this.URL_DIADEMALIST, diadema, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_DIADEMALIST}/${id}`, {headers: this.headers})
  }

  update(diadema) {
    return this.http.put(`${this.URL_DIADEMALIST}/${diadema.id}`, diadema, {headers: this.headers})
  }

}
