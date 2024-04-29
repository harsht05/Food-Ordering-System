import { Component } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PayementService } from '../../../services/payement.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {

  constructor(private sessionStorageService: SessionStorageService, private payementService:PayementService, private route: Router) {

  }

  totalMealCharges: number = 0;
  delAddress:string='';

  ngOnInit() {

    const cid = this.sessionStorageService.getItem("custId");
    if(cid === null) {

      Swal.fire({
        title: 'Please Login To Continue....',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Go Back',
        allowOutsideClick: false,
        allowEscapeKey: false 
      }).then((result) => {
        if (result.value) {
  
          this.route.navigate(['login']);
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) {
          
          this.sessionStorageService.clearStorage();
          this.route.navigate(['']);
        }
      });
    }

    else {

      this.totalMealCharges = this.sessionStorageService.getItem("totalCharges");
      this.delAddress = this.sessionStorageService.getItem("custAddress");

    type Address = {
      address: string
    }
    
    let addressInput: HTMLInputElement
    
    Swal.fire<Address>({
      title: 'Check Your Delivery Address',
      html: `
      <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <input type="text" id="address" class="form-control" value="${this.delAddress}">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" id="city" class="form-control" value="${this.sessionStorageService.getItem("custCity")}" readonly>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" id="pin" class="form-control" value="${this.sessionStorageService.getItem("custPin")}" readonly>
          </div>
        </div>
      </div>
    </div>
      `,
      confirmButtonText: 'Confirm and Make Payement',
      icon:'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!
        addressInput = popup.querySelector('#address') as HTMLInputElement
        addressInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const address = addressInput.value
        if (!address) {
          Swal.showValidationMessage(`Please Enter Valid Address`)
        }
        return { address }
      },
      
    }).then((result) => {

      if(result.isConfirmed) {

        this.delAddress = addressInput.value;
        this.sessionStorageService.setItem("delAddress", this.delAddress);

        console.log(this.delAddress);
        
        this.payementService.generatePayementLink(cid, this.totalMealCharges + 60).subscribe(response => {

          // console.log(response);
          window.location.href = response.payment_link_url;
        });
      }

      else {
          
        window.history.back();
      }
    });
    }
  }
}
