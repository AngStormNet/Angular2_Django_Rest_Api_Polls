import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import { contentHeaders } from '../common/headers';


let template = require('./signup.html');

@Component({
  selector: 'signup'
})
@View({
  directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template

})
export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, email, password) {
    event.preventDefault();
    let body = JSON.stringify({ username: "admin", password: "plkplk123", username, email, password });
    this.http.post('http://localhost:8000/create_user/', body, { headers: contentHeaders })
      .subscribe(
        response => {
          //localStorage.setItem('jwt', response.json().token);
          alert('Username: ' + username + "Created Successfully\n Please Login")
          this.router.parent.navigateByUrl('/login');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }

}
