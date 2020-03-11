import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  clientes: Cliente[] = [];

  constructor(private fb: FormBuilder,
    private _clientService: ClientService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getExistingClientsFromDB();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]], // FormControlName
      telefono: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  registerClient(): void {
    if (this.registerForm.invalid) return; // Invalid itera sobre cada atr del obj y va validando si todos son válidos o no.
    const cliente: Cliente = {
      ...this.registerForm.value,
      fechaNacimiento: this.toDate(this.registerForm.get('fechaNacimiento').value)
    };
    this._clientService.saveClient(cliente)
      .subscribe((cliente: Cliente) => console.log('Se guardó el siguiente cliente: ', cliente));
    console.log(this.clientes);
  }

  getExistingClientsFromDB(): void {
    this._clientService.getClients()
      .subscribe((clientes: Cliente[]) => this.clientes = clientes);
  }

  toDate(date: string): Date {
    const res: Date = new Date(date);
    return res;
  }

  mostrarName(): void {
    // console.log(this.registerForm.get('nombre').value);
  }

}
