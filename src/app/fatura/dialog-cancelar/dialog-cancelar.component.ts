import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Fatura } from 'src/app/model/Fatura';
import { FaturaServiceApiService } from '../server/fatura-service-api.service';
import { FaturaService } from '../server/fatura.service';

@Component({
    selector: 'app-dialog-cancelar',
    templateUrl: './dialog-cancelar.html',
})
export class DialogCancelarComponent {

    constructor(
        private faturaServiceApiService: FaturaServiceApiService,
        private faturaService: FaturaService,
        public dialogRef: MatDialogRef<DialogCancelarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Fatura) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancelarFatura(fatura: Fatura): void {
        this.faturaServiceApiService.deleteFatura(fatura._id).subscribe(data => {
            console.log(data);
            this.faturaService.recarregarTabela();
        });

        this.dialogRef.close();
    }

}
