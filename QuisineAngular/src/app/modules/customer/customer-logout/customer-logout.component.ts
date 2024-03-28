import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-logout',
  templateUrl: './customer-logout.component.html',
  styleUrl: './customer-logout.component.css'
})
export class CustomerLogoutComponent {

  constructor(private sessionStorageService: SessionStorageService, private route: Router) {

  }

  ngOnInit() {

    this.sessionStorageService.clearStorage();
    window.history.back();
    
  }
}
