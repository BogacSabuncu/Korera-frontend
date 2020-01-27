import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
//import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterContentChecked {
  private name: string;
  private dropdownActive: boolean;
  currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    //private projectService: ProjectService,
    private router: Router
  ) {
    this.dropdownActive = false;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {}

  ngAfterContentChecked() {
    this.name = localStorage.getItem('name');
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.dropdownActive = false;
  }

  profile() {
    this.router.navigate(['/profile']);
    this.dropdownActive = false;
  }

  triggerDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }
}
