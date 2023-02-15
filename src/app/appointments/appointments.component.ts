import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: Array<any> = [];
  tableHead: Array<string> = ['datum', 'nev', 'fo', 'cim', 'iranyitoszam'];
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://ngszabaduloszoba2022-default-rtdb.europe-west1.firebasedatabase.app/foglalasok.json')
    .pipe(
      catchError( error => {
        this.errorMessage = error.message;
        return throwError(error);
      }),
      map( (adat: any[]) => {
        let appointments: any[] = [];
        Object.entries(adat).forEach(([key, value]) => {
          appointments.push(value);
        })
        appointments.sort( (a, b) => ( a.datum < b.datum )? 1 : -1);
        return appointments;
      })
    )
    .subscribe( adat => {
      this.appointments = adat;
      console.log(adat)
    })
  }

}
