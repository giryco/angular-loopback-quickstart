import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Services
 */
import { AuthenticationService } from './../../../../shared/services/loopback/authentication.service';
import { CrudService } from './../../../../shared/services/loopback/crud.service';


@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.css']
})
export class MaterialDialogComponent implements OnInit {
  array: any;
  competitionId: number;
  eventResponse: any;
  materialDialogForm: FormGroup;
  roles: any;
  title: string;
  userForm: FormGroup;
  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/

  constructor(
    private _auth: AuthenticationService,
    private _crud: CrudService,
    private matsnackbar: MatSnackBar,
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.materialDialogForm = this.fb.group({
      'materialGroup': this.fb.group({
        'cod_empresa': [null],
        'cod_produto': [null],
        'dsc_produto': [null],
        'cod_especificacao': [null],
        'dsc_especificacao': [null],
        'cod_tamanho': [null],
        'dsc_tamanho': [null],
        'txt_especificacao_detalhada': [null],
        'cod_especificacao_tamanho': [null],
        'dsc_especificacao_tamanho': [null],
        'cod_material': [null],
        'dsc_material_detalhada': [null],
        'dsc_material': [null],
        'cod_unidade_medida': [null],
        'vlr_venda': [null],
        'ind_material_eletrico': [null],
        'ind_componente_menor': [null],
        'pct_sobre_preco_medio': [null],
        'img_produto': [null],
        'num_peso': [null],
        'ind_cancelado': [null],
        'ind_tipo_material': [null],
        'peso_km_condutor': [null],
        'cod_ncm': [null],
        'cod_ex_tipi': [null],
        'cod_genero': [null],
        'cod_tipo_sped': [null],
        'cod_cest': [null],
        'potencia_nominal': [null],
      })
    });

    /*update start*/
    if (this.data && this.data.id) {
      this.paramToSearch = this.data.id;
      this.submitToCreate = false;
      this.submitToUpdate = true;
      this.title = 'Alterar Material';
      this.submitButton = 'Atualizar';

      this._crud.readFromRoute({
        route: 'Materiais/resultadoConsulta',
        order: ['objectId', 'desc'],
        where: [{
          property: 'objectId',
          value: this.data.id
        }]
      }).then(res => {
        const obj = res['response'][0]['attributes'];

        this.materialDialogForm.get('name').setValue(obj.name);
      }, err => {
        this._auth.handleError(err, '');
      });
    } else {
      this.submitToCreate = true;
      this.submitToUpdate = false;
      this.title = 'Cadastrar Material';
      this.submitButton = 'Salvar';
    }
    /*update end*/
  }

  onMaterialDialogSubmit = () => {
    if (this.submitToUpdate) {
      const params = {
        route: 'Materiais/resultadoConsulta',
        objectToUpdate: this.materialDialogForm.value,
        where: {
          property: 'objectId',
          value: this.data.id
        }
      };

      this._crud.update(params)
        .then(res => {
          console.log(res);
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'updated',
            message: 'MaterialDialogForm was updated'
          });
        }, err => {
          this._auth.handleError(err, '');
        });
    } else {
      console.log(this.materialDialogForm.value);
      const paramsToUser = {
        route: 'User',
        objectToCreateUser: this.materialDialogForm.value.userGroup
      };

      const paramsToMaterial = {
        route: 'Materiais/resultadoConsulta',
        objectToCreateUser: this.materialDialogForm.value.materialGroup
      };
      console.log(paramsToMaterial);
      // this._crud.create(paramsToUser)
      //   .then(res => {
      //     this.matsnackbar.open(res['message'], '', {
      //       duration: 2000
      //     });

      //     this.dialogRef.close({
      //       response: 'created',
      //       message: 'MaterialDialogForm created new data'
      //     });
      //   }, err => {
      //     this._auth.handleError(err, '');
      //   });
    }
  }

  /**
   * Autocompletes: start
   */
  autocompleteCodEmpresa = (e) => {
    console.log(e);
    if (e.keyCode === 13 || e.keyCode === 27) { console.log(e.keyCode);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
   /**
    * Autocompletes: end
    */
}
