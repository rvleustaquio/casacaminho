import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { finalize } from 'rxjs';
import {
  Assistido,
  AssistidoService,
} from '../../services/backend/assistido.service';
import { ToastService } from '../../services/toast.service';
import { FeatureActionsComponent } from '../../shared/components/feature-actions/feature-actions.component';
import { FeatureToolbarComponent } from '../../shared/components/feature-toolbar/feature-toolbar.component';
import HelperFunctions from '../../shared/helper-functions';
import { AssistidoDialogComponent } from './assistido-dialog/assistido-dialog.component';

@Component({
  selector: 'assistidos',
  imports: [
    CardModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    AssistidoDialogComponent,
    FeatureActionsComponent,
    ConfirmDialogModule,
    FeatureToolbarComponent,
  ],
  templateUrl: './assistidos.component.html',
  providers: [ConfirmationService, AssistidoService],
})
export class AssistidosComponent {
  // dependencies
  private toastService = inject(ToastService);
  private confirmationService = inject(ConfirmationService);
  private assistidoService = inject(AssistidoService);

  // Layout properties
  header = 'Assistidos';
  loading = false;
  data: Assistido[] = [];
  total: number = 0;

  // Dialog properties
  @ViewChild(AssistidoDialogComponent)
  assistidoDialog!: AssistidoDialogComponent;

  // #region lifecycle hooks
  ngOnInit() {
    this.load();
  }

  // #region events
  onSalvar(assistido: Assistido) {
    if (!this.assistidoDialog.selected) {
      this.data.unshift(assistido);
    } else {
      this.data[
        HelperFunctions.findIndexById(
          this.assistidoDialog.selected.id,
          this.data,
          'id',
        )
      ] = assistido;
    }

    this.data = [...this.data];
  }

  onExcluir() {
    this.confirmationService.confirm({
      message: `Confirma a exclusão do registro (${this.assistidoDialog.selected?.nome})?`,
      header: `Excluindo ${this.header}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.loading = true;

        this.assistidoService
          .delete(this.assistidoDialog.selected?.id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (ret) => {
              this.data.splice(
                HelperFunctions.findIndexById(
                  this.assistidoDialog.selected?.id,
                  this.data,
                  'id',
                ),
                1,
              );

              this.assistidoDialog.selected = undefined;
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

    this.assistidoService
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
