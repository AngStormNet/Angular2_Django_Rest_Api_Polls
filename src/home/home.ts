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
  template: template
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  myName: string;
  question_list: Object;
  choice_list: Object;
  clickedQuestion: number;
  add_question: boolean = false;
  totalQuestions: number;

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
    //alert('Clicked Question Number' + id);
    this.clickedQuestion=id;
    var url = "http://localhost:8000/choice_list/";
    var authHeader = new Headers();
     if (this.jwt) {
      authHeader.append('Authorization', 'JWT ' + this.jwt);
    }
    this.http.get(url, {
      headers: authHeader
    })
      .map(res => res.json())
      .subscribe(choice_list => this.choice_list = choice_list);

  }

  submitVote(id, votes, choice_txt, question){
    this.clickedQuestion = 0;
    var url = "http://localhost:8000/choices/" + id + "/";
    var authHeader = new Headers();
     if (this.jwt) {
      authHeader.append('Authorization', 'JWT ' + this.jwt);
      authHeader.append('Content-Type', 'application/json');

    }
    votes = votes + 1;
    let body = JSON.stringify({ "id": id, "votes": votes, "choice_text": choice_txt, "question": question });
    //noinspection TypeScriptValidateTypes
    this.http.put(url, body, { headers: authHeader })
      .subscribe(
        response => {
          alert("Vote Submitted\nVotes for " + choice_txt + " = " + votes + "\n Thank you for voting");
          this.clickedQuestion = question;
          this.router.parent.navigateByUrl('/home');

        },
        error => {
          alert(error.text());
          console.log(error.text());
        })
  }

  addQuestion(num){
    this.add_question = true;
    this.totalQuestions = num + 1;
  }

  submitQuestions(event, question_text, choice1, choice2){
    var authHeader = new Headers();
     if (this.jwt) {
      authHeader.append('Authorization', 'JWT ' + this.jwt);
      authHeader.append('Content-Type', 'application/json');
    }
    event.preventDefault();
    var id = this.totalQuestions;
    let choice_strings = JSON.stringify({choice1, choice2});
    let body = JSON.stringify({ question_text, choice_strings: [{choice_strings}] });
    this.http.post('http://localhost:8000/question_list/', body, { headers: authHeader })
      .subscribe(
        response => {
          //localStorage.setItem('jwt', response.json().token);
         alert("question Added");
         window.location.reload();
        },
        error => {
          window.location.reload();
          console.log(error.text());
        }

      );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }



}
