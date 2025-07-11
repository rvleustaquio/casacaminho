import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';
import {
  EstadoCivil,
  EstadoCivilService,
} from '../../../services/backend/estado-civil.service';
import { ToastService } from '../../../services/toast.service';
import { DialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { LabelComponent } from '../../../shared/components/label/label.component';

@Component({
  selector: 'estado-civil-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    LabelComponent,
    DialogActionsComponent,
  ],
  templateUrl: './estado-civil-dialog.component.html',
})
export class EstadoCivilDialogComponent {
  // dependencies
  private toastService = inject(ToastService);
  private formBuilder = inject(FormBuilder);
  private estadoCivilService = inject(EstadoCivilService);

  // Layout properties
  titulo = 'Estado Civil';
  header = '';
  visible = false;
  saving: boolean = false;
  selected?: EstadoCivil;

  @Output() onSalvar = new EventEmitter<EstadoCivil>();

  form = this.formBuilder.group({
    descricao: ['', [Validators.required]],
  });

  // #region events
  onSalvarAction() {
    this.saving = true;

    this.estadoCivilService
      .postOrPut(this.form.value, this.selected?.id)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (ret: any) => {
          this.onSalvar.emit(ret.entity);

          this.toastService.simple(ret);

          this.visible = false;
        },
        error: (e) => this.toastService.simple(e),
      });
  }
  // #endregion

  // #region internal functions
  show(novo: boolean) {
    this.createForm(novo);

    this.visible = true;
  }

  createForm(novo: boolean) {
    this.header = novo
      ? `Cadastrando ${this.titulo}`
      : `Editando ${this.titulo}`;

    this.form.reset();

    if (novo) this.selected = undefined;
    else this.form.patchValue(<EstadoCivil>this.selected);
  }
  // #endregion
}
