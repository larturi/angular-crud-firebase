import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.models';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id');

     if (id !== 'nuevo') {
       this.heroesService.getHeroe(id)
           .subscribe( (resp: any) => {
              this.heroe = resp;
              this.heroe.id = id;
           });
     }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
        console.log('Formulario no valido');
        return;
    }

    Swal.fire('Espere', 'Guardndo información', 'info');
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire(this.heroe.nombre, 'Se actualizó correctamente', 'success');
    });

  }

}
