import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';

export type EcommerceState = {
  products: Product[];
  catagory: string;
  wishlistItems: Product[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      // Electronics
      {
        id: '1',
        name: 'Smartphone X200',
        description: 'A sleek smartphone with 128GB storage and dual cameras.',
        price: 699,
        imageUrl:
          'https://www.androidheadlines.com/wp-content/uploads/2024/10/Vivo-X200-Pro-official-image-52.jpg', // smartphone
        rating: 4.5,
        reviewCount: 120,
        inStock: true,
        catagory: 'electronics',
      },
      {
        id: '2',
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones with 30 hours battery life.',
        price: 199,
        imageUrl:
          'https://s.yimg.com/uu/api/res/1.2/R1ZSeUQVIQvFZo1I54afnA--~B/Zmk9c3RyaW07aD03MjA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://s.yimg.com/os/creatr-uploaded-images/2025-05/372091f0-31ad-11f0-b73f-61b1009cb553', // headphones
        rating: 4.7,
        reviewCount: 85,
        inStock: true,
        catagory: 'electronics',
      },
      {
        id: '3',
        name: '4K Smart TV',
        description: '55-inch Ultra HD Smart TV with HDR support.',
        price: 899,
        imageUrl:
          'https://image.made-in-china.com/2f0j00uCpqIMJrnvkz/Amaz-43-55-65-Inch-HDMI-4K-OLED-Voice-Remote-Control-Smart-TV.webp', // TV
        rating: 4.6,
        reviewCount: 200,
        inStock: true,
        catagory: 'electronics',
      },
      {
        id: '4',
        name: 'Gaming Laptop',
        description: 'High-performance laptop with RTX graphics and 16GB RAM.',
        price: 1499,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', // laptop
        rating: 4.8,
        reviewCount: 95,
        inStock: false,
        catagory: 'electronics',
      },
      {
        id: '5',
        name: 'Smartwatch Pro',
        description: 'Fitness tracking smartwatch with heart rate monitor.',
        price: 249,
        imageUrl:
          'https://m-cdn.phonearena.com/images/review/5491-wide-two_1200/Galaxy-Watch-5-Pro-review-The-Wear-OS-smartwatch-weve-been-waiting-for.jpg', // smartwatch
        rating: 4.2,
        reviewCount: 60,
        inStock: true,
        catagory: 'electronics',
      },

      // Clothing
      {
        id: '6',
        name: 'Classic Denim Jacket',
        description: 'Stylish blue denim jacket, perfect for casual wear.',
        price: 89,
        imageUrl:
          'https://www.na-kd.com/globalassets/nakd_oversized_classic_denim_jacket_1100-007178-0116_01c.jpg?ref=90BAD298AC', // denim jacket
        rating: 4.3,
        reviewCount: 45,
        inStock: true,
        catagory: 'clothing',
      },
      {
        id: '7',
        name: 'Cotton T-Shirt',
        description: 'Soft cotton t-shirt available in multiple colors.',
        price: 25,
        imageUrl:
          'https://www.siatex.com/wp-content/uploads/2023/07/T-shirt-Wholesale-Supplier-Virginia-USA.webp', // t-shirt
        rating: 4.1,
        reviewCount: 60,
        inStock: false,
        catagory: 'clothing',
      },
      {
        id: '8',
        name: 'Slim Fit Jeans',
        description: 'Comfortable slim fit jeans with stretch fabric.',
        price: 59,
        imageUrl:
          'https://www.randbfashion.in/on/demandware.static/-/Sites-randb_master_catalog/default/dw17cf4e31/large/jxpl559qt3zkfb0at9wjq_8909006671127_1.jpg', // jeans
        rating: 4.4,
        reviewCount: 80,
        inStock: true,
        catagory: 'clothing',
      },
      {
        id: '9',
        name: 'Hoodie Sweatshirt',
        description: 'Warm hoodie with front pocket and adjustable hood.',
        price: 49,
        imageUrl: 'https://i.ebayimg.com/images/g/hyQAAOSw91ZmqFR1/s-l1200.jpg', // hoodie
        rating: 4.5,
        reviewCount: 70,
        inStock: true,
        catagory: 'clothing',
      },
      {
        id: '10',
        name: 'Formal Blazer',
        description: 'Elegant blazer suitable for office and events.',
        price: 129,
        imageUrl: 'https://i.pinimg.com/736x/82/9a/45/829a45fdce7d904b6ea56a26dc1c6c40.jpg', // blazer
        rating: 4.6,
        reviewCount: 40,
        inStock: true,
        catagory: 'clothing',
      },

      // Accessories
      {
        id: '11',
        name: 'Leather Wallet',
        description: 'Premium leather wallet with multiple card slots.',
        price: 49,
        imageUrl:
          'https://img.kwcdn.com/product/fancy/17114cfa-a6a6-4c82-8704-ad6d0b483fa6.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp', // wallet
        rating: 4.6,
        reviewCount: 30,
        inStock: true,
        catagory: 'accessories',
      },
      {
        id: '12',
        name: 'Sunglasses',
        description: 'UV-protected stylish sunglasses for outdoor wear.',
        price: 59,
        imageUrl:
          'https://img.glassesdirect.com/cms/media/filer_public/f1/69/f169e47d-ed80-4ff4-81fe-a6948726faa9/green-600x400.jpg', // sunglasses
        rating: 4.4,
        reviewCount: 70,
        inStock: true,
        catagory: 'accessories',
      },
      {
        id: '13',
        name: 'Backpack',
        description: 'Durable backpack with laptop compartment.',
        price: 79,
        imageUrl:
          'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2024/02/LaptopBackpacks_LaHatte_2024-9-700x467.jpeg', // backpack
        rating: 4.5,
        reviewCount: 55,
        inStock: true,
        catagory: 'accessories',
      },
      {
        id: '14',
        name: 'Wristwatch',
        description: 'Classic analog wristwatch with leather strap.',
        price: 99,
        imageUrl:
          'https://img.drz.lazcdn.com/static/pk/p/aef2ecf97ff4200c8f41955b74fa3992.jpg_720x720q80.jpg', // wristwatch
        rating: 4.3,
        reviewCount: 65,
        inStock: false,
        catagory: 'accessories',
      },
      {
        id: '15',
        name: 'Beanie Hat',
        description: 'Warm knitted beanie for winter.',
        price: 29,
        imageUrl:
          'https://img.drz.lazcdn.com/static/pk/p/9028705a1c0c970ac22c050e6b4347eb.jpg_720x720q80.jpg', // beanie
        rating: 4.2,
        reviewCount: 25,
        inStock: true,
        catagory: 'accessories',
      },

      // Home
      {
        id: '16',
        name: 'Wooden Coffee Table',
        description: 'Modern wooden coffee table with storage shelf.',
        price: 199,
        imageUrl:
          'https://img5.su-cdn.com/cdn-cgi/image/width=750,height=750/mall/file/2022/11/21/28eaccb7d4195aaaf9d1b99d5a64543b.jpg', // coffee table
        rating: 4.5,
        reviewCount: 80,
        inStock: true,
        catagory: 'home',
      },
      {
        id: '17',
        name: 'Sofa Set',
        description: 'Comfortable 3-seater fabric sofa with cushions.',
        price: 899,
        imageUrl:
          'https://ak1.ostkcdn.com/images/products/is/images/direct/d81f3945cc91222ae29acc60e065619354eeace1/82%27%27-Fabric-3-Seater-Sofa-with-Plush-Back-Pillows%2C-Solid-Wood-Frame%2C-and-Comfortable-Foam-Cushions.jpg?impolicy=medium', // sofa
        rating: 4.7,
        reviewCount: 150,
        inStock: true,
        catagory: 'home',
      },
      {
        id: '18',
        name: 'Table Lamp',
        description: 'Stylish bedside lamp with warm LED light.',
        price: 59,
        imageUrl:
          'https://img.drz.lazcdn.com/static/bd/p/b754927759aae305774c96d4e526db94.jpg_720x720q80.jpg', // lamp
        rating: 4.4,
        reviewCount: 65,
        inStock: true,
        catagory: 'home',
      },
      {
        id: '19',
        name: 'Bookshelf',
        description: 'Tall wooden bookshelf with 5 tiers.',
        price: 249,
        imageUrl: 'https://m.media-amazon.com/images/I/81Z+OHdDkSL._AC_UF894,1000_QL80_.jpg', // bookshelf
        rating: 4.6,
        reviewCount: 40,
        inStock: true,
        catagory: 'home',
      },
      {
        id: '20',
        name: 'Dining Chair Set',
        description: 'Set of 4 modern dining chairs with cushioned seats.',
        price: 349,
        imageUrl:
          'https://images.offerup.com/2hu0UCszcI7odY1MhgVWRykE210=/1179x1160/77fb/77fb1f086771435abec0b32c9c004f9d.jpg', // dining chairs
        rating: 4.3,
        reviewCount: 55,
        inStock: true,
        catagory: 'home',
      },
    ],
    catagory: 'all',
    wishlistItems: [],
  } as EcommerceState),
  withComputed(({ catagory, products, wishlistItems }) => ({
    filteredProducts: computed(() => {
      if (catagory() === 'all') return products();
      return products().filter((p) => p.catagory === catagory().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    setCatagory: signalMethod<string>((catagory: string) => {
      patchState(store, { catagory });
    }),

    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to the wishlist.');
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success('Product removed from the wishlist.');
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },
  }))
);
