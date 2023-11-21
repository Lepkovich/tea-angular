import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {OrderService} from "../../shared/services/order.service";


function regexValidator(pattern: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = new RegExp(pattern).test(control.value);
    return result ? null : {pattern: {value: control.value}}
  }
}

// function formValidator() {
//
// }

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {

  private subscription: Subscription | null = null;
  private productValue: string = '';
  orderPlaced: boolean = false;
  serverError: boolean = false;
  isSubmitting: boolean = false;
  loading: boolean =  false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
  }

  orderForm = new FormGroup({
    product: new FormControl({value: '', disabled: true}),
    name: new FormControl('', [Validators.required, regexValidator('^[a-zA-Zа-яА-Я]+$')]),
    surname: new FormControl('', [Validators.required, regexValidator('^[a-zA-Zа-яА-Я]+$')]),
    phone: new FormControl('', [Validators.required, regexValidator('^\\+?\\d{11}$')]),
    // phone: new FormControl('', [Validators.required, regexValidator('^\\+\\d{11}|\\d{11}$')]),
    country: new FormControl('', [Validators.required, regexValidator('^[a-zA-Zа-яА-Я]+$')]),
    zip: new FormControl('', [Validators.required, regexValidator('^[0-9]+$')]),
    address: new FormControl('', [Validators.required, regexValidator('^[a-zA-Zа-яА-Я0-9\\s\\/\\-]+$')]),
    comments: new FormControl('')
  })

// {validators: formValidator}


  get name() {
    return this.orderForm.get('name');
  }

  get surname() {
    return this.orderForm.get('surname');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get zip() {
    return this.orderForm.get('zip');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get comments() {
    return this.orderForm.get('comments');
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => { //колл-бэк функция с одним параметром
      if (params['product']) {
        this.orderForm.patchValue({
          product: params['product'], //передали параметр product из URL
        });
        this.productValue = params['product']; //присвоили product (мы не можем взять его при disabled: true)
      }
    })
  }


  signIn() {
    // console.log(this.orderForm.value);
    // console.log(this.productValue);
    if (this.isSubmitting) {
      return; // Если уже отправлен запрос, не делать ничего
    }
    this.isSubmitting = true; // Устанавливаем флаг в true
    this.loading = true;

    if (
      this.orderForm.value.name &&
      this.orderForm.value.surname &&
      this.orderForm.value.phone &&
      this.orderForm.value.country &&
      this.orderForm.value.zip &&
      this.productValue &&
      this.orderForm.value.address) {
      this.orderService.createOrder({
        name: this.orderForm.value.name,
        last_name: this.orderForm.value.surname,
        phone: this.orderForm.value.phone,
        country: this.orderForm.value.country,
        zip: this.orderForm.value.zip,
        product: this.productValue,
        address: this.orderForm.value.address,
        comment: this.orderForm.value.comments || ''
      })
        .subscribe(response => {
          if (response.success === 1) {
            // Задержка в 3 секунды перед сбросом флага и включением кнопки
            setTimeout(() => {
              this.isSubmitting = false; // Сбрасываем флаг после завершения запроса
              this.orderPlaced = true;
              this.loading = false;
              this.orderForm.reset();
            }, 3000);
          } else {
            this.serverError = true;
            this.isSubmitting = false; // Сбрасываем флаг после завершения запроса
          }
        })
    } else {
      alert('Заполните необходимые поля');
      this.isSubmitting = false; // Сбрасываем флаг в случае ошибки валидации
    }

  }

  // Получение параметра 'id' из URL
  // this.activatedRoute.paramMap.subscribe(params => {
  //   if (this.productId) {
  //     this.productId = params.get('id');
  //     console.log('Product ID:', this.productId);
  //   }
  // });

}
