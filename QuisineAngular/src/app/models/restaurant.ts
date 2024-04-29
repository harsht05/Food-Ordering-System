export class Restaurant {
  constructor(
    public userId: number = 0,
    public userName: string = '',
    public userEmail: string = '',
    public userPass: string = '',
    public userImg: string = '',
    public restOwnerName: string = '',
    public userContact: string = '',
    public userAddress: string = '',
    public userCity: string = '',
    public userState: string = '',
    public userPin: number = 0,
    public role: string = '',
    public isBlocked:boolean=false
  ) {}
}
