import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes()
        .subscribe( resp => {
          this.heroes = resp;
          this.cargando = false;
        });
  }

  borrarHeroe(heroe: HeroeModel, i: number) {

    Swal.fire({
        title: `Borrar a ${heroe.nombre}`,
        icon: 'question',
        html: `¿Esta seguro que desea borrar a ${heroe.nombre}?`,
        showCancelButton: true,
        focusConfirm: true
    }).then( resp => {

      if (resp.value === true) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }

    });

  }

}
