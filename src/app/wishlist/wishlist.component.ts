import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  allProducts:any=[]
  constructor(private api:ApiService,private toaster:ToastrService){}
  ngOnInit(): void {
      this.getAllWishlist()
  }

  getAllWishlist(){
    this.api.getAllWishlistAPI().subscribe((res:any)=>{
      this.allProducts=res
      console.log(this.allProducts);
      this.api.getWishlistCount()
    })
  }

  removeWishist(id:any){
    this.api.removeWishistItemAPI(id).subscribe((res:any)=>{
      this.getAllWishlist()
    })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      // Proceed to cart
      product.quantity=1
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.success(res)
          this.api.getCartCount()
          this.removeWishist(product._id)
        },
        error:(reason:any)=>{
          this.toaster.error(reason.error)
        }
      })
    }else{
      this.toaster.info("Please Login!!!")
    }
  }

}
