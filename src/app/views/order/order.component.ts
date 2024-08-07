import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { CreateOrderService } from 'src/app/shared/services/create-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  sendForm = this.fb.group({
    product: [{ value: '', disabled: true }],
    name: ['', [Validators.required, Validators.pattern('([A-Za-zА-яа-я]+)')]],
    lastName: ['', [Validators.required, Validators.pattern('([A-Za-zА-яа-я]+)')]],
    phone: ['', [Validators.required, Validators.pattern('(^[\+]?[0-9]{11}$)')]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    address: ['', [Validators.required, Validators.pattern('([(A-Za-zА-яа-я+\s+ )|(0-9\s)-?]+)')]],
    comment: [''],
  });

  get name() { return this.sendForm.get('name'); }
  get lastName() { return this.sendForm.get('lastName'); }
  get phone() { return this.sendForm.get('phone'); }
  get country() { return this.sendForm.get('country'); }
  get zip() { return this.sendForm.get('zip'); }
  get address() { return this.sendForm.get('address'); }

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private createOrderService: CreateOrderService, private fb: FormBuilder) { }

  formValues = {
    product: '',
    name: '',
    lastName: '',
    phone: '',
    country: '',
    zip: '',
    address: '',
    comment: '',
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.product = params['product'];
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  createOrder() {
    this.subscriptionOrder = this.createOrderService.createOrder({
      product: this.formValues.product,
      name: this.formValues.name,
      last_name: this.formValues.lastName,
      phone: this.formValues.phone,
      country: this.formValues.country,
      zip: this.formValues.zip,
      address: this.formValues.address,
      comment: this.formValues.comment,
    })
      .subscribe(response => {
        if (response.success && !response.message) {
          document.getElementById('gratitude')?.classList.add('active');
          document.getElementById('form')?.classList.add('close');
        } else {
          document.getElementById('error-text')?.classList.add('active');
        }
      })
  }

}
