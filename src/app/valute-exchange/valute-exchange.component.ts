import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RootObject } from '../interfaces/interfaces';

@Component({
  selector: 'app-valute-exchange',
  templateUrl: './valute-exchange.component.html',
  styleUrls: ['./valute-exchange.component.scss'],
})
export class ValuteExchangeComponent {
  public title = 'rxjs';
  public users!: RootObject;
  public quantity = 0;
  public converted = 0;
  public sourceCurrency: string = 'USD';
  public targetCurrency: string = 'EUR';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  public convert() {
    if (this.sourceCurrency === this.targetCurrency) {
      this.converted = this.quantity;
    } else {
      const apiUrl = `https://v6.exchangerate-api.com/v6/b7fe99a9b6c88c5c630ba504/pair/${this.sourceCurrency}/${this.targetCurrency}`;
      this.http.get<RootObject>(apiUrl).subscribe((res: RootObject) => {
        this.users = res;
      });
      this.converted = this.quantity * this.users.conversion_rate;
    }
  }
  public convertBack() {
    if (this.sourceCurrency === this.targetCurrency) {
      this.converted = this.quantity;
    } else {
      const apiUrl = `https://v6.exchangerate-api.com/v6/b7fe99a9b6c88c5c630ba504/pair/${this.sourceCurrency}/${this.targetCurrency}`;
      this.http.get<RootObject>(apiUrl).subscribe((res: RootObject) => {
        this.users = res;
      });
      this.quantity = this.converted * this.users.conversion_rate;
    }
  }
  public reset() {
    this.quantity = 0;
    this.converted = 0;
  }
}
