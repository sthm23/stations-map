import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stationsMap';
  @Input() text: string = 's';

  srcText(e:string) {
    this.text = e;
  }
}
