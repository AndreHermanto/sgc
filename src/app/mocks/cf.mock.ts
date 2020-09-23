import { Subject } from 'rxjs';

export class CfMock {
    updates = new Subject();
    x = {
        dimension: () => {{}},
        getFilterString: () => '',
        getGlobalFilterString: () => '',
    };

    getFilterString() {
        return '';
    }

    create() {
        return Promise.reject('');
    }
}
