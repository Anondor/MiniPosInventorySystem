import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  product()
  {
    this.router.navigate(['product']);

  }
  unit()
  {
    this.router.navigate(['unit']);
  }
  brand()
  {
    this.router.navigate(['brand']);
  }
  category(){
    this.router.navigate(['category']);
  }

}
