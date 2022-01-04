import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CableVGAService {

  URL_CABLEVGALIST = environment.url_cableVGAList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_CABLEVGALIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_CABLEVGALIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_CABLEVGALIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_CABLEVGALIST}/${id}`, {headers: this.headers})
  }

  create(cableVGA) {
    return this.http.post(this.URL_CABLEVGALIST, cableVGA, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_CABLEVGALIST}/${id}`, {headers: this.headers})
  }

  update(cableVGA) {
    return this.http.put(`${this.URL_CABLEVGALIST}/${cableVGA.id}`, cableVGA, {headers: this.headers})
  }

}
