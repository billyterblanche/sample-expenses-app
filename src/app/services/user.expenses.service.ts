import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense, Expenses } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserExpensesService {
    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Expenses>(`${environment.baseUrl}/api/expenses`);
    }

    create(expense: Expense) {
        return this.http.post(`${environment.baseUrl}/api/expenses`, expense);
    }

    update(expense: Expense) {
        return this.http.put(`${environment.baseUrl}/api/expenses/${expense.id}`, expense);
    }

    delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/api/expenses/${id}`);
    }
}