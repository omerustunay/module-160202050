
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/sql/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
  export class LoginPage implements OnInit {

	username: string = ""
	password: string = ""
	dataReturned:any;
	constructor(private afAuth: AngularFireAuth , 
		private router:Router,
		public alertController:AlertController,
		public modalController: ModalController,
		public authService: AuthService){
			this.loginForm = new FormGroup({
			  email: new FormControl(),
			  password: new FormControl()
			})
		  }
	ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async login() {
	  await this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]);
	}

	
}