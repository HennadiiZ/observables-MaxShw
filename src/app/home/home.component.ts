import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.subscription = interval(1000).subscribe((count) => {
    //     console.log(count);
    // })

     const customIntervalObservable = Observable.create((observer)=>{
    
        let count = 0;
      setInterval(() =>{
               observer.next(count); //1
               count++;
               //observer.error(); //2
               //observer.complete(); //3
        }, 1000);
    });

    this.subscription = customIntervalObservable.subscribe((count) => {
      console.log(count);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
