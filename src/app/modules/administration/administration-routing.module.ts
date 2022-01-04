import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderComponent } from './components/order/order.component';
import { LaptopFormComponent } from './components/laptop-form/laptop-form.component';
import { LaptopsListComponent } from './components/laptops-list/laptopts-list.component';
import { LaptopsComponent } from './components/laptops/laptops.component';
import { ProviderComponent } from './components/provider/provider.component';
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
import { TecladoFormComponent } from './components/teclado-form/teclado-form.component';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'laptops',
        component: LaptopsComponent,
        children: [
          {
            path: '',
            component: LaptopsListComponent
          },
          {
            path: 'crear',
            component: LaptopFormComponent
          },
          {
            path: 'editar/:id',
            component: LaptopFormComponent
          }
        ]
      },
      {
        path: 'basesdemadera',
        component: BaseDeMaderaComponent,
        children: [
          {
            path: '',
            component: BaseDeMaderaListComponent
          },
          {
            path: 'crear',
            component: BaseDeMaderaFormComponent
          },
          {
            path: 'editar/:id',
            component: BaseDeMaderaFormComponent
          }
        ]
      },
      {
        path: 'cablesvga',
        component: CableVgaComponent,
        children: [
          {
            path: '',
            component: CableVgaListComponent
          },
          {
            path: 'crear',
            component: CableVgaFormComponent
          },
          {
            path: 'editar/:id',
            component: CableVgaFormComponent
          }
        ]
      },
      {
        path: 'cargadores',
        component: CargadorComponent,
        children: [
          {
            path: '',
            component: CargadorListComponent
          },
          {
            path: 'crear',
            component: CargadorFormComponent
          },
          {
            path: 'editar/:id',
            component: CargadorFormComponent
          }
        ]
      },
      {
        path: 'diademas',
        component: DiademaComponent,
        children: [
          {
            path: '',
            component: DiademaListComponent
          },
          {
            path: 'crear',
            component: DiademaFormComponent
          },
          {
            path: 'editar/:id',
            component: DiademaFormComponent
          }
        ]
      },
      {
        path: 'monitores',
        component: MonitorComponent,
        children: [
          {
            path: '',
            component: MonitorListComponent
          },
          {
            path: 'crear',
            component: MonitorFormComponent
          },
          {
            path: 'editar/:id',
            component: MonitorFormComponent
          }
        ]
      },
      {
        path: 'mouses',
        component: MouseComponent,
        children: [
          {
            path: '',
            component: MouseListComponent
          },
          {
            path: 'crear',
            component: MouseFormComponent
          },
          {
            path: 'editar/:id',
            component: MouseFormComponent
          }
        ]
      },
      {
        path: 'teclados',
        component: TecladoComponent,
        children: [
          {
            path: '',
            component: TecladoListComponent
          },
          {
            path: 'crear',
            component: TecladoFormComponent
          },
          {
            path: 'editar/:id',
            component: TecladoFormComponent
          }
        ]
      },
      {
        path: 'pedidos',
        component: OrderComponent,
        children: [
          {
            path: '',
            component: OrderListComponent
          },
          {
            path: 'crear',
            component: OrderFormComponent
          },
          {
            path: 'editar/:id',
            component: OrderFormComponent
          }
        ]
      },
      {
        path: 'categorias',
        component: CategoryComponent
      },
      {
        path: 'clientes',
        component: CustomerComponent
      },
      {
        path: 'proveedores',
        component: ProviderComponent
      },
      {
        path: 'empleados',
        component: EmployeeComponent
      },
      {
        path: 'mi-cuenta',
        component: MyAccountComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'laptops'
      },
      {
        path: '**',
        redirectTo: 'laptops'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
