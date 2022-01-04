import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LaptopService } from '../../services/laptop.service';

@Component({
  selector: 'app-laptops-list',
  templateUrl: './laptops-list.component.html',
  styleUrls: ['./laptops-list.component.scss']
})
export class LaptopsListComponent implements OnInit {

  @ViewChild('myModal') myModal: ElementRef
  @ViewChild('myModalQuestion') myModalQuestion: ElementRef


  public list = [];
  //GENERAR FILAS  DINAMICAS
  public page = 1;
  public editing: boolean = false
  public editingLaptops: any = {}
  public totalItems = []
  public idToDelete = ""
  public loading = true;
  public error = false
  public tableColums = [
    { title: "Codigo", field: "codigo" }, 
    { title: "Marca", field: "marca" }, 
    { title: "Nombre", field: "nombre" }, 
    { title: "Cpu", field: "cpu" }, 
    { title: "Ranura", field: "ranura" }, 
    { title: "Ram", field: "ram" }, 
    { title: "Ssd/hdd", field: "ssdHdd" }, 
    { title: "Responsable", field: "responsable" }, 
    { title: "Backup", field: "backup" }, 
    { title: "So", field: "so" }, 
    { title: "Estado", field: "estado" }, 
    { title: "Modelo", field: "modelo" }, 
    { title: "Sn", field: "sn" }, 
    { title: "Ubicacion", field: "ubicacion" }  
  ]

  constructor(
    public laptopsService: LaptopService,
    private elementRef : ElementRef,
    private router: Router
  ) {
    this.getLaptopsList()
  }

  ngOnInit(): void {
  }

  getLaptopsList() {
    this.laptopsService.get(this.page).subscribe(
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
    this.router.navigate(['/administracion/laptops/editar', event.id])
  }


  public setIdToDelete(id) {
    this.idToDelete = id;
  }

  public deleteLaptop(id) {
    this.laptopsService.delete(id).subscribe(
      res => {
        console.log(res)
        this.idToDelete = "";
        this.myModalQuestion.nativeElement.click()
        this.getLaptopsList()
      }, err => {
        console.log(err)
      })

  }


  public changePage(page) {
    this.loading = true
    if (page <= this.totalItems.length && page > 0) {
      this.page = page
      this.setTableNavigationLinkActive()
      this.laptopsService.get(this.page).subscribe(
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
