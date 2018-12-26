import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { ClientDialogComponent } from './client-dialog/client-dialog.component';

/**
 * Services
 */
import { CrudService } from '../../../shared/services/loopback/crud.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    paramsToTableData: any;

    /**
     * Properties to chart: start
     */
    single = [];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Estado';
    showYAxisLabel = true;
    yAxisLabel = 'Clientes';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    /**
     * Properties to chart: end
     */

    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public matsnackbar: MatSnackBar
    ) {
        this._crud.readFromRoute({
            route: 'Clientes/chartOverUF'
        }).then(res => {
            res['response'].forEach(element => {
                this.single.push({
                    'name': element['attributes']['UF'],
                    'value': element['attributes']['TOTAL']
                });
            });

            Object.assign(this, this.single);
        });
    }

    ngOnInit() {
        this.makeList();
    }

    makeList = () => {
        this.paramsToTableData = {
            toolbar: {
                title: 'Clientes',
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
                    propertiesToSearch: ['cd_cliente', 'descricao']
                }
            },
            list: {
                route: 'Clientes',
                crudParams: {
                    order: [{
                        field: 'cd_cliente',
                        order: 'asc'
                    }]
                },
                columns: [{
                    attribute: 'cd_cliente',
                    header: 'Código'
                }, {
                    attribute: 'descricao',
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
            const dialogRef = this._dialog.open(ClientDialogComponent, {
                width: '95%'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
                }
            });
        }

        if (e.trigger === 'listEdit') {
            const dialogRef = this._dialog.open(ClientDialogComponent, {
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
                    route: 'Clientes',
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

    onChartSelect(event) {
      console.log(event);
    }
}
