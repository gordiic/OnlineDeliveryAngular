import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  constructor() {}
  title = '';

  newMember = '';
  members: string[] = [];
  errMessage: string = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  addMember() {
    if (!this.newMember) {
      this.errMessage = 'Field for name is empty!';
      return;
    }
    this.members.push(this.newMember);
    this.newMember = '';
    this.errMessage = '';
  }

  onInput(member: string) {
    this.newMember = member;
  }

  onNumberOfTeamsInput(numberofteams: string) {
    this.numberOfTeams = Number(numberofteams);
  }

  generateTeam() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) return;
    const allMembers = [...this.members];
    for (let i = 0; i < this.numberOfTeams; i++) {
      const randomIndex = Math.floor(Math.random() * allMembers.length);
      const member = allMembers.splice(randomIndex, 1)[0];

      if (!member) break;
      if (this.teams[i]) {
        this.teams[i].push(member);
      } else {
        this.teams[i] = [member];
      }
    }

    this.members = [];
    this.numberOfTeams = '';
  }
}
