import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 5) {
            observer.complete();
          }
          if (count > 6) {
            observer.error(new Error('Count is greater 3!'));
          }
          count++;
        }, 1000)
      }
    )
    .pipe(filter((data: number) => {
      return data % 2 ==0;
    }))
    .pipe(map((data: number) => {
      return 'Round: ' + (data + 0.5);
    }));

    this.firstObsSubscription = customIntervalObservable.subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error)
      }, () => { //on conpleted successfully
        console.log('Completed!');
        // alert('Completed!');
      }
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
