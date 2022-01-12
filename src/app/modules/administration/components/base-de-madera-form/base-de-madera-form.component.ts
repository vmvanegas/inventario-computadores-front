import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { setValidationDates } from 'src/app/utils/setValidationDate';
import { BaseDeMaderaService } from '../../services/baseDeMadera.service';

@Component({
  selector: 'app-base-de-madera-form',
  templateUrl: './base-de-madera-form.component.html',
  styleUrls: ['./base-de-madera-form.component.scss']
})
export class BaseDeMaderaFormComponent implements OnInit {

  @ViewChild('myDate') myDate: ElementRef

  editing = false
  editingItem: any = {}

  public form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private baseDeMaderaService: BaseDeMaderaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      codigo: ["", [Validators.required, Validators.maxLength(60)]],
      responsable: ["", [Validators.required, Validators.maxLength(60)]],
      estado: ["", [Validators.required, Validators.maxLength(60)]],
      ubicacion: ["", [Validators.required, Validators.maxLength(60)]]
    })

    const baseDeMaderaId = this.activatedRoute.snapshot.paramMap.get('id');

    if(baseDeMaderaId){
      this.getById(baseDeMaderaId).subscribe(res => {
        
        this.form.patchValue({
          codigo: this.editingItem.codigo,
          responsable: this.editingItem.responsable,
          estado: this.editingItem.estado,
          ubicacion: this.editingItem.ubicacion
        })
     })
    }
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    let min = new Date(Date.now())
    setValidationDates(this.myDate.nativeElement,min, "min")
  }

  get f() {
    return this.form.controls
  }

  getById(id) {
    return new Observable(observer => {
      this.baseDeMaderaService.getById(id).subscribe(
        (res: any)=>{
          this.editingItem = res
          this.editing = true
          observer.next()
        }, err=>{console.log(err)})
    })
  }


  public send() {
    if (this.form.valid) {

      if (!this.editing) {

        const baseDeMadera = {
          Codigo: this.form.controls['codigo'].value,
          Responsable: this.form.controls['responsable'].value,
          Estado: this.form.controls['estado'].value,
          Ubicacion: this.form.controls['ubicacion'].value
        }

        this.baseDeMaderaService.create(baseDeMadera).subscribe(
          res => {
            this.form.reset()
            this.router.navigate(['/administracion/basesdemadera'])
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const baseDeMadera = {
          Id: this.editingItem.id,
          Codigo: this.form.controls['codigo'].value,
          Responsable: this.form.controls['responsable'].value,
          Estado: this.form.controls['estado'].value,
          Ubicacion: this.form.controls['ubicacion'].value
        }

        this.baseDeMaderaService.update(baseDeMadera).subscribe(
          res => {
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.router.navigate(['/administracion/basesdemadera'])
          },
          err => {
            console.log(err)
          }
        )
      }      
    }
  }

}
