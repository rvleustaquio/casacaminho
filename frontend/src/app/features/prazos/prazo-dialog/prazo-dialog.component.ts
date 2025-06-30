import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';
import { Prazo, PrazoService } from '../../../services/backend/prazo.service';
import { ToastService } from '../../../services/toast.service';
import { DialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { LabelComponent } from '../../../shared/components/label/label.component';

@Component({
  selector: 'prazo-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    LabelComponent,
    DialogActionsComponent,
  ],
  templateUrl: './prazo-dialog.component.html',
})
export class PrazoDialogComponent {
  // dependencies
  private toastService = inject(ToastService);
  private formBuilder = inject(FormBuilder);
  private prazoService = inject(PrazoService);

  // Layout properties
  titulo = 'Prazo';
  header = '';
  visible = false;
  saving: boolean = false;
  selected?: Prazo;

  @Output() onSalvar = new EventEmitter<Prazo>();

  form = this.formBuilder.group({
    meses: [0, [Validators.required]],
  });

  // #region events
  onSalvarAction() {
    this.saving = true;

    this.prazoService
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
    else this.form.patchValue(<Prazo>this.selected);
  }
  // #endregion
}
