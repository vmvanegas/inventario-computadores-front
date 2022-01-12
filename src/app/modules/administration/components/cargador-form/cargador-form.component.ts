import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CargadorService } from '../../services/cargador.service';

@Component({
  selector: 'app-cargador-form',
  templateUrl: './cargador-form.component.html',
  styleUrls: ['./cargador-form.component.scss']
})
export class CargadorFormComponent implements OnInit {

  @ViewChild('myDate') myDate: ElementRef

  editing = false
  editingItem: any = {}

  public form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private service: CargadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      codigo: ["", [Validators.required, Validators.maxLength(60)]],
      responsable: ["", [Validators.required, Validators.maxLength(60)]],
      estado: ["", [Validators.required, Validators.maxLength(60)]],
      marca: ["", [Validators.required, Validators.maxLength(60)]]
    })

    const itemId = this.activatedRoute.snapshot.paramMap.get('id');

    if(itemId){
      this.getById(itemId).subscribe(res => {
        
        this.form.patchValue({
          codigo: this.editingItem.codigo,
          responsable: this.editingItem.responsable,
          estado: this.editingItem.estado,
          marca: this.editingItem.marca
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
          Estado: this.form.controls['estado'].value,
          Marca: this.form.controls['marca'].value
        }

        this.service.create(item).subscribe(
          res => {
            this.form.reset()
            this.router.navigate(['/administracion/cargadores'])
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
          Estado: this.form.controls['estado'].value,
          Marca: this.form.controls['marca'].value
        }

        this.service.update(item).subscribe(
          res => {
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.router.navigate(['/administracion/cargadores'])
          },
          err => {
            console.log(err)
          }
        )
      }      
    }
  }

}
