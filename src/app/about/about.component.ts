import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Carlos Rodríguez',
      position: 'Chef Ejecutivo',
      image: 'assets/images/chefejecutivo.jpg', // Ajusta la ruta según tu estructura
    },
    {
      name: 'María González',
      position: 'Pastelera Principal',
      image: 'assets/images/pasteleeraprincipal.jpg',
    },
    {
      name: 'Rosa Ayala',
      position: 'Gerente General',
      image: 'assets/images/gerentegeneral.jpg',
    },
  ];
}
