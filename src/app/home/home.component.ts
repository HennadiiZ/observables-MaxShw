import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { }

  ngOnInit() {

    const customIntervalObservable = Observable.create((observer)=>{
    
    let count = 0;
    setInterval(() =>{
               observer.next(count); //1

               if(count == 2){
                observer.complete(); //3
               }

               if(count > 3){
                 observer.error(new Error('Invalid number !!!')); //2
               }
               count++;    
        }, 1000);
    });

  this.subscription = customIntervalObservable.pipe(filter(data => {
      return data < 0;
  }), map((data: number) =>{
      return 'Round:' + (data + 1);
  })).subscribe(count => {
      console.log(count);
      }, error => { 
        console.log(error);
        alert(error.message);
      }, ()=>{
        console.log('completed !!! ');
      });
  }  

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
