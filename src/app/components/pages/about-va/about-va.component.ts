import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about-va',
  templateUrl: './about-va.component.html',
  styleUrls: ['./about-va.component.css']
})
export class AboutVaComponent implements OnInit {
  environment = environment;
  constructor() { }

  ngOnInit() {
  }

}
