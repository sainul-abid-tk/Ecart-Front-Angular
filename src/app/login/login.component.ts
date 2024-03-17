import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router,private toaster:ToastrService){}

  login(){
    if(this.loginForm.valid){
      const email=this.loginForm.value.email
      const password=this.loginForm.value.password
      const user={email,password}
      this.api.addLoginAPI(user).subscribe({
        next:(res:any)=>{
          this.toaster.success(`${res.existingUser.username} logged Successfully!!`)
          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)
          this.api.getWishlistCount()
          this.api.getCartCount()
          this.loginForm.reset()
          this.router.navigateByUrl("")
        },
        error:(reason:any)=>{
          this.toaster.error(reason.error)
        }
      })
    }else{
      this.toaster.warning("Invalid Form!!")
    }
  }
}
