import { Component, OnInit } from '@angular/core';
import { ElderlyDashboardService } from './ElderlyDashboard.service';
import * as toastr from 'toastr';
import { Howl } from 'howler';


@Component({
  selector: 'app-dash-board2',
  templateUrl: './dash-board2.component.html',
  styleUrls: ['./dash-board2.component.css']
})
export class DashBoard2Component implements OnInit {

  presentElderlies: any[] = [];
  highElderlies: any[] = [];

  private notificationSound: Howl;

  constructor(private elderlyDashboardService: ElderlyDashboardService) {
    this.notificationSound = new Howl({
      src: ['assets/notif.mp3']
    });
  }

  ngOnInit() {
    this.elderlyDashboardService.getPresentElderlies().subscribe(
      (elderlies) => {
        this.presentElderlies = elderlies;
        this.playNotificationSound();
        toastr.info(`Present Elderlies: ${this.presentElderlies.map(elderly => elderly.name).join(', ')}`, 'The Present Elderly', { positionClass: 'toast-top-left' });
      
      },
      (error) => {
        console.error('Failed to fetch present elderlies', error);
      }
    );

    this.elderlyDashboardService.getHighElderlies().subscribe(
      (elderlies) => {
        this.playNotificationSound();
        this.highElderlies = elderlies;
        toastr.success(`High Body Temperature: ${this.highElderlies.map(elderly => elderly.name).join(', ')}`, 'High Body Temperature', { positionClass: 'toast-bottom-right' });
       
      },
      (error) => {
        console.error('Failed to fetch Elderlies with High temperature', error);
      }
    );
  }

  playNotificationSound() {

    if (!this.notificationSound.playing()) {
      this.notificationSound.play();
    }
  }
}
