import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="flex flex-col items-center justify-center h-screen text-center animate-fadeIn">
      <h1 class="text-6xl font-bold text-red-500">😵 404</h1>
      <p class="mt-4 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
      <button
        routerLink="/products/all"
        class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        🔙 Back to Products
      </button>

      <!-- playful animation dots -->
      <div class="flex gap-2 mt-8">
        <span class="w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>
        <span class="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-200"></span>
        <span class="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-400"></span>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
  {
    path: 'products/:catagory',
    loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  },
  {
    path: '**',
    loadComponent: () => Promise.resolve(NotFoundComponent),
  },
];
