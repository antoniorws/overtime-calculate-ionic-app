import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {

  constructor() { }

  valorHoraExtra(calculo: any): number {
    return calculo.salarioBruto / calculo.jornadaMensal * (1 + (calculo.adicionalHorasExtras / 100));
  }
}
