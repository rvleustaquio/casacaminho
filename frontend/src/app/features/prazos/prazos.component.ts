import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { finalize } from 'rxjs';
import { Prazo, PrazoService } from '../../services/backend/prazo.service';
import { ToastService } from '../../services/toast.service';
import { FeatureActionsComponent } from '../../shared/components/feature-actions/feature-actions.component';
import { FeatureToolbarComponent } from '../../shared/components/feature-toolbar/feature-toolbar.component';
import HelperFunctions from '../../shared/helper-functions';
import { PrazoDialogComponent } from './prazo-dialog/prazo-dialog.component';

@Component({
  selector: 'prazos',
  imports: [
    CardModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    PrazoDialogComponent,
    FeatureActionsComponent,
    ConfirmDialogModule,
    FeatureToolbarComponent,
  ],
  templateUrl: './prazos.component.html',
  providers: [ConfirmationService, PrazoService],
})
export class PrazosComponent {
  // dependencies
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private prazoService = inject(PrazoService);

  // Layout properties
  header = 'Prazos';
  loading = false;
  data: Prazo[] = [];
  total: number = 0;

  // Dialog properties
  @ViewChild(PrazoDialogComponent)
  prazoDialog!: PrazoDialogComponent;

  // #region lifecycle hooks
  ngOnInit() {
    this.load();
  }

  // #region events
  onSalvar(prazo: Prazo) {
    if (!this.prazoDialog.selected) {
      this.data.unshift(prazo);
    } else {
      this.data[
        HelperFunctions.findIndexById(
          this.prazoDialog.selected.id,
          this.data,
          'id',
        )
      ] = prazo;
    }

    this.data = [...this.data];
  }

  onExcluir() {
    this.confirmationService.confirm({
      message: `Confirma a exclusão do registro (${this.prazoDialog.selected?.meses})?`,
      header: `Excluindo ${this.header}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.loading = true;

        this.prazoService
          .delete(this.prazoDialog.selected?.id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (ret) => {
              this.data.splice(
                HelperFunctions.findIndexById(
                  this.prazoDialog.selected?.id,
                  this.data,
                  'id',
                ),
                1,
              );

              this.prazoDialog.selected = undefined;
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

    this.prazoService
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
