import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit {

  currentUser: any;

  ngOnInit() {
  }
  constructor(private authenticationService : AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,) {

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  onSignOut(){
    console.log("hello");
    this.authenticationService.logout();

    this.router.navigate(["/login"])
    
  }

}
