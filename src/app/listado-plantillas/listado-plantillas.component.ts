import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogContent,
  MatButtonModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
];


export interface UserData {
  id: string;
  name: string;
  ramo: string;
  fechaCreacion: string;
  previo: string;
}
const PLANTILLAS: string[] = [
  'Feliz cumpleaños',
  'Actualización de datos',
  'Feliz día del padre',
  'Recordatorio de pago',
  'Feliz navidad',
  'Feliz año nuevo',
  'Feliz día de la madre',
  'Feliz día del niño',
  'Descuetos de temporada',
  'Promoción de verano',
  'Promoción de invierno',
  'Promoción de primavera'
];
const RAMOS: string[] = [
  'Autos',
  'Daños',
  'Vida',
  'Gastos médicos',
]
const FECHAS: string[] = [
  '01/01/2021',
  '02/01/2021',
  '03/01/2021',
  '04/01/2021',
  '05/01/2021',
  '06/01/2021',
  '07/01/2021',
  '08/01/2021',
  '09/01/2021',
  '10/01/2021',
  '11/01/2021',
  '12/01/2021',

];
const IMGS: string[]= [
  '../../assets/avisoPrivasidad.png',
  '../../assets/promocionesFinAnio.png',
  '../../assets/terminosCondiciones.png'
]
@Component({
  selector: 'app-listado-plantillas',
  standalone: true,
  imports: [COMPONENTS],
  templateUrl: './listado-plantillas.component.html',
  styleUrl: './listado-plantillas.component.css'
})
export class ListadoPlantillasComponent {
  displayedColumns: string[] = ['id', 'plantilla', 'ramo', 'fechaCreacion', 'previo'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('dialogPreview') dialogPreview!: TemplateRef<any>;

  rutaPlantilla: string ='';

  constructor(private matDialog: MatDialog) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  prevewTemplate() :void{
    this.rutaPlantilla = IMGS[Math.round(Math.random() * (IMGS.length - 1))];
    this.matDialog.open(this.dialogPreview,
      {
        width: '960px',
        maxWidth: '1250px',
      }
    );
  }

}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
  PLANTILLAS[Math.round(Math.random() * (PLANTILLAS.length - 1))] +
    ' ' +
    PLANTILLAS[Math.round(Math.random() * (PLANTILLAS.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    ramo: RAMOS[Math.round(Math.random() * (RAMOS.length - 1))],
    fechaCreacion: FECHAS[Math.round(Math.random() * (FECHAS.length - 1))],
    previo: ''
  };
}
