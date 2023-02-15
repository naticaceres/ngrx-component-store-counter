import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { interval, noop, Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

export interface CounterState {
  count: number;
  secondsElapsed: number;
}

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  constructor() {
    super({ count: 0, secondsElapsed: 0 });

    interval(1000)
      .pipe(
        withLatestFrom(this.count$),
        tap(([i, count]) => {
          this.updateClock(count);
          console.log(i);
        })
      )
      .subscribe(noop);
  }

  readonly count$: Observable<number> = this.select((state) => state.count);
  readonly secondsElapsed$: Observable<number> = this.select(
    (state) => state.secondsElapsed
  );

  readonly add = this.updater((state) => ({
    ...state,
    count: state.count + 1,
  }));
  readonly incrementSecondsElapsed = this.updater((state, count) => ({
    ...state,
    secondsElapsed: state.secondsElapsed + 1 + count,
  }));

  readonly updateClock = this.effect((count$: Observable<number>) =>
    count$.pipe(
      tap((count) => {
        console.log('updateClock effect called');
        this.incrementSecondsElapsed(count);
      })
    )
  );
}
