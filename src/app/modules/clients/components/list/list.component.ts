import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private _clienteService: ClientService) { }

  ngOnInit(): void {
    this.getClientsFromDB();
  }

  getClientsFromDB(): void {
    this._clienteService.getClients()
      .subscribe((clientes: Cliente[]) => this.clientes = clientes);
  }

  getAnoCliente(cliente: Cliente): number {
    const bornDate: Date = cliente.fechaNacimiento;
    const currentDate: Date = new Date();
    return currentDate.getFullYear() - bornDate.getFullYear();
  }

  deleteClient(id: string): void {
    this._clienteService.deleteClientById(id);
  }

}
