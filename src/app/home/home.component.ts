import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { first } from 'rxjs/operators';

import { User, Expense, DailogData } from '../models';
import { AuthenticationService, UserExpensesService, AlertService } from '../services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    displayedColumns: Array<string> = [ 'description', 'value', 'VAT', 'date', 'edit-action', 'delete-action' ];

    currentUser: User;
    users: Array<User>;
    expenses: Array<Expense> = [];
    data: any;
    dataSource: MatTableDataSource<Element>;
    loading: boolean;
    rows: Array<string> = [];
    columns: Array<string> = [];

    @ViewChild('expensestable', { static:false }) table: MatTable<any>;

    constructor(
        private authenticationService: AuthenticationService,
        private userExpensesService: UserExpensesService,
        public dialog: MatDialog,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadUserExpenses();
    }

    openDialog(action: string, expense: Expense) {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
          width: '300px',
          data: { expense, action } as DailogData
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result.event == 'Add') {
            this.addRowData(result.data);
          }else if(result.event == 'Update') {
            this.updateRowData(result.data);
          }else if(result.event == 'Delete') {
            this.deleteRowData(result.data);
          }
        });
      }
    
      addRowData(expense: Expense) {
        this.userExpensesService.create(expense)
        .pipe(first())
        .subscribe(
          () => {
            this.loadUserExpenses();
            this.loading = false;
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
      }

      updateRowData(expense: Expense) {
        this.data.filter((value: { id: number; }, key: number) => {
          if(value.id == expense.id){
            this.userExpensesService.update(expense)
            .pipe(first())
            .subscribe(() => {
              const index = this.data.findIndex((x: { id: number; }) => x.id === expense.id);
              this.data[index] = expense;
              this.dataSource = new MatTableDataSource<Element>(this.data);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
          }
          return true;
        });
      }

      deleteRowData(expense: Expense) {
        this.data.filter((value: { id: number; }, key: number) => {
          if(value.id == expense.id) {
            this.userExpensesService.delete(expense.id)
            .pipe(first())
            .subscribe(() => {
              this.data.splice(key,1);
              this.dataSource = new MatTableDataSource<Element>(this.data);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
          }
          return true;
        });
      }

      loadUserExpenses() {
          this.userExpensesService.getAll()
              .pipe(first())
              .subscribe(result =>
                  {
                      this.expenses = result.expenses;
                      this.data = Object.assign(this.expenses);
                      this.dataSource = new MatTableDataSource<Element>(this.data);
                  });
      }
}