import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaturaService {

  public static RELOAD_TABLE = new EventEmitter();

  constructor() { }

  recarregarTabela() {
    FaturaService.RELOAD_TABLE.emit();
  }
}
