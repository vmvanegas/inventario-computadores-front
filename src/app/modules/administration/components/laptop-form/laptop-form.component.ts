import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { LaptopService } from '../../services/laptop.service';
import { ProviderService } from '../../services/provider.service';
import { setValidationDates } from 'src/app/utils/setValidationDate';
import { dateValidator } from 'src/app/utils/dateValidation';

@Component({
  selector: 'app-laptop-form',
  templateUrl: './laptop-form.component.html',
  styleUrls: ['./laptop-form.component.scss']
})
export class LaptopFormComponent implements OnInit {

  @ViewChild('myDate') myDate: ElementRef

  editing = false
  editingLaptop: any = {}


  providerList = []
  categoryList = []


  public laptopForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private laptopService: LaptopService,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.laptopForm = this.formBuilder.group({
      codigo: ["", [Validators.required, Validators.maxLength(60)]],
      marca: ["", [Validators.required, Validators.maxLength(60)]],
      nombre: ["", [Validators.required, Validators.maxLength(60)]],
      cpu: ["", [Validators.required, Validators.maxLength(60)]],
      ranura: ["", [Validators.required, Validators.maxLength(60)]],
      ram: ["", [Validators.required, Validators.maxLength(60)]],
      ssd_hdd: ["", [Validators.required, Validators.maxLength(60)]],
      responsable: ["", [Validators.required, Validators.maxLength(60)]],
      backup: ["", [Validators.required, Validators.maxLength(60)]],
      so: ["", [Validators.required, Validators.maxLength(60)]],
      estado: ["", [Validators.required, Validators.maxLength(60)]],
      modelo: ["", [Validators.required, Validators.maxLength(60)]],
      sn: ["", [Validators.required, Validators.maxLength(60)]],
      ubicacion: ["", [Validators.required, Validators.maxLength(60)]]
/*       category: ["", [Validators.required, Validators.maxLength(60)]],
      price: ["", [Validators.required, Validators.maxLength(120)]],
      provider: ["", [Validators.required, Validators.maxLength(60)]],
      dueDate: ["", [Validators.required, Validators.maxLength(60), dateValidator]],
      quantity: ["", [Validators.required, Validators.maxLength(60)]] */
      /* description: ["", [Validators.required, Validators.maxLength(120)]], */
    })

    const laptopId = this.activatedRoute.snapshot.paramMap.get('id');

    if(laptopId){
      this.getLaptop(laptopId).subscribe(res => {
        
        this.laptopForm.patchValue({
          codigo: this.editingLaptop.codigo,
          marca: this.editingLaptop.marca,
          nombre: this.editingLaptop.nombre,
          cpu: this.editingLaptop.cpu,
          ranura: this.editingLaptop.ranura,
          ram: this.editingLaptop.ram,
          ssd_hdd: this.editingLaptop.ssdHdd,
          responsable: this.editingLaptop.responsable,
          backup: this.editingLaptop.backup,
          so: this.editingLaptop.so,
          estado: this.editingLaptop.estado,
          modelo: this.editingLaptop.modelo,
          sn: this.editingLaptop.sn,
          ubicacion: this.editingLaptop.ubicacion
        })

/*         this.getProviderList()
 */      })
    }/* 
    else {
      this.getProviderList()
    } */
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let min = new Date(Date.now())
    setValidationDates(this.myDate.nativeElement,min, "min")
  }

  get f() {
    return this.laptopForm.controls
  }

  getLaptop(id) {
    return new Observable(observer => {
      this.laptopService.getById(id).subscribe(
        (res: any)=>{
          this.editingLaptop = res
          this.editing = true
          observer.next()
        }, err=>{console.log(err)})
    })
  }

  getProviderList() {
    this.providerService.getList().subscribe(
      (res :any) => {
        this.providerList = res
        this.getCategoryList()
      }, 
      err => {
        console.log(err)
      }
    )
  }

  getCategoryList() {
    this.categoryService.getList().subscribe(
      (res :any) => {
        this.categoryList = res
      }, 
      err => {
        console.log(err)
      }
    )
  }

  public sendLaptop() {
    if (this.laptopForm.valid) {

      if (!this.editing) {

        const laptop = {
          Codigo: this.laptopForm.controls['codigo'].value,
          Marca: this.laptopForm.controls['marca'].value,
          Nombre: this.laptopForm.controls['nombre'].value,
          Cpu: this.laptopForm.controls['cpu'].value,
          Ranura: this.laptopForm.controls['ranura'].value,
          Ram: this.laptopForm.controls['ram'].value,
          SsdHdd: this.laptopForm.controls['ssd_hdd'].value,
          Responsable: this.laptopForm.controls['responsable'].value,
          Backup: this.laptopForm.controls['backup'].value,
          So: this.laptopForm.controls['so'].value,
          Estado: this.laptopForm.controls['estado'].value,
          Modelo: this.laptopForm.controls['modelo'].value,
          Sn: this.laptopForm.controls['sn'].value,
          Ubicacion: this.laptopForm.controls['ubicacion'].value
        }

        this.laptopService.create(laptop).subscribe(
          res => {
            this.laptopForm.reset()
            this.router.navigate(['/administracion/laptops'])
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const laptop = {
          Id: this.editingLaptop.id,
          Codigo: this.laptopForm.controls['codigo'].value,
          Marca: this.laptopForm.controls['marca'].value,
          Nombre: this.laptopForm.controls['nombre'].value,
          Cpu: this.laptopForm.controls['cpu'].value,
          Ranura: this.laptopForm.controls['ranura'].value,
          Ram: this.laptopForm.controls['ram'].value,
          SsdHdd: this.laptopForm.controls['ssd_hdd'].value,
          Responsable: this.laptopForm.controls['responsable'].value,
          Backup: this.laptopForm.controls['backup'].value,
          So: this.laptopForm.controls['so'].value,
          Estado: this.laptopForm.controls['estado'].value,
          Modelo: this.laptopForm.controls['modelo'].value,
          Sn: this.laptopForm.controls['sn'].value,
          Ubicacion: this.laptopForm.controls['ubicacion'].value
        }

        this.laptopService.update(laptop).subscribe(
          res => {
            this.editing = false
            this.editingLaptop = {}
            this.laptopForm.reset()
            this.router.navigate(['/administracion/laptops'])
          },
          err => {
            console.log(err)
          }
        )
      }      
    }
  }

}
