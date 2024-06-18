import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import { FormsModule } from '@angular/forms';
import { Table1Component } from './table1/table1.component';

@NgModule({
  declarations: [
    AppComponent,
    Table1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule to imports
    NgxDatatableModule, // Add NgxDatatableModule to imports
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
