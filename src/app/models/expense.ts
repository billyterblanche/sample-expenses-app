export class Expense {
    id: number;
    value: number;
    dateOfExpense: Date;
    description: string;
    taxId: number;
    VAT: number;

    static getAmountVATValue(value: number, rate: number): string {
        const vatPercentage = (rate / 100);
        return (value * vatPercentage).toFixed(2);
    }
}