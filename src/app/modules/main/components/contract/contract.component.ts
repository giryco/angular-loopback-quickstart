import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';

/**
 * Services
 */
import { CrudService } from '../../../shared/services/loopback/crud.service';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
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
                title: 'Contratos',
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
                  propertiesToSearch: ['descricao']
                }
            },
            list: {
                route: 'Contratos',
                crudParams: {
                    order: [{
                        field: 'descricao',
                        order: 'asc'
                    }]
                },
                columns: [{
                    attribute: 'descricao',
                    header: 'Descrição'
                }, {
                    attribute: 'nm_usr',
                    header: 'Nome do usuário'
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
            const dialogRef = this._dialog.open(ContractDialogComponent, {
                width: '95%'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
                }
            });
        }

        if (e.trigger === 'listEdit') {
            const dialogRef = this._dialog.open(ContractDialogComponent, {
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
                route: 'Contratos',
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
