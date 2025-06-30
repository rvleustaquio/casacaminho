import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { finalize } from 'rxjs';
import {
  SitAssistido,
  SitAssistidoService,
} from '../../services/backend/sit-assistido.service';
import { ToastService } from '../../services/toast.service';
import { FeatureActionsComponent } from '../../shared/components/feature-actions/feature-actions.component';
import { FeatureToolbarComponent } from '../../shared/components/feature-toolbar/feature-toolbar.component';
import HelperFunctions from '../../shared/helper-functions';
import { SitAssistidoDialogComponent } from './sit-assistido-dialog/sit-assistido-dialog.component';

@Component({
  selector: 'sit-assistidos',
  imports: [
    CardModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    SitAssistidoDialogComponent,
    FeatureActionsComponent,
    ConfirmDialogModule,
    FeatureToolbarComponent,
  ],
  templateUrl: './sit-assistidos.component.html',
  providers: [ConfirmationService, SitAssistidoService],
})
export class SitAssistidosComponent {
  // dependencies
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private sitAssistidoService = inject(SitAssistidoService);

  // Layout properties
  header = 'Situações dos Assistidos';
  loading = false;
  data: SitAssistido[] = [];
  total: number = 0;

  // Dialog properties
  @ViewChild(SitAssistidoDialogComponent)
  sitAssistidoDialog!: SitAssistidoDialogComponent;

  // #region lifecycle hooks
  ngOnInit() {
    this.load();
  }

  // #region events
  onSalvar(sitAssistido: SitAssistido) {
    if (!this.sitAssistidoDialog.selected) {
      this.data.unshift(sitAssistido);
    } else {
      this.data[
        HelperFunctions.findIndexById(
          this.sitAssistidoDialog.selected.id,
          this.data,
          'id',
        )
      ] = sitAssistido;
    }

    this.data = [...this.data];
  }

  onExcluir() {
    this.confirmationService.confirm({
      message: `Confirma a exclusão do registro (${this.sitAssistidoDialog.selected?.descricao})?`,
      header: `Excluindo ${this.header}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.loading = true;

        this.sitAssistidoService
          .delete(this.sitAssistidoDialog.selected?.id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (ret) => {
              this.data.splice(
                HelperFunctions.findIndexById(
                  this.sitAssistidoDialog.selected?.id,
                  this.data,
                  'id',
                ),
                1,
              );

              this.sitAssistidoDialog.selected = undefined;
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

    this.sitAssistidoService
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
