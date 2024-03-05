import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
      this.getAllProducts()
  }

  getAllProducts(){
    this.api.getAllProductsAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProducts=res
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }
}
