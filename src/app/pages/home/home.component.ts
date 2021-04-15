import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/noticias.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: Article[] = [];

  constructor(
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit() {
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
