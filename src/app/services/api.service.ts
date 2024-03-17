import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  searchTerm=new BehaviorSubject("")
  cartCount=new BehaviorSubject(0)
  wishlistCount=new BehaviorSubject(0)
  SERVER_URL="https://ecart-back-angular.onrender.com"

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }

  getAllProductsAPI(){
   return this.http.get(`${this.SERVER_URL}/allProducts`)
  }

  addRegiserAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  addLoginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/viewProduct/${id}`)
  }

  appendTokenToHeader(){
    const token=sessionStorage.getItem("token")
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addTowishlist(product:any){
    return this.http.post(`${this.SERVER_URL}/addToWishlist`,product,this.appendTokenToHeader())
  }

  getAllWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/getAllWishlist`,this.appendTokenToHeader())
  }

  getWishlistCount(){
    this.getAllWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeWishistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/removeWishlist/${id}`,this.appendTokenToHeader())
  }

  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/addToCart`,product,this.appendTokenToHeader())
  }

  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/getCart`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  removeCartAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/removeCart/${id}`,this.appendTokenToHeader())
  }

  cartIncrementAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cartIncrement/${id}`,this.appendTokenToHeader())
  }

  cartDecrementAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cartDecrement/${id}`,this.appendTokenToHeader())
  }

  cartEmptyAPI(){
   return this.http.delete(`${this.SERVER_URL}/cartEmpty`,this.appendTokenToHeader())
  }

  isLoggedIn(){
    return !!sessionStorage.getItem("token")
  }

}
