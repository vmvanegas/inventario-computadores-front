import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDeMaderaService } from '../../services/baseDeMadera.service';

@Component({
  selector: 'app-base-de-madera-list',
  templateUrl: './base-de-madera-list.component.html',
  styleUrls: ['./base-de-madera-list.component.scss']
})
export class BaseDeMaderaListComponent implements OnInit {

  @ViewChild('myModal') myModal: ElementRef
  @ViewChild('myModalQuestion') myModalQuestion: ElementRef


  public list = [];
  //GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingBasesDeMadera: any = {}
  public totalItems = []
  public idToDelete = ""
  public loading = true;
  public error = false
  public tableColums = [
    { title: "Codigo", field: "codigo" }, 
    { title: "Responsable", field: "responsable" }, 
    { title: "Estado", field: "estado" }, 
    { title: "Ubicacion", field: "ubicacion" }  
  ]

  constructor(
    public baseDeMaderaService: BaseDeMaderaService,
    private elementRef : ElementRef,
    private router: Router
  ) {
    this.getBasesDeMaderaList()
  }

  ngOnInit(): void {
  }

  getBasesDeMaderaList() {
    this.baseDeMaderaService.get(this.page).subscribe(
      (res: any) => {
        this.list = res.data
        this.totalItems = new Array(Math.ceil(res.total / 10))
        console.log(this.list);
        this.error = false
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
        this.error = true
    })
  }

  editItem(event){
    console.log(event.id)
    this.router.navigate(['/administracion/basesdemadera/editar', event.id])
  }


  public setIdToDelete(id) {
    this.idToDelete = id;
  }

  public deleteItem(id) {
    this.baseDeMaderaService.delete(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getBasesDeMaderaList()
      }, err => {
        console.log(err)
      })

  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalItems.length && page > 0) {
      this.page = page
      this.setTableNavigationLinkActive()
      this.baseDeMaderaService.get(this.page).subscribe(
        (res: any) => {
          this.list = res.data
          this.loading = false
        },
        err => {
          console.log(err)
          this.loading = false
        }
      )
    }
  }


  setTableNavigationLinkActive() {
    let elements = []
    this.elementRef.nativeElement.querySelectorAll('.page-link').forEach(item => {
      if (item.classList.contains("active")) {
        item.classList.remove("active")
      }
      elements.push(item)
    })
    elements[this.page].classList.add("active")
  }
}