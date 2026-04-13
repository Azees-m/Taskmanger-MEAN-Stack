import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  show = false;
  title = '';
  message = '';
  callback: any = null;

  open(title: string, message: string, cb: any) {
    this.title = title;
    this.message = message;
    this.callback = cb;
    this.show = true;
  }

  close() {
    this.show = false;
  }

  confirm() {
    if (this.callback) {
      this.callback();
    }
    this.close();
  }
}