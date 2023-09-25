import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private HTTP: HttpClient) { }

  sendOrder(data: any) {
    return this.HTTP.post('https://burgers-back.onrender.com/basket', data)
  }
  getData() {
    return this.HTTP.get('https://burgers-back.onrender.com/products')
  }
}
