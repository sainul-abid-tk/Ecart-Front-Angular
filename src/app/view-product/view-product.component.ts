import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:any={}
  constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToastrService){}
  ngOnInit(): void {
      this.route.params.subscribe((res:any)=>{
        const {id}=res
        this.getProduct(id)
      })
  }

  getProduct(id:any){
    this.api.viewProductAPI(id).subscribe((res:any)=>{
      this.product=res
      console.log(this.product);
    })
  }
  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      // Proceed to wishist
      this.api.addTowishlist(product).subscribe({
        next:(res:any)=>{
          this.toaster.success(`Product '${res.title}' added Successfully!!`)
          this.api.getWishlistCount()
        },
        error:(reason:any)=>{
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info("Please Login!!!")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      // Proceed to cart
      product.quantity=1
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.success(res)
          this.api.getCartCount()
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
