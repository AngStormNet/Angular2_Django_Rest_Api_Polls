import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from 'angular2/router';
import {Response} from "angular2/http";


let template = require('./home.html');


@Component({
  selector: 'home',

})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,

})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  myName: string;


  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.myName = "Desmond";

    this.http.get('http://localhost:8000/question_list/')
      .map(question_list => question_list.json.data);


  }



  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }



}
