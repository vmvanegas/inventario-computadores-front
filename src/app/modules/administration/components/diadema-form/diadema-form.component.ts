import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DiademaService } from '../../services/diadema.service';

@Component({
  selector: 'app-diadema-form',
  templateUrl: './diadema-form.component.html',
  styleUrls: ['./diadema-form.component.scss']
})
export class DiademaFormComponent implements OnInit {

  @ViewChild('myDate') myDate: ElementRef

  editing = false
  editingItem: any = {}

  public form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private service: DiademaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      codigo: ["", [Validators.required, Validators.maxLength(100)]],
      responsable: ["", [Validators.required, Validators.maxLength(100)]],
      marca: ["", [Validators.required, Validators.maxLength(100)]],
      estado: ["", [Validators.required, Validators.maxLength(100)]],
      uso: ["", [Validators.required, Validators.maxLength(100)]],
    })

    const itemId = this.activatedRoute.snapshot.paramMap.get('id');

    if(itemId){
      this.getById(itemId).subscribe(res => {
        
        this.form.patchValue({
          codigo: this.editingItem.codigo,
          responsable: this.editingItem.responsable,
          marca: this.editingItem.marca,
          estado: this.editingItem.estado,
          uso: this.editingItem.uso,
        })
     })
    }
    
  }

  ngOnInit(): void {
    
  }

  get f() {
    return this.form.controls
  }

  getById(id) {
    return new Observable(observer => {
      this.service.getById(id).subscribe(
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

        const item = {
          Codigo: this.form.controls['codigo'].value,
          Responsable: this.form.controls['responsable'].value,
          Marca: this.form.controls['marca'].value,
          Estado: this.form.controls['estado'].value,
          Uso: this.form.controls['uso'].value
        }

        this.service.create(item).subscribe(
          res => {
            this.form.reset()
            this.router.navigate(['/administracion/diademas'])
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const item = {
          Id: this.editingItem.id,
          Codigo: this.form.controls['codigo'].value,
          Responsable: this.form.controls['responsable'].value,
          Marca: this.form.controls['marca'].value,
          Estado: this.form.controls['estado'].value,
          Uso: this.form.controls['uso'].value
        }

        this.service.update(item).subscribe(
          res => {
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.router.navigate(['/administracion/diademas'])
          },
          err => {
            console.log(err)
          }
        )
      }      
    }
  }

}
