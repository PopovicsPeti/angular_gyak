import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup = <FormGroup>{};
  errorMessage: string = '';



  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    let datum: string = new Date().toISOString().substring(0, 10);
    let nev: string = '';
    let fo: number = 2;
    let cim: string = '';
    let iranyitoszam: number = 0;
    
    this.orderForm = new FormGroup({
      'datum': new FormControl( datum, [Validators.required]),
      'nev': new FormControl( nev, [
        Validators.required,
        Validators.minLength(5),
      ]),
      'fo': new FormControl( fo, [
        Validators.required,
        Validators.min(2),
        Validators.max(16),
      ]),
      'cim': new FormControl( cim, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'iranyitoszam': new FormControl( iranyitoszam, [
        Validators.required,
        Validators.min(1011),
        Validators.max(9985)
      ])
    })
  }

  onSubmit(){
    this.http.post<any>('https://ngszabaduloszoba2022-default-rtdb.europe-west1.firebasedatabase.app/foglalasok.json', this.orderForm.value)
    .pipe(
      catchError( error => {
        this.errorMessage = error.message;
        return throwError(error);
      })
    )
    .subscribe( () => {
      this.router.navigate(['/foglalasok']);
    })
  }

}
