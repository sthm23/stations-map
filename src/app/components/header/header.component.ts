import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onSearchResult: EventEmitter<string> = new EventEmitter();
  srcText='';
  constructor() { }

  ngOnInit(): void {
  }

  getSearchText() {
    // console.log(this.srcText);
    this.onSearchResult.emit(this.srcText);
  }

}
