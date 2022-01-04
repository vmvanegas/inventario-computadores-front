import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  URL_MONITORLIST = environment.url_monitorList
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  })

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(this.URL_MONITORLIST, {headers: this.headers})
  }

  get(page, search = null) {
    if(search==null){
      return this.http.get(`${this.URL_MONITORLIST}/p/${page}`, {headers: this.headers})
    } else {
      return this.http.get(`${this.URL_MONITORLIST}/p/${page}?search=${search}`, {headers: this.headers})
    }    
  }

  getById(id) {
    return this.http.get(`${this.URL_MONITORLIST}/${id}`, {headers: this.headers})
  }

  create(monitor) {
    return this.http.post(this.URL_MONITORLIST, monitor, {headers: this.headers})
  }

  delete(id) {
    return this.http.delete(`${this.URL_MONITORLIST}/${id}`, {headers: this.headers})
  }

  update(monitor) {
    return this.http.put(`${this.URL_MONITORLIST}/${monitor.id}`, monitor, {headers: this.headers})
  }

}
