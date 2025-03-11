// import { NgModule } from '@angular/core';
// import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { environment } from '../environments/environment';
// import { LoginComponent } from './login/login.component';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';

// @NgModule({
//     declarations: [/* Your components */],
//     imports: [
//       BrowserModule,
//       AngularFireModule.initializeApp(environment.firebaseConfig), // Import Firebase
//       AngularFireAuthModule, // Import AngularFireAuthModule
//     ],
//   })

// export class AppModule {}

// bootstrapApplication(LoginComponent, {
//     providers: [
//       provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
//       provideAuth(() => getAuth())
//     ]
//   });