import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { interval, noop, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
        tap((i) => {
          this.updateClock();
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
  readonly incrementSecondsElapsed = this.updater((state) => ({
    ...state,
    secondsElapsed: state.secondsElapsed++,
  }));

  readonly updateClock = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => {
        console.log('updateClock effect called');
        this.incrementSecondsElapsed();
      })
    )
  );
}
