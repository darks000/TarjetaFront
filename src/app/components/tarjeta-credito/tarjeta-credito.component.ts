import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas : any[]=[
   { titulo: 'dario', tarjeta: '32323', fechaexpiracion: '25/05',cvv: '012'},
   { titulo: 'juancho', tarjeta: '32323', fechaexpiracion: '2/05',cvv: '042'},
   { titulo: 'juaniot', tarjeta: '313', fechaexpiracion: '25/2',cvv: '032'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
