import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Burger House'
  currency = "$"
  productsData : any
  isOpenMenu = false

  card: HTMLElement | null = document.querySelector(".main-image")
  motionMatchMedia: MediaQueryList = window.matchMedia("(prefers-reduced-motion)")
  THRESHOLD: number = 15

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit(){
    this.appService.getData().subscribe(data => this.productsData = data)
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: "smooth"})
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  }

 

  confirmOrder() {
    if (this.form.valid) {

      this.appService.sendOrder(this.form.value).subscribe({
        next: (response: any) => {
          alert("Ваше замовлення прийнято")
          this.form.reset()
        },
        error: (response) => {
          alert(response.error.message)
        }
      })

    }
  }

  changeCurrency(){
    let newCurrency = "$"
    let coefficient = 1

    if(this.currency === "$"){
      newCurrency = "UAH"
      coefficient = 40
    }else if(this.currency === "UAH"){
      newCurrency = "€"
      coefficient = 1.1
    } else if (this.currency === '€') {
      newCurrency = '¥'
      coefficient = 6.9
    }
    this.currency = newCurrency

    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * coefficient).toFixed(1)
    })
  }

  openMenu(){
    this.isOpenMenu = !this.isOpenMenu
  }

}
