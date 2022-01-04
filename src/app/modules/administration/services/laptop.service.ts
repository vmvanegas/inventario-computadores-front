import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  URL_LAPTOPLIST = environment.url_laptopList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_LAPTOPLIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_LAPTOPLIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_LAPTOPLIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_LAPTOPLIST}/${id}`, {headers: this.headers})
  }

  create(laptop) {
    return this.http.post(this.URL_LAPTOPLIST, laptop, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_LAPTOPLIST}/${id}`, {headers: this.headers})
  }

  update(laptop) {
    return this.http.put(`${this.URL_LAPTOPLIST}/${laptop.id}`, laptop, {headers: this.headers})
  }

}
