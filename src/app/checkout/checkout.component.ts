import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalAmount:string=""
  public payPalConfig ? : IPayPalConfig;
  checkoutStatus:boolean=false
  checkoutForm=this.fb.group({
    username:['',[Validators.pattern('[a-zA-Z ]*'),Validators.required]],
    address:['',[Validators.pattern('[a-zA-Z0-9 ]*'),Validators.required]],
    pincode:['',[Validators.pattern('[0-9]*'),Validators.required]]
  })
  constructor(private fb:FormBuilder,private toaster:ToastrService,private api:ApiService,private router:Router){}

  cancel(){
   this.checkoutForm.reset()
  }

  proceedToPay(){
    if(this.checkoutForm.valid){
      this.checkoutStatus=true
      this.totalAmount=sessionStorage.getItem("cartTotal") || ""
        this.initConfig()
    }else{
      this.toaster.info("Invaid Form!!!")
    }
  }
  initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data:any) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value:this.totalAmount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalAmount
                        }
                    }
                }
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.cartEmptyAPI().subscribe((res:any)=>{
                this.api.getCartCount()
                this.toaster.success("Successfully Placed Your Order!....Thank You Purchasing With Us!!!")
                this.checkoutStatus=false
                this.checkoutForm.reset()
                this.router.navigateByUrl('/')
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toaster.warning("Transaction Cancelled....Please try after some time!!!")
            this.checkoutStatus=false
        },
        onError: err => {
            console.log('OnError', err);
            this.toaster.warning("Transaction Failed....Please try after some time!!!")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}
}

