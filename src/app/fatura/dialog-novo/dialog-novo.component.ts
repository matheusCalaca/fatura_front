import { Component, Inject, forwardRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Fatura } from 'src/app/model/Fatura';
import { FaturaServiceApiService } from '../server/fatura-service-api.service';
import { FaturaService } from '../server/fatura.service';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { User } from 'src/app/model/User';

@Component({
    selector: 'app-dialog-novo',
    templateUrl: './dialog-novo.html',
    styleUrls: ['./dialog-novo.scss'],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})
export class DialogNovoComponent {
    public nomeError = false;
    public valorError = false;
    public dataError = false;

    constructor(
        private faturaServiceApiService: FaturaServiceApiService,
        private faturaService: FaturaService,
        public dialogRef: MatDialogRef<DialogNovoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Fatura
    ) {



    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    salvarFatura(fatura: Fatura): void {
        if (this.validade(fatura)) {

            const userId = JSON.parse(localStorage.getItem('user')).userId;
            fatura.user = new User();
            fatura.user._id = userId;
            this.faturaServiceApiService.createFatura(fatura).subscribe(data => {
                this.faturaService.recarregarTabela();
            });

            this.dialogRef.close();
        }
    }

    validade(fatura: Fatura) {
        if (fatura == null || fatura.nome_empresa == null || fatura.nome_empresa === '') {
            this.nomeError = true;
            return false;
        }
        this.nomeError = false;
        if (fatura == null || fatura.valor == null || fatura.valor <= 0 ) {
            this.valorError = true;
            return false;
        }
        this.valorError = false;
        if (fatura == null || fatura.data_vencimento == null ) {
            this.dataError = true;
            return false;
        }
        this.dataError = false;

        return true;
    }

}
