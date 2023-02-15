import { Component, VERSION } from '@angular/core';
import { CounterStore } from './counter.store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [CounterStore],
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor(private readonly counterStore: CounterStore) {}
  readonly count$ = this.counterStore.count$;
  readonly secondsElapsed$ = this.counterStore.secondsElapsed$;

  onClickAddButton() {
    this.counterStore.add();
  }
}
