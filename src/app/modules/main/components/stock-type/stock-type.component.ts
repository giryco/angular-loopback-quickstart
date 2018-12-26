import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { StockTypeDialogComponent } from './stock-type-dialog/stock-type-dialog.component';

/**
 * Services
 */
import { CrudService } from '../../../shared/services/loopback/crud.service';

@Component({
    selector: 'app-stock-type',
    templateUrl: './stock-type.component.html',
    styleUrls: ['./stock-type.component.css']
})
export class StockTypeComponent implements OnInit {
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
                title: 'Tipos de Estoque',
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
                    propertiesToSearch: ['cd_tp_estoque', 'ds_tp_estoque']
                }
            },
            list: {
                route: 'TiposEstoque',
                crudParams: {
                    order: [{
                        field: 'cd_tp_estoque',
                        order: 'asc'
                    }]
                },
                columns: [{
                    attribute: 'cd_tp_estoque',
                    header: 'Código'
                }, {
                    attribute: 'ds_tp_estoque',
                    header: 'Descrição'
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
            const dialogRef = this._dialog.open(StockTypeDialogComponent, {
                width: '95%'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
                }
            });
        }

        if (e.trigger === 'listEdit') {
            const dialogRef = this._dialog.open(StockTypeDialogComponent, {
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
                route: 'TiposEstoque',
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
