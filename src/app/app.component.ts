import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  temp: any[] = [];
  rows: any[] = [];
  columns = [
    { name: 'RM or PM', prop: 'name' },
    { name: 'Connection Name/UEN', prop: 'connectionName' },
    { name: 'Client or Prospect', prop: 'clientOrProspect' },
    { name: 'Request ID', prop: 'requestId' },
    { name: 'Request Status', prop: 'requestStatus' },
    { name: 'Last Modified', prop: 'lastModified' }
  ];
  
  totalCount: number = 100; // Total number of records for pagination
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    // Simulated data - replace with actual API call
    this.rows = [
      { id: 1, name: 'Sandesh Yoge', connectionName: 'Connection XYZ', uen: '3123123', clientOrProspect: 'Prospect', requestId: '1234', requestStatus: 'Pending', lastModified: 'Apr 11, 2023' },
      { id: 2, name: 'John Doe', connectionName: 'Connection ABC', uen: '9876543', clientOrProspect: 'Client', requestId: '5678', requestStatus: 'Submitted', lastModified: 'Jan 21, 2022' },
      { id: 3, name: 'Jane Smith', connectionName: 'Connection PQR', uen: '4567890', clientOrProspect: 'Client', requestId: '9876', requestStatus: 'Approved', lastModified: 'Nov 5, 2023' },
      // Add more mock data as needed
    ];
    this.temp = [...this.rows];
  }
  
  onPageChange(event: any) {
    // Handle pagination event
    console.log('Page change event:', event);
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
  
  onActivate(event: any) {
    // Handle row activation event
    console.log('Activate event:', event);
  }
  
  // updateFilter(event: any, columnName: string) {
  //   // Handle filter update event
  //   console.log('Filter update event:', event.target.value, columnName);
  //   // Implement filtering logic here
  // }

  updateFilter(event, column) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(d => {
      return d[column].toLowerCase().includes(val) || !val;
    });

    this.rows = temp;
  }
  
  getInitialsIcon(name: string): string {
    // Extract initials from name
    if(name){
    // const initials = name.split(' ').map(word => word.charAt(0)).join('');
    // return initials.toUpperCase()
    return 'AB';
    }
    return null;
  }
  
  getStatusIcon(status: string): string {
    // Map status to appropriate icon
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏰'; // Clock icon
      case 'submitted':
      case 'approved':
        return '✔️'; // Checkmark icon
      default:
        return '';
    }
  }

  
  
  getStatusClass(status: string): string {
    // Map status to appropriate CSS class
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'submitted':
        return 'status-submitted';
      case 'approved':
        return 'status-approved';
      default:
        return '';
    }
  }

  sort = {
    active: '',
    direction: ''
  };

  getSortIcon(column: string): string {
    if (this.sort.active === column) {
      return this.sort.direction === 'asc' ? '▲' : '▼';
    }
    return '⬍';
  }
}
