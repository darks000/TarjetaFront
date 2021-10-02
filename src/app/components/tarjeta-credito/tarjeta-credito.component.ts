import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
// validators.required este valida que este campo se obligatorio max y min length es para definir el numero maximo de caracteres permitidos
  constructor(private fb: FormBuilder, private toastr: ToastrService) { 
    this.form = this.fb.group(
     { titulo: ['',Validators.required], 
      tarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaexpiracion: ['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    }
    )
  }

  ngOnInit(): void {
  }
  agregarTarjeta(){
console.log(this.form);
    const tarjeta :any ={
      titulo: this.form.get('titulo')?.value ,
      tarjeta: this.form.get('tarjeta')?.value ,
      fechaexpiracion: this.form.get('fechaexpiracion')?.value ,
      cvv: this.form.get('cvv')?.value 
    }
this.listTarjetas.push(tarjeta);
this.toastr.success('Tarjeta registrada con exito', 'Tarjeta creada');
this.form.reset();
  }

  eliminarRegistro(index: number){
    // el metodo splice remueve un elemento  y la cantidad de el elemento 
this.listTarjetas.splice(index,1);
this.toastr.error('Se borro con exito la tarjeta', 'Eliminacion de tarjeta')
  }
 
}
