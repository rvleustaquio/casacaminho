import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { finalize } from 'rxjs';
import {
  Assistido,
  AssistidoService,
} from '../../../services/backend/assistido.service';
import { ToastService } from '../../../services/toast.service';
import { DialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { LabelComponent } from '../../../shared/components/label/label.component';

@Component({
  selector: 'assistido-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    LabelComponent,
    TabsModule,
    TextareaModule,
    DialogActionsComponent,
  ],
  templateUrl: './assistido-dialog.component.html',
})
export class AssistidoDialogComponent {
  // dependencies
  private toastService = inject(ToastService);
  private formBuilder = inject(FormBuilder);
  private assistidoService = inject(AssistidoService);

  // Layout properties
  titulo = 'Assistido';
  header = '';
  visible = false;
  saving: boolean = false;
  selected?: Assistido;

  @Output() onSalvar = new EventEmitter<Assistido>();

  form = this.formBuilder.group({
    nome: ['', [Validators.required]],
  });

  // #region events
  onSalvarAction() {
    this.saving = true;

    this.assistidoService
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

  onSalvarContinuarAction() {
    this.saving = true;

    this.assistidoService
      .postOrPut(this.form.value, this.selected?.id)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: (ret: any) => {
          this.onSalvar.emit(ret.entity);

          this.toastService.simple(ret);
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
    else this.form.patchValue(<Assistido>this.selected);
  }
  // #endregion
}
