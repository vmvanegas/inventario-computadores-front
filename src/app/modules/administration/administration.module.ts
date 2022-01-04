import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { LaptopsComponent } from './components/laptops/laptops.component';
import { AdministrationComponent } from './administration.component';
import { CategoryComponent } from './components/category/category.component';
import { ProviderComponent } from './components/provider/provider.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LaptopFormComponent } from './components/laptop-form/laptop-form.component';
import { LaptopsListComponent } from './components/laptops-list/laptopts-list.component';
import { TableComponent } from './components/table/table.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { InputComponent } from './components/input/input.component';
import { FieldErrorsComponent } from './components/field-errors/field-errors.component';

// Implementado locale de colombia para fechas y currencies
import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';
import { BaseDeMaderaComponent } from './components/base-de-madera/base-de-madera.component';
import { BaseDeMaderaListComponent } from './components/base-de-madera-list/base-de-madera-list.component';
import { BaseDeMaderaFormComponent } from './components/base-de-madera-form/base-de-madera-form.component';
import { CableVgaComponent } from './components/cable-vga/cable-vga.component';
import { CableVgaListComponent } from './components/cable-vga-list/cable-vga-list.component';
import { CableVgaFormComponent } from './components/cable-vga-form/cable-vga-form.component';
import { CargadorComponent } from './components/cargador/cargador.component';
import { CargadorListComponent } from './components/cargador-list/cargador-list.component';
import { CargadorFormComponent } from './components/cargador-form/cargador-form.component';
import { DiademaComponent } from './components/diadema/diadema.component';
import { DiademaListComponent } from './components/diadema-list/diadema-list.component';
import { DiademaFormComponent } from './components/diadema-form/diadema-form.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { MonitorListComponent } from './components/monitor-list/monitor-list.component';
import { MonitorFormComponent } from './components/monitor-form/monitor-form.component';
import { MouseComponent } from './components/mouse/mouse.component';
import { MouseListComponent } from './components/mouse-list/mouse-list.component';
import { MouseFormComponent } from './components/mouse-form/mouse-form.component';
import { TecladoComponent } from './components/teclado/teclado.component';
import { TecladoListComponent } from './components/teclado-list/teclado-list.component';
import { TecladoFormComponent } from './components/teclado-form/teclado-form.component'
registerLocaleData(localeCo, 'es-CO');


@NgModule({
  declarations: [
    LaptopsComponent,
    AdministrationComponent,
    CategoryComponent,
    ProviderComponent,
    OrderComponent,
    CustomerComponent,
    EmployeeComponent,
    DashboardComponent,
    LaptopFormComponent,
    LaptopsListComponent,
    TableComponent,
    OrderListComponent,
    OrderFormComponent,
    MyAccountComponent,
    AutocompleteComponent,
    BreadcrumbComponent,
    InputComponent,
    FieldErrorsComponent,
    BaseDeMaderaComponent,
    BaseDeMaderaListComponent,
    BaseDeMaderaFormComponent,
    CableVgaComponent,
    CableVgaListComponent,
    CableVgaFormComponent,
    CargadorComponent,
    CargadorListComponent,
    CargadorFormComponent,
    DiademaComponent,
    DiademaListComponent,
    DiademaFormComponent,
    MonitorComponent,
    MonitorListComponent,
    MonitorFormComponent,
    MouseComponent,
    MouseListComponent,
    MouseFormComponent,
    TecladoComponent,
    TecladoListComponent,
    TecladoFormComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AdministrationComponent],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-CO' // 'de-DE' for Germany, 'fr-FR' for France ...
  },
  ]
})
export class AdministrationModule { }
