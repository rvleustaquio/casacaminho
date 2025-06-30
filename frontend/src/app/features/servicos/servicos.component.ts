import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { finalize } from 'rxjs';
import {
  Servico,
  ServicoService,
} from '../../services/backend/servico.service';
import { ToastService } from '../../services/toast.service';
import { FeatureActionsComponent } from '../../shared/components/feature-actions/feature-actions.component';
import { FeatureToolbarComponent } from '../../shared/components/feature-toolbar/feature-toolbar.component';
import HelperFunctions from '../../shared/helper-functions';
import { ServicoDialogComponent } from './servico-dialog/servico-dialog.component';

@Component({
  selector: 'servicos',
  imports: [
    CardModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    ServicoDialogComponent,
    FeatureActionsComponent,
    ConfirmDialogModule,
    FeatureToolbarComponent,
  ],
  templateUrl: './servicos.component.html',
  providers: [ConfirmationService, ServicoService],
})
export class ServicosComponent {
  // dependencies
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private servicoService = inject(ServicoService);

  // Layout properties
  header = 'Serviços';
  loading = false;
  data: Servico[] = [];
  total: number = 0;

  // Dialog properties
  @ViewChild(ServicoDialogComponent)
  servicoDialog!: ServicoDialogComponent;

  // #region lifecycle hooks
  ngOnInit() {
    this.load();
  }

  // #region events
  onSalvar(servico: Servico) {
    if (!this.servicoDialog.selected) {
      this.data.unshift(servico);
    } else {
      this.data[
        HelperFunctions.findIndexById(
          this.servicoDialog.selected.id,
          this.data,
          'id',
        )
      ] = servico;
    }

    this.data = [...this.data];
  }

  onExcluir() {
    this.confirmationService.confirm({
      message: `Confirma a exclusão do registro (${this.servicoDialog.selected?.descricao})?`,
      header: `Excluindo ${this.header}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.loading = true;

        this.servicoService
          .delete(this.servicoDialog.selected?.id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (ret) => {
              this.data.splice(
                HelperFunctions.findIndexById(
                  this.servicoDialog.selected?.id,
                  this.data,
                  'id',
                ),
                1,
              );

              this.servicoDialog.selected = undefined;
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

    this.servicoService
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
