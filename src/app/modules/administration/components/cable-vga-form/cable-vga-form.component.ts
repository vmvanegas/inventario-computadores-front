import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { setValidationDates } from 'src/app/utils/setValidationDate';
import { CableVGAService } from '../../services/cableVGA.service';

@Component({
  selector: 'app-cable-vga-form',
  templateUrl: './cable-vga-form.component.html',
  styleUrls: ['./cable-vga-form.component.scss']
})
export class CableVgaFormComponent implements OnInit {

  @ViewChild('myDate') myDate: ElementRef

  editing = false
  editingItem: any = {}

  public form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private service: CableVGAService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      codigo: ["", [Validators.required, Validators.maxLength(100)]],
      area: ["", [Validators.required, Validators.maxLength(100)]],
      responsable: ["", [Validators.required, Validators.maxLength(100)]],
      estado: ["", [Validators.required, Validators.maxLength(100)]],
      ubicacion: ["", [Validators.required, Validators.maxLength(100)]]
    })

    const itemId = this.activatedRoute.snapshot.paramMap.get('id');

    if(itemId){
      this.getById(itemId).subscribe(res => {
        
        this.form.patchValue({
          codigo: this.editingItem.codigo,
          area: this.editingItem.area,
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
          Area: this.form.controls['area'].value,
          Responsable: this.form.controls['responsable'].value,
          Estado: this.form.controls['estado'].value,
          Ubicacion: this.form.controls['ubicacion'].value
        }

        this.service.create(item).subscribe(
          res => {
            this.form.reset()
            this.router.navigate(['/administracion/cablesvga'])
          },
          err => {
            console.log(err)
          }
        )
      } else {

        const item = {
          Id: this.editingItem.id,
          Codigo: this.form.controls['codigo'].value,
          Area: this.form.controls['area'].value,
          Responsable: this.form.controls['responsable'].value,
          Estado: this.form.controls['estado'].value,
          Ubicacion: this.form.controls['ubicacion'].value
        }

        this.service.update(item).subscribe(
          res => {
            this.editing = false
            this.editingItem = {}
            this.form.reset()
            this.router.navigate(['/administracion/cablesvga'])
          },
          err => {
            console.log(err)
          }
        )
      }      
    }
  }

}
