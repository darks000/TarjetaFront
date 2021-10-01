import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  form : FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group(
     { titulo: [''],
      tarjeta: [''],
      fechaexpiracion: [''],
      cvv: ['']
    }
    )
  }

  ngOnInit(): void {
  }
  agregarTarjeta(){

    const tarjeta :any ={
      titulo: this.form.get('titulo')?.value ,
      tarjeta: this.form.get('tarjeta')?.value ,
      fechaexpiracion: this.form.get('fechaexpiracion')?.value ,
      cvv: this.form.get('cvv')?.value 
    }
this.listTarjetas.push(tarjeta);
this.form.reset();
  }
}
