import { Component, VERSION } from '@angular/core';
import { interval, noop } from 'rxjs';
import { CounterStore } from './counter.store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CounterStore],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private readonly counterStore: CounterStore) {
    // interval(1000)
    //   .pipe(
    //     tap((i) => {
    //       this.counterStore.updateClock();
    //       console.log(i);
    //     })
    //   )
    //   .subscribe(noop);
  }
  readonly count$ = this.counterStore.count$;
  readonly secondsElapsed$ = this.counterStore.secondsElapsed$;

  onClickAddButton() {
    this.counterStore.add();
  }
}
