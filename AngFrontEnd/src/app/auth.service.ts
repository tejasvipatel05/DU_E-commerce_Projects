// import { Injectable } from '@angular/core';
// import { Auth, signInWithEmailAndPassword, signInWithCredential, UserCredential } from '@angular/fire/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private auth: Auth) {}

//   async loginWithEmail(email: string, password: string): Promise<UserCredential | null> {
//     try {
//       return await signInWithEmailAndPassword(this.auth, email, password);
//     } catch (error) {
//       console.error('Email Login Error:', error);
//       return null;
//     }
//   }

//   async loginWithPhone(credential: any): Promise<UserCredential | null> {
//     try {
//       return await signInWithCredential(this.auth, credential);
//     } catch (error) {
//       console.error('Phone Login Error:', error);
//       return null;
//     }
//   }
// }
