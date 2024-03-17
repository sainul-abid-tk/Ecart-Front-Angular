import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProducts:any=[]
  coupenStatus:boolean=false
  cartTotal:number=0
  coupenClickStatus:boolean=false
   ngOnInit(): void {
       this.getCartProducts()
   }
    constructor(private api:ApiService,private toaster:ToastrService,private router:Router){}
   getCartProducts(){
      this.api.getCartAPI().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.allProducts=res
          console.log(this.allProducts);
          this.grandTotal()
        },
        error:(reason:any)=>{
          console.log(reason.error);
        }
      })
   }

   removeCart(id:any){
    this.api.removeCartAPI(id).subscribe((res:any)=>{
      this.getCartProducts()
      this.api.getCartCount()
    })
   }

   decrementCart(id:any){
    this.api.cartDecrementAPI(id).subscribe((res:any)=>{
      this.api.getCartCount()
      this.getCartProducts()
    })
   }

   incrementCart(id:any){
    this.api.cartIncrementAPI(id).subscribe((res:any)=>{
      this.api.getCartCount()
      this.getCartProducts()
    })
   }

   emptyCart(){
    this.api.cartEmptyAPI().subscribe({
      next:(res:any)=>{
        this.getCartProducts()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);
      }
    })
   }

   grandTotal(){
    this.cartTotal=Math.ceil(this.allProducts.map((product:any)=>product.totalPrice).reduce(((p1:any,p2:any)=>p1+p2)))
   }

   getCoupen(){
    this.coupenStatus=true
   }

   discount(amount:number){
    this.coupenClickStatus=true
    const discount=Math.ceil(this.cartTotal*amount/100)
    this.cartTotal-=discount
   }
   checkOut(){
    sessionStorage.setItem("cartTotal",JSON.stringify(this.cartTotal))
    this.router.navigateByUrl('/checkout')
   }
}
