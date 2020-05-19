import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    console.log("Output Directive");
    this.sideNavToggle.emit();
  }
}