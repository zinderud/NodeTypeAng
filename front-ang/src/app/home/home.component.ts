import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  UserService } from '../shared';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
   
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
 

  ngOnInit() {
   
  }

  
  }
 