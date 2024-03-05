import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL="http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllProductsAPI(){
   return this.http.get(`${this.SERVER_URL}/allProducts`)
  }

  addRegiserAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  addLoginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }
}
