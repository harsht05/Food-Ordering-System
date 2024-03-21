export class Customer {
    constructor(
        public userId: number = 0,
        public userName: string = '',
        public userEmail: string = '',
        public userPass: string = '',
        public userContact: string = '',
        public userCity: string = '',
        public userState: string = '',
        public userPin: number = 0,
        public role: string = ''
      ) {}
}
