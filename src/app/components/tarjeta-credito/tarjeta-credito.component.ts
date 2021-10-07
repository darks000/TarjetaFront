import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/serivce/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [
   
  ];
  accion='agregar';
  // esta declaracion es para que el id sea de tipo numero o indefinido
  id:number | undefined;
  form: FormGroup;
  // validators.required este valida que este campo se obligatorio max y min length es para definir el numero maximo de caracteres permitidos
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
      
    this.form = this.fb.group(
      {
        titulo: ['', Validators.required],
        tarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
        fechaexpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
        cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
      }
    )

  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

// este es el metodo que utiliza el service para obtner lasa tarjetas
  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data =>{console.log(data);
    this.listTarjetas= data},error=>{console.log(error)});
  }
  guadarTarjeta() {

    const tarjeta: any = {
      titulo: this.form.get('titulo')?.value,
      tarjeta: this.form.get('tarjeta')?.value,
      fechaexpiracion: this.form.get('fechaexpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }

    if(this.id == undefined)
    {
      // agregamos una tarjeta nueva 
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('Tarjeta registrada con exito', 'Tarjeta creada');
        this.obtenerTarjetas();
        this.form.reset();
      },error =>{
        console.log(error);
        this.toastr.error('Opss ocurrio un error', 'Error');
      });
    }
    else{
      // editamos tarjeta
      tarjeta.id= this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion='Agregar';
        this.id= undefined;
        this.toastr.info('la tarjeta fue actualizada con exito', 'tarjeta actualizada');
        this.obtenerTarjetas();
      }, error =>{console.log(error)});
    }
  
    
  }

  eliminarRegistro(id: number) {

    this._tarjetaService.deleteTarjeta(id).subscribe(data =>{
      this.toastr.error('Se borro con exito la tarjeta', 'Eliminacion de tarjeta');
      this.obtenerTarjetas();
    },error=>{console.log(error);})
   
  }

  editarTarjeta(tarjeta: any){
    this.accion= 'Editar';
    this.id = tarjeta.id;
    // para rellenar el formulario hay dos metodos uno es patchvalue  o Setvalue
    this.form.patchValue({
      titulo: tarjeta.titulo,
      tarjeta: tarjeta.tarjeta,
      fechaexpiracion: tarjeta.fechaexpiracion,
      cvv:  tarjeta.cvv,
    });


  }

}
