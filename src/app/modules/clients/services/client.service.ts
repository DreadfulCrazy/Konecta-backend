import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  httpHeader: HttpHeaders;
  apiUrl: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getClients(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/client`, { headers: this.httpHeader });
  }

  saveClient(client: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/client`, client, { headers: this.httpHeader });
  }

  deleteClientById(id: string): void {
    this.http.delete(`${this.apiUrl}/client/${id}`, { headers: this.httpHeader });
  }

}
