import { Routes } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

export const routes: Routes = [
  {
    path: '',
    component: FoodListComponent,
    data: { title: 'Inicio - Delicias Urbanas' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'Nosotros - Delicias Urbanas' },
  },
  {
    path: 'restaurantes',
    component: RestaurantsComponent,
    data: { title: 'Restaurantes - Delicias Urbanas' },
  },
  {
    path: 'contacto',
    component: ContactComponent,
    data: { title: 'Contacto - Delicias Urbanas' },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
