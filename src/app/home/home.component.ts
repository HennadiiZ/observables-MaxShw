import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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

               if(count == 2){
                observer.complete(); //3
               }

               if(count > 3){
                 observer.error(new Error('Invalid number !!!')); //2
               }
               count++;    
        }, 1000);
    });

    customIntervalObservable.pipe(map((data: number) =>{
        return 'Round:' + (data + 1);
    }));

    this.subscription = customIntervalObservable.subscribe(count => {
       console.log(count);
      // console.log('Round:' , (count + 1));
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
