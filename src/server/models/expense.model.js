const sql = require('./db');

class Expense {
    constructor(expense) {
        this.id = expense.id;
        this.userId = expense.userId;
        this.taxId = expense.taxId;
        this.value = expense.value;
        this.description = expense.description;
        this.dateOfExpense = expense.dateOfExpense;
    }
    
    findAll(callback) {
        const statement = `
select ex.id, ex.user_id as userId, ex.value, ROUND((t.rate / 100) * ex.value, 2) as VAT, ex.description, DATE_FORMAT(date_of_expense, '%Y-%m-%d') as dateOfExpense from expenses ex
inner join tax t
on ex.tax_id = t.id
where ex.deleted = 0
and ex.user_id = ?`;
        const parameters = [this.userId];
    
        sql.query(statement, parameters, (err, result) => {
            if (err) {
                throw err;
            }
    
            callback.call(this, result);
        });
      };

      create(callback) {
          const statement = `
insert into expenses
(user_id, tax_id, value, description, date_of_expense)
values
(?, ?, ?, ?, ?)`;
          const parameters = [this.userId, this.taxId, this.value, this.description, this.dateOfExpense];
      
          sql.query(statement, parameters, (err, result) => {
              if (err) {
                  throw err;
              }
      
              callback.call(this, result.insertId);
          });
        };

        update(callback) {
            const statement = `
update expenses
set value = ?,
    description = ?,
    date_of_expense = ?
where id = ?
and  user_id = ?`;
            const parameters = [this.value, this.description, this.dateOfExpense, this.id, this.userId];
        
            sql.query(statement, parameters, (err, result) => {
                if (err) {
                    throw err;
                }
        
                callback.call(this, result.insertId);
            });
          };

        delete(callback) {
            const statement = `
update expenses
set deleted = 1
where id = ?
and  user_id = ?`;
            const parameters = [this.id, this.userId];
        
            sql.query(statement, parameters, (err, result) => {
                if (err) {
                    throw err;
                }
        
                callback.call(this, null);
            });
          };
}

module.exports = Expense;