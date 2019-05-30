import { Component, Inject, forwardRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Fatura } from 'src/app/model/Fatura';
import { FaturaServiceApiService } from '../server/fatura-service-api.service';
import { FaturaService } from '../server/fatura.service';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';

@Component({
    selector: 'app-dialog-editar',
    templateUrl: './dialog-editar.html',
    styleUrls: ['./dialog-editar.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class DialogEditarComponent {

    public nomeError = false;
    public valorError = false;
    public dataError = false;

    constructor(
        private faturaServiceApiService: FaturaServiceApiService,
        private faturaService: FaturaService,
        public dialogRef: MatDialogRef<DialogEditarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Fatura
    ) {



    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    editarFatura(fatura: Fatura): void {
        if (this.validade(fatura)) {
            this.faturaServiceApiService.updateFatura(fatura._id, fatura).subscribe(data => {
                this.faturaService.recarregarTabela();
            });
        }

        this.dialogRef.close();
    }

    validade(fatura: Fatura) {
        if (fatura == null || fatura.nome_empresa == null || fatura.nome_empresa === '') {
            this.nomeError = true;
            return false;
        }
        this.nomeError = false;
        if (fatura == null || fatura.valor == null || fatura.valor <= 0) {
            this.valorError = true;
            return false;
        }
        this.valorError = false;
        if (fatura == null || fatura.data_vencimento == null) {
            this.dataError = true;
            return false;
        }
        this.dataError = false;

        return true;
    }

}
