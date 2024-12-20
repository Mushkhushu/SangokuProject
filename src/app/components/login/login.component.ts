import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public name: string;
  public message?: string | null;
  public isSubmitted: boolean = false;
  public formLogin!: FormGroup;
  @Input() isAuthenticated: boolean = false;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.name = this.authService.getName();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.has('message')) {
      this.message = this.activatedRoute.snapshot.queryParamMap.get('message');
      console.log(this.message);
    }
    this.formLogin = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }
  SubmitForm() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.logIn(this.formLogin.value.name)
      console.log(this.formLogin.value);
      console.log("connecté en tant que : " + this.name);
      this.GoToHome();
    } else {
      console.log("FORMULAIRE INVALIDE !")
    }
  }
  public login(){
    this.authService.logIn('Mojotito');
    this.authService.isAuthenticationLoaded.subscribe(result =>this.isAuthenticated = result);
    this.name = this.authService.getName();
    console.log("connecté en tant que : " + this.name);
    this.GoToHome();
  }
  GoToHome() {
    this.router.navigate(['/home']);
  }
}
