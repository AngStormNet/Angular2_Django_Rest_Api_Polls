import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';
import {Response} from "angular2/http";
import { contentHeaders } from '../common/headers';
import { Router, RouterLink } from 'angular2/router';
import {NgFor} from "angular2/common";
import {Injectable} from "angular2/core";

let template = require('./home.html');


@Component({
  selector: 'home',

})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,
  directives: [NgFor]
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  myName: string;
  question_list:Object;


  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.myName = "Desmond";

    var authHeader = new Headers();
     if (this.jwt) {
      authHeader.append('Authorization', 'JWT ' + this.jwt);
    }
    http.get('http://localhost:8000/question_list/', {
      headers: authHeader
    })
      .map(res => res.json())
      .subscribe(question_list => this.question_list = question_list);
  }

  getClicked(id){
    alert('Clicked ID' + id);
  }


  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }



}
