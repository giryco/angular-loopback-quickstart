import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { ProviderDialogComponent } from './provider-dialog/provider-dialog.component';

/**
 * Services
 */
import { CrudService } from '../../../shared/services/loopback/crud.service';

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
    paramsToTableData: any;
    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public matsnackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.makeList();
    }

    makeList = () => {
        this.paramsToTableData = {
            toolbar: {
                title: 'Fornecedores',
                delete: {
                    icon: 'delete',
                    field: 'objectId',
                    message: 'Uma mensagem qualquer caso não queira usar a padrão'
                },
                actionButton: [{
                    type: 'icon',
                    value: 'add_circle_outline',
                    trigger: 'add'
                }],
                search: {
                  icon: 'search',
                  propertiesToSearch: ['nom_fornecedor', 'cod_fornecedor', 'nom_abrev_fornecedor']
                }
            },
            list: {
                route: 'Fornecedores',
                crudParams: {
                    order: [{
                        field: 'cod_fornecedor',
                        order: 'asc'
                    }]
                },
                columns: [{
                    attribute: 'cod_fornecedor',
                    header: 'Código'
                }, {
                    attribute: 'nom_fornecedor',
                    header: 'Descrição'
                }, {
                    attribute: 'nom_abrev_fornecedor',
                    header: 'Abreviatura'
                }],
                actionButton: [{
                    type: 'icon',
                    value: 'edit',
                    trigger: 'listEdit',
                    conditionOverFieldValue: [{
                        field: 'name',
                        logical: '===',
                        value: 'Tecnologia'
                    }]
                }]
            },
            actionbar: {
                quantity: 5
            }
        };
    }

    tableDataOutputReceiver = (e) => {
        if (e.trigger === 'add') {
            const dialogRef = this._dialog.open(ProviderDialogComponent, {
                width: '95%'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
                }
            });
        }

        if (e.trigger === 'listEdit') {
            const dialogRef = this._dialog.open(ProviderDialogComponent, {
                width: '95%',
                data: e.response
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
                }
            });
        }

        if (e.trigger === '_delete') {
            this._crud
            .delete({
                route: 'Fornecedores',
                containedIn: [{
                    property: 'objectId',
                    valueArray: e.response.arrayToDelete
                }]
            })
            .catch(rej => {
                console.log(rej);
            })
            .then(res => {
                this.matsnackbar.open(res['message'], '', {
                    duration: 3000
                });

                setTimeout(() => {
                    this.makeList();
                }, 1000);
            });
        }
    }
}
