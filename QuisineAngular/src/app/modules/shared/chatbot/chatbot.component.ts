import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import $ from 'jquery';
import { ChatbotService } from '../../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  isClicked: boolean = false;

  constructor(private chatbotService: ChatbotService) {}

  clickOnBot() {
    this.isClicked = !this.isClicked;
  }

  chatbotForm = new FormGroup({
    msg: new FormControl(),
  });

  onSubmitMsg() {
    const message = this.chatbotForm.value.msg;
    if (message !== null) {
      const avatarUrl =
        'https://mrseankumar25.github.io/Sandeep-Kumar-Frontend-Developer-UI-Specialist/images/avatar.png';
      const userMessage = `
        <div class="msg user my-2" style="
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        background: #d3c8c8;
        border-radius: 10px;
        padding: 10px;
        ">
        
          <span class="responsText">${message}</span>
          <div class="avtar-box">
            <img src="${avatarUrl}" alt="" style="
            width: 39px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 5px;
        ">
          </div>
        </div>
      `;

      $('.Messages_list').append(userMessage);

      this.replyMsg(message);

      this.chatbotForm.patchValue({ msg: '' });
    }
  }

  replyMsg(msg: string) {
    const avatarUrl =
      'assets/images/chat-bot-avatar.jpg';

    if (msg.toLowerCase() === 'hii' || msg.toLowerCase() === 'hi') {
      const replyMessage = `
        <div class="msg my-2" style="
        display: flex;
        align-items: center;
        background: #e1b5b5;
        padding: 10px;
        border-radius: 11px;
        ">
        <div class="avtar-box">
        <img src="${avatarUrl}" alt="" style="
        width: 39px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
    ">
      </div>
          <span class="responsText">Hello</span>
        </div>
      `;

      $('.Messages_list').append(replyMessage);
    } else if (msg.toLowerCase().indexOf('hotels in ') != -1) {
      const city = msg.toLowerCase().trim().substring(10);
      this.chatbotService.getRestaurantsByCity(city).subscribe((response) => {
        if (response.length > 0) {
          let restaurantsHTML = '';
          response.forEach((restaurant) => {
            restaurantsHTML += `<a href="/restaurantFoods/${restaurant.userId}">${restaurant.userName}</a><br>`;
          });

          const replyMessage = `
          <div class="msg my-2" style="
        display: flex;
        align-items: center;
        background: #e1b5b5;
        padding: 10px;
        border-radius: 11px;
        ">
        <div class="avtar-box">
        <img src="${avatarUrl}" alt="" style="
        width: 39px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
    ">
    </div>
            <span class="responsText">
            Here are Top Hotels in ${city} : <br>  
              ${restaurantsHTML}
            </span>
          </div>
        `;

          $('.Messages_list').append(replyMessage);
        } else {
          const replyMessage = `
          <div class="msg my-2" style="
        display: flex;
        align-items: center;
        background: #e1b5b5;
        padding: 10px;
        border-radius: 11px;
        ">
        <div class="avtar-box">
        <img src="${avatarUrl}" alt="" style="
        width: 39px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
    ">
    </div>
            <span class="responsText">
            Sorry, No restaurants found in ${city}. <br> Try for different city.....
            </span>
          </div>
        `;

          $('.Messages_list').append(replyMessage);
        }
      });
    } else if (msg.toLowerCase().indexOf('food items in ') != -1) {
      const hotelname = msg.toLowerCase().trim().substring(14);

      this.chatbotService
        .getRestaurantFoodById(hotelname)
        .subscribe((response) => {
          if (response.length > 0) {
            let foods = '';
            response.forEach((foodItem) => {
              foods += `<a href="/restaurantFoods/${foodItem.restaurant.userId}">${foodItem.food.foodName}</a><br>`;
            });

            const replyMessage = `
            <div class="msg my-2" style="
            display: flex;
            align-items: center;
            background: #e1b5b5;
            padding: 10px;
            border-radius: 11px;
            ">
            <div class="avtar-box">
            <img src="${avatarUrl}" alt="" style="
            width: 39px;
            height: 38px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 5px;
        ">
        </div>
            <span class="responsText">
            Here are Delicous Food Items in ${hotelname} : <br>  
              ${foods}
            </span>
          </div>
        `;

            $('.Messages_list').append(replyMessage);
          }
        });
    } else if (msg.toLowerCase().indexOf('range of ') != -1) {
      const hotelname = msg.toLowerCase().trim().substring(9);
      let min = 0;
      let max = 0;

      this.chatbotService
        .getMinRestaurantFoodPrice(hotelname.toLowerCase())
        .subscribe((response) => {
          min = response;

          this.chatbotService
            .getMaxRestaurantFoodPrice(hotelname.toLowerCase())
            .subscribe((response) => {
              max = response;
              if (min != 0 && max != 0 && min != null && max != null) {
                const replyMessage = `
                <div class="msg my-2" style="
                display: flex;
                align-items: center;
                background: #e1b5b5;
                padding: 10px;
                border-radius: 11px;
                ">
                <div class="avtar-box">
                <img src="${avatarUrl}" alt="" style="
                width: 39px;
                height: 38px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 5px;
            ">
            </div>
                <span class="responsText">
                ${hotelname} has a price range starting from Rs.${min} and goes upto Rs.${max}.<br>  
                    
                </span>
              </div>
            `;

                $('.Messages_list').append(replyMessage);
              } else {
                const replyMessage = `
                <div class="msg my-2" style="
                display: flex;
                align-items: center;
                background: #e1b5b5;
                padding: 10px;
                border-radius: 11px;
                ">
                <div class="avtar-box">
                <img src="${avatarUrl}" alt="" style="
                width: 39px;
                height: 38px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 5px;
            ">
            </div>
                <span class="responsText">
                Sorry, No restaurant name ${hotelname} found. <br> Try for different one.....
                </span>
              </div>
            `;

                $('.Messages_list').append(replyMessage);
              }
            });
        });
    } else if (msg.toLowerCase().indexOf('cheap hotel in ') != -1) {
      const city = msg.toLowerCase().trim().substring(15);  

      this.chatbotService.getCheapRestaurant(city).subscribe((response) => {
        if (response !== null) {
          const replyMessage = `
          <div class="msg my-2" style="
          display: flex;
          align-items: center;
          background: #e1b5b5;
          padding: 10px;
          border-radius: 11px;
          ">
          <div class="avtar-box">
          <img src="${avatarUrl}" alt="" style="
          width: 39px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 5px;
      ">
      </div>
                <span class="responsText">
                <a href="/restaurantFoods/${response.restaurant.userId}">${response.restaurant.userName}</a> is a cheap and affordable restaurant in ${city} starting from just Rs.${response.rate}.<br>  
                    
                </span>
              </div>
            `;

          $('.Messages_list').append(replyMessage);
        } else {
          const replyMessage = `
          <div class="msg my-2" style="
          display: flex;
          align-items: center;
          background: #e1b5b5;
          padding: 10px;
          border-radius: 11px;
          ">
          <div class="avtar-box">
          <img src="${avatarUrl}" alt="" style="
          width: 39px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 5px;
      ">
      </div>
                <span class="responsText">
                Sorry, No restaurants found in ${city}. <br> Try for different city.....
                </span>
              </div>
            `;

          $('.Messages_list').append(replyMessage);
        }
      });
    } else {
      const replyMessage = `
      <div class="msg my-2" style="
        display: flex;
        align-items: center;
        background: #e1b5b5;
        padding: 10px;
        border-radius: 11px;
        ">
        <div class="avtar-box">
        <img src="${avatarUrl}" alt="" style="
        width: 39px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
    ">
    </div>
        <span class="responsText">Sorry, I'm not able to recognize you, Try asking different question.....</span>
      </div>
    `;

      $('.Messages_list').append(replyMessage);
    }
  }
}
