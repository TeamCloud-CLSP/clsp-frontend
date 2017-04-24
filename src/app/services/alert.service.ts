import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

  public msg = '';

  constructor() { }

  setMsg(msg: string) {
    this.msg = msg;
  }

  clearMsg() {
    this.msg = '';
  }

  getMsg(): string {
    return this.msg;
  }

}
