import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _authenticationService : AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this._authenticationService.logout();
  }

}
