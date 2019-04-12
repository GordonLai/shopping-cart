import { Component, OnInit } from '@angular/core';
import { ShopCartService } from './shop-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private shopCartService: ShopCartService) {
    this.aryDatas = this.shopCartService.aryItem();
  }
  title = 'shopping-cart';
  aryDatas = [];
  addlist = [];
  qtyUpdate = 1;
  ngOnInit(): void {
    this.addlist.push({ 'total': 0 });
    for (const val of this.aryDatas['default']) {
      val.qty = 1;
    }
  }

  cartQty(row, type) {
    (row.qty === 1 && type === -1) ? row.qty = 1 : row.qty = (row.qty || 0) + Number(type);
  }
  addCart(event) {
    const name = event.name;
    const qty = event.qty;
    const price = event.price;
    const subtotal = price * qty;
    for (const val of this.addlist) {
      if (name === val.name) {
        this.addlist[0]['total'] = this.addlist[0]['total'] - val.subtotal;
        val.qty = qty;
        val.subtotal = val.qty * price;
        this.addlist[0]['total'] = this.addlist[0]['total'] + val.subtotal;
        return;
      }
    }
    const obj = {
      'name': name,
      'qty': qty,
      'subtotal': subtotal,
    };
    this.addlist[0]['total'] = this.addlist[0]['total'] + subtotal;
    this.addlist.push(obj);
  }
  delCart(num, idx) {
    this.addlist.splice(idx, 1);
    this.addlist[0]['total'] = this.addlist[0]['total'] - num;
  }
}
