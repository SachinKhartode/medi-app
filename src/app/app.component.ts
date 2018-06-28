import { Component,OnInit } from '@angular/core';

import { DataService } from "./Shared/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public themeColor:string;

  constructor(private data: DataService){}

  ngOnInit() 
  {
    this.data.colorCurrentMessage.subscribe(themeColor => this.themeColor = themeColor)
  }
}
