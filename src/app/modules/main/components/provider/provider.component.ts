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

/**
 * Third party
 */
import { graphic } from 'echarts';

declare const require: any;

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
    paramsToTableData: any;

    /**
     * Set chart properties: start
     */
    options: any;
    initOpts: any;

    optionsToRose: any;

    optionsToPie: any;
    /**
     * Set chart properties: end
     */

    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public matsnackbar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this._crud.readFromRoute({
            route: 'Fornecedores/chartOverUF'
        }).then(res => {
            /**
             * Set events chart: start
             */
            const dataAxis = [];
            const data = [];
            const dataToRose = [];

            res['response'].forEach(element => {
                dataAxis.push(element['attributes']['UF']);
                data.push(element['attributes']['TOTAL']);
                dataToRose.push({
                    value: element['attributes']['TOTAL'],
                    name: element['attributes']['UF']
                });
            });

            this.options = {
                title: {
                    text: 'Bar chart',
                    subtext: 'Data from database',
                    x: 'center'
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dataAxis,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: 'Clientes',
                    type: 'bar',
                    barWidth: '60%',
                    data: data
                }]
            };

            this.initOpts = {
                renderer: 'svg',
                width: 300,
                height: 300
            };
            /**
             * Set events chart: end
             */

            /**
            * Set rose diagram chart: start
            */
            this.optionsToRose = {
                title: {
                    text: 'Nightingale\'s Rose Diagram',
                    subtext: 'Data from database',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: data
                },
                calculable: true,
                series: [
                    {
                        name: 'Cliente/Estado',
                        type: 'pie',
                        radius: [30, 110],
                        roseType: 'area',
                        data: dataToRose
                    }
                ]
            };
            /**
             * Set rose diagram chart: end
             */

            /**
            * Set pie chart: start
            */
            this.optionsToPie = {
                title: {
                    text: 'Pie Chart',
                    subtext: 'Data from database',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: data
                },
                calculable: true,
                series: [
                    {
                        name: 'Cliente/Estado',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        data: dataToRose
                    }
                ]
            };
            /**
            * Set pie chart: end
            */
        });

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

    onChartEvent(event: any, type: string) {
        console.log('chart event:', type, event);
    }
}
