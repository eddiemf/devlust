interface DateFormatterConfig {
  date: string;
}

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default class DateFormatter {
  private day: number;
  private month: MonthNumber;
  private year: number;

  constructor({ date }: DateFormatterConfig) {
    this.day = this.getDayNumber(date);
    this.month = this.getMonthNumber(date);
    this.year = this.getYearNumber(date);
  }

  public format() {
    const formattedDay = this.formatDay();
    const formattedMonth = this.formatMonth();
    const formattedDate = `${formattedMonth} ${formattedDay}, ${this.year}`;
    return formattedDate;
  }

  private getDayNumber(rawDate: string) {
    return +rawDate.split('-')[2];
  }

  private getMonthNumber(rawDate: string): MonthNumber {
    return +rawDate.split('-')[1] as MonthNumber;
  }

  private getYearNumber(rawDate: string) {
    return +rawDate.split('-')[0];
  }

  private formatDay() {
    return this.day < 10 ? `0${this.day}` : `${this.day}`;
  }

  private formatMonth() {
    const monthsMap = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };

    return monthsMap[this.month];
  }
}
