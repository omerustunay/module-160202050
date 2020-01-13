import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	password: string = ""
	cpassword: string = ""

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public router: Router,
		public modalController: ModalController
		) { }

	ngOnInit() {
	}

	async register() {
		const { username, password, cpassword } = this
		if(password !== cpassword) {
			alert("Parolalar eşleşmiyor!!");
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@codedamn.com', password);

			this.afstore.doc(`users/${res.user.uid}`).set({
				username
			})
			alert("Kayıt başarı ile oluşturuldu.");
		} catch(error) {
			console.dir(error)
		}
	}

}