import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Tax } from '../models/tax';

@Injectable({ providedIn: 'root' })
export class TaxService {
    private taxSubject: BehaviorSubject<Tax>;
    public tax: Observable<Tax>;

    constructor(private http: HttpClient) {
        this.taxSubject = new BehaviorSubject<Tax>(JSON.parse(localStorage.getItem('tax')));
        this.tax = this.taxSubject.asObservable();
    }

    get() {
        return this.http.get<Tax>(`${environment.baseUrl}/api/tax`)
            .pipe(map(tax => {
                localStorage.setItem('tax', JSON.stringify(tax));
                this.taxSubject.next(tax);
                return tax;
            }));
    }

    public get currentTaxValue(): Tax {
        return this.taxSubject.value;
    }
}