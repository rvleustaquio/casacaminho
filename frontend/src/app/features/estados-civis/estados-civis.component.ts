import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { finalize } from 'rxjs';
import {
  EstadoCivil,
  EstadoCivilService,
} from '../../services/backend/estado-civil.service';
import { ToastService } from '../../services/toast.service';
import { FeatureActionsComponent } from '../../shared/components/feature-actions/feature-actions.component';
import { FeatureToolbarComponent } from '../../shared/components/feature-toolbar/feature-toolbar.component';
import HelperFunctions from '../../shared/helper-functions';
import { EstadoCivilDialogComponent } from './estado-civil-dialog/estado-civil-dialog.component';

@Component({
  selector: 'estados-civis',
  imports: [
    CardModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    EstadoCivilDialogComponent,
    FeatureActionsComponent,
    ConfirmDialogModule,
    FeatureToolbarComponent,
  ],
  templateUrl: './estados-civis.component.html',
  providers: [ConfirmationService, EstadoCivilService],
})
export class EstadosCivisComponent {
  // dependencies
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private estadoCivilService = inject(EstadoCivilService);

  // Layout properties
  header = 'Estados Civis';
  loading = false;
  data: EstadoCivil[] = [];
  total: number = 0;

  // Dialog properties
  @ViewChild(EstadoCivilDialogComponent)
  estadoCivilDialog!: EstadoCivilDialogComponent;

  // #region lifecycle hooks
  ngOnInit() {
    this.load();
  }

  // #region events
  onSalvar(estadoCivil: EstadoCivil) {
    if (!this.estadoCivilDialog.selected) {
      this.data.unshift(estadoCivil);
    } else {
      this.data[
        HelperFunctions.findIndexById(
          this.estadoCivilDialog.selected.id,
          this.data,
          'id',
        )
      ] = estadoCivil;
    }

    this.data = [...this.data];
  }

  onExcluir() {
    this.confirmationService.confirm({
      message: `Confirma a exclusão do registro (${this.estadoCivilDialog.selected?.descricao})?`,
      header: `Excluindo ${this.header}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.loading = true;

        this.estadoCivilService
          .delete(this.estadoCivilDialog.selected?.id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (ret) => {
              this.data.splice(
                HelperFunctions.findIndexById(
                  this.estadoCivilDialog.selected?.id,
                  this.data,
                  'id',
                ),
                1,
              );

              this.estadoCivilDialog.selected = undefined;
              this.data = [...this.data];
              this.toastService.simple(ret);
            },
            error: (e) => this.toastService.simple(e),
          });
      },
    });
  }
  // #endregion

  // #region internal functions
  load() {
    this.loading = true;

    this.estadoCivilService
      .getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (ret) => {
          this.data = ret.data;
          this.total = ret.total;
        },
        error: (e) => this.toastService.simple(e),
      });
  }
}
