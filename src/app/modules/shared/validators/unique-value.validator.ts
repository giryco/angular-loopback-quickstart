import {
    AbstractControl
} from '@angular/forms';

import {
    CrudService
} from './../services/loopback/crud.service';


export function ValidateUniqueValue(valueToIgnoreIfUpdate: string, collectionAndField: any, _crud: CrudService) {
    let response;
    return function (control: AbstractControl) {
        clearTimeout(response);

        response = setTimeout(() => {
            _crud.readFromRoute({
                route: collectionAndField[0],
                where: [{
                    field: collectionAndField[1],
                    value: control.value
                }]
            }).then(res => {
                if (res['obj'].length > 0) {
                    if (res['obj'][0][collectionAndField[1]] !== valueToIgnoreIfUpdate) {
                        control.setErrors({
                            validate: false,
                            message: 'Campo de valor único e o valor "' + control.value + '" já existe'
                        });
                    }
                }
            }, err => {
                this._auth.handleError(err, '');
            });
        }, 500);
        return null;
    };
}

