import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs"
// import { first, tap, catchError } from 'rxjs/operators';

import { UserService } from '../../services/user.service' ;
import { AuthenticationService} from '../../services/authentication.service';

@Component(  {selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;
    

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            user_name: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .subscribe(
                data => {
                    //console.log(data);
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    console.log(error);
                    if(error.status == 406){
                        this.error="Username Taken!"
                    }else{
                        this.error="Something Went Wrong!"
                    }
                    this.loading = false;
                });

    }
}

