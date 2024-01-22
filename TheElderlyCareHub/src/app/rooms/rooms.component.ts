import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  displayedColumns: string[] = ['OcupantName', 'temperature', 'Fan_status'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<any[]>('http://localhost:3000/api/rooms').subscribe(data => {
      this.rooms = data;
    });
  }
}
