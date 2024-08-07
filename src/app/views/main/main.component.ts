import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  items: { title: string, content: string, svg: string, active?: boolean }[] = [
    {
      svg: '▼',
      title: 'Собираете ли вы подарочные боксы?',
      content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!',
    },
    {
      svg: '▼',
      title: 'Сколько у вас разновидностей чая?',
      content: 'У нас большой ассортимет, вы только посмотрите!',
    },
    {
      svg: '▼',
      title: 'В какой срок осуществляется доставка?',
      content: 'В течение нескольких дней со дня приема заказа!',
    },
    {
      svg: '▼',
      title: 'У вас обновляется ассортимент?',
      content: 'Конечно, мы каждую неделю обновляем свой ассортимент!',
    },
    {
      svg: '▼',
      title: 'Какого объема у вас пачки чая?',
      content: 'У нас есть разные объемы, на вкус и цвет каждого!',
    },
  ]

  private observable: Observable<string>;
  private subscription: Subscription | null = null;

  constructor() {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next('hello');
        let popup = document.getElementById('popup');
        popup?.classList.add('active');
      }, 10000);
    });
  }

  ngOnInit(): void {
    this.subscription = this.observable.subscribe((param: string) => {
      console.log(param);
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  itemClicked(i: number) {
    this.items = this.items.map((item) => {
      item.active = false;
      item.svg = '▼';

      return item;
    })

    this.items[i].active = true;
    this.items[i].svg = '▲';
  }

  popupClose() {
    let popup = document.getElementById('popup');
    popup?.classList.remove('active');
  }

}
