import { Component, computed, inject, input, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Catagories</h2>

          <mat-nav-list>
            @for (cat of catagories(); track cat) {
            <mat-list-item
              [activated]="cat === catagory()"
              class="my-2 relative
                      after:content-[''] after:absolute after:left-3 after:bottom-1 after:w-0 after:h-0.5 after:bg-gray-400
                      after:transition-all after:duration-300 hover:after:w-43"
              [routerLink]="['/products', cat]"
            >
              <span
                matListItemTitle
                class="font-medium"
                [class]="cat === catagory() ? '!text-white' : null"
              >
                {{ cat | titlecase }}
              </span>
            </mat-list-item>

            }
          </mat-nav-list>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">
          {{ catagory() | titlecase }}
        </h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} products found
        </p>

        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
          <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  catagory = input<string>('all');

  store = inject(EcommerceStore);

  catagories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);

  constructor() {
    this.store.setCatagory(this.catagory);
  }
}
