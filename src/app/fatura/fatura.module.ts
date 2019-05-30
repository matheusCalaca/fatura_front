import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaturaComponent } from './fatura.component';
import {
  MatPaginatorModule,
  MatFormFieldModule, MatTableModule,
  MatButtonModule, MatIconModule, MatDialogModule,
  MatInputModule, MatDatepickerModule, MatSlideToggleModule, MatNativeDateModule, MatAutocompleteModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogCancelarComponent } from './dialog-cancelar/dialog-cancelar.component';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { DialogNovoComponent } from './dialog-novo/dialog-novo.component';


@NgModule({
  declarations: [FaturaComponent, DialogCancelarComponent, DialogEditarComponent, DialogNovoComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    FaturaComponent
  ],
  entryComponents: [
    DialogCancelarComponent,
    DialogEditarComponent,
    DialogNovoComponent
  ]
})
export class FaturaModule { }
