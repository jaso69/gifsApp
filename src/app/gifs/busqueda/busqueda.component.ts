import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor( private GifsService:GifsService) { }

  ngOnInit(): void {
  }

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>

  buscar () {
    
    const termino = this.txtBuscar.nativeElement.value
    
    if (termino.trim().length === 0){return}
    
    this.GifsService.buscarGifs( termino )
    
    this.txtBuscar.nativeElement.value = '' 
  }

}
