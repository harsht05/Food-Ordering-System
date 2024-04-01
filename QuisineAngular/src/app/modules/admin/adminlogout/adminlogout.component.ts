import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogout',
  templateUrl: './adminlogout.component.html',
  styleUrl: './adminlogout.component.css'
})

export class AdminlogoutComponent {

  constructor(private sessionStorage:SessionStorageService,private route:Router){}

  ngOnInit(){
    this.sessionStorage.clearStorage();
    this.route.navigate(['']);
  }

}
