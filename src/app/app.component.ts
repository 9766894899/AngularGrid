import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rows: any[] = [];
  temp: any[] = [];
  columns: any[] = [
    { prop: 'id', name: 'ID', sortable: true },
    { prop: 'name', name: 'Name', sortable: true },
    { prop: 'email', name: 'Email', sortable: true }
  ];

  sort = {
    active: '',
    direction: ''
  };

  constructor() {
    this.fetch(data => {
      this.temp = [...data];
      this.rows = data;
    });
  }

  ngOnInit() {}

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://jsonplaceholder.typicode.com/users`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event, column) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(d => {
      return d[column].toLowerCase().includes(val) || !val;
    });

    this.rows = temp;
  }

  onSort(prop) {
    if (this.sort.active === prop) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.active = prop;
      this.sort.direction = 'asc';
    }
    this.sortData();
  }

  sortData() {
    const rows = [...this.rows];
    const sort = this.sort;
    rows.sort((a, b) => {
      const valA = a[sort.active];
      const valB = b[sort.active];

      if (valA < valB) {
        return sort.direction === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return sort.direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.rows = rows;
  }

  getSortIcon(column: string): string {
    if (this.sort.active === column) {
      return this.sort.direction === 'asc' ? '▲' : '▼';
    }
    return '⬍';
  }
}
