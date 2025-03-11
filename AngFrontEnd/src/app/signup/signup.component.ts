import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = new FormGroup({
    full_name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    // nick_name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
    phone_number: new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
  });
  // , Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
  // pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
  constructor(private _api: SignupService, private _router: Router) { }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, confirmpassword, full_name, phone_number } = this.signupForm.value;
      this._api.signup(email, password,confirmpassword, full_name, phone_number).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        Swal.fire({
          title: 'Welcome Back!',
          text: 'You have successfully registered.',
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#4CAF50', // Green Button
          background: '#f9f9f9', // Light Background
          color: '#333', // Text Color
          timer: 2500, // Auto-close after 2.5 seconds
          timerProgressBar: true, // Show progress bar
          showClass: {
            popup: 'animate__animated animate__fadeInDown' // Fancy animation
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then(() => {
          this._router.navigate(['/']); // Redirect after alert
        });
      },
        (err) => {
          // ✅ SweetAlert2 Error Popup
          Swal.fire({
            title: 'Oops!',
            text: err.error.message,
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#FF5733', // Red Button
            background: '#fce4e4', // Light Red Background
            color: '#900', // Darker Red Text
            showClass: {
              popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            }
          });
        }
      );
    }
    else{
      console.log("signupForm not valid");
      
    }
  }
}
