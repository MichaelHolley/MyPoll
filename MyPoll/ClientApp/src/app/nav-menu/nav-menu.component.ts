import { Component } from '@angular/core';
import { faEye, faHome, faPlusCircle, faVoteYea } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent {
  isExpanded = false;

  faVoteYea = faVoteYea;
  faEye = faEye;
  faHome = faHome;
  faPlusCircle = faPlusCircle;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
