import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/modules/administration/services/user-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/utils/MustMatch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  @ViewChild('modalToggleSignUp') 
  modalToggleSignUp: ElementRef

  @ViewChild('myModalSignUp') 
  myModalSignUp: ElementRef

  @ViewChild('modalToggle') 
  modalToggle: ElementRef

  @ViewChild('myModal') 
  myModal: ElementRef

  @ViewChild('container') 
  container: ElementRef

  public loginForm: FormGroup
  public profileForm: FormGroup
  public wrongUser: boolean = false
  public error: boolean = false
  

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private userInfo: UserInfoService,
    ) { 
    this.loginForm = formBuilder.group({
      nombreDeUsuario: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]]
    })

    this.profileForm = formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      lastName: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(2), Validators.pattern("[a-zA-Z ]{0,}")]],
      nombreDeUsuario: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8) ,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$")]],
      cargo: ['', [Validators.required, Validators.maxLength(60)]],
    }
    )
  }


  currentYear(){
    return new Date().getFullYear()
  }

  ngOnInit(): void {
  }
  get form() {
    return this.loginForm.controls
  }

  get signupForm() {
    return this.profileForm.controls
  }

  login() {   
    if(this.loginForm.valid) {

      const body = {
        NombreDeUsuario: this.loginForm.controls['nombreDeUsuario'].value,
        Clave: this.loginForm.controls['password'].value
      }

      this.authService.validateUser(body).subscribe(response=>{
        this.wrongUser = false
        localStorage.setItem("token", JSON.stringify(response.token))     
        localStorage.setItem("user", JSON.stringify(response))  
        this.userInfo.User = response
        this.loginForm.reset()     
        this.redirectToAdmin()
      }, err=>{
        this.wrongUser = true
        this.showModal()
        console.log(err)
      })
    }

  }

  signUp() {   
    if(this.profileForm.valid) {
      const body = {
        Nombre: this.profileForm.controls['firstName'].value,
        Apellido: this.profileForm.controls['lastName'].value,
        NombreDeUsuario: this.profileForm.controls['nombreDeUsuario'].value,
        Clave: this.profileForm.controls['password'].value,
        Cargo: this.profileForm.controls['cargo'].value
      }

      this.authService.createUser(body).subscribe(
        response=>{
        this.profileForm.reset()
        this.error = false
        this.showModalSignUp()
      }, err=>{
        this.error = true
        this.showModalSignUp()
        console.log(err)
      })
    }

  }


  showModal() {
    this.modalToggle.nativeElement.click()
  }

  showModalSignUp() {
    this.modalToggleSignUp.nativeElement.click()
  }


  redirectToAdmin() {
    this.router.navigate(['/administracion/laptops'])
  }

  redirectToLogin() {
    /* this.router.navigate(['/login']) */
    location.reload()
  }


  toSignUp(){
    this.container.nativeElement.classList.toggle("active-signup")
  }
}
