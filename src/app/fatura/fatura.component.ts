import { Component, OnInit, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Fatura } from '../model/Fatura';
import { FaturaServiceApiService } from './server/fatura-service-api.service';
import { DialogCancelarComponent } from './dialog-cancelar/dialog-cancelar.component';
import { FaturaService } from './server/fatura.service';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { DialogNovoComponent } from './dialog-novo/dialog-novo.component';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss']
})
export class FaturaComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['empresa', 'valor', 'data_vencimento', 'pagou', 'opcoes'];
  public ELEMENT_DATA: Fatura[] = [];
  dataSource = new MatTableDataSource<Fatura>(this.ELEMENT_DATA);
  public length = 0;
  public pageSize = 10;
  public pageIndex = 0;

  constructor(private faturaServiceApiService: FaturaServiceApiService, public dialog: MatDialog) {
    FaturaService.RELOAD_TABLE.subscribe(() => this.buildTable(this.pageIndex, this.pageSize));
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.buildTable(this.pageIndex, this.pageSize);
  }


  buildTable(pageIndex: number, pageSize: number) {

    this.ELEMENT_DATA = [];
    this.faturaServiceApiService.getFaturas(pageIndex, pageSize).subscribe(
      data => {
        data.forEach(fatura => {
          this.ELEMENT_DATA.push(fatura);
        });
        this.dataSource = new MatTableDataSource<Fatura>(this.ELEMENT_DATA);
      }
    );
    this.faturaServiceApiService.getFaturasSize().subscribe(size => {
      this.length = size;
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  test(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.buildTable(this.pageIndex, this.pageSize);


  }


  openDialog(fatura: Fatura): void {
    const dialogRef = this.dialog.open(DialogCancelarComponent, {
      width: '350px',
      data: fatura
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogEditar(fatura: Fatura): void {
    const dialogRefEditar = this.dialog.open(DialogEditarComponent, {
      width: '500px',
      data: fatura
    });

    dialogRefEditar.afterClosed().subscribe(result => {
    });
  }

  openDialogNovo(): void {
    const dialogRefNovo = this.dialog.open(DialogNovoComponent, {
      width: '500px',
      data: new Fatura()
    });

    dialogRefNovo.afterClosed().subscribe(result => {
    });
  }



}

export interface PeriodicElement {
  position: number;
  nome: string;
  cpf: number;
}
