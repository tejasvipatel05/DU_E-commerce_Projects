import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiCategoryService } from '../api-category.service';
import { Category } from '../category';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../signup.service';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  profileForm!: FormGroup;
  userProfile: any = {};
  isEditing = false;
  selectedFile: File | null = null;

  data:Category[] =[];
  constructor(private _api:ApiCategoryService,private _router:Router,private fb: FormBuilder, private userService: UserApiService){
    this._api.getAllCategory().subscribe((res:any)=>{
      this.data=res;
    })
  }

  ngOnInit() {
    this.getUserProfile();
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe((data: any) => {
      console.log(data)
      this.userProfile = data;
      this.profileForm.patchValue({
        name: data.name,
        email: data.email,
        phone: data.phone
      });
    });
  }

  enableEdit() {
    this.isEditing = true;
  }

  saveProfile() {
    this.userService.updateUserProfile(this.profileForm.value).subscribe(() => {
      this.isEditing = false;
      this.getUserProfile();
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.userService.uploadProfilePicture(formData).subscribe(() => {
        this.getUserProfile();
      });
    }
  }

  getProductByCat(id:any){
    this._router.navigate(['category',id])
  }
}
