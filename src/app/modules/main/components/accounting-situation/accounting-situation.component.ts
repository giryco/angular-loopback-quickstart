import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { AccountingSituationDialogComponent } from './accounting-situation-dialog/accounting-situation-dialog.component';

/**
 * Services
 */
import { CrudService } from '../../../shared/services/loopback/crud.service';

@Component({
    selector: 'app-accounting-situation',
    templateUrl: './accounting-situation.component.html',
    styleUrls: ['./accounting-situation.component.css']
})
export class AccountingSituationComponent implements OnInit {
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
                title: 'Situações contábeis',
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
                  propertiesToSearch: ['sg_sis', 'nm_usr']
                }
            },
            list: {
                route: 'SituacoesContabeis',
                crudParams: {
                    order: [{
                        field: 'sg_sis',
                        order: 'asc'
                    }]
                },
                columns: [{
                    attribute: 'sg_sis',
                    header: 'Sigla do sistema'
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
            const dialogRef = this._dialog.open(AccountingSituationDialogComponent, {
                width: '95%'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
                }
            });
        }

        if (e.trigger === 'listEdit') {
            const dialogRef = this._dialog.open(AccountingSituationDialogComponent, {
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
                route: 'SituacoesContabeis',
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
