import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
 
@Component({
  selector: 'app-calendarSubmodul',
  templateUrl: 'calendarSubmodul.page.html'
})
export class CalendarSubmodulPage implements OnInit {
 
  databaseObj: SQLiteObject;
  name_model: string = "";
  row_data: any = [];
  readonly database_name: string = "calendarTable.db";
  readonly table_name: string = "Takvim_tablosu";

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)
  private locale: string,
  private platform: Platform,
  private sqlite: SQLite) {
    }
    createDB() {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          alert('calendarTable Database Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

    createTable() {
      this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
        .then(() => {
          alert('Table Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

    insertRow() {
      if (!this.name_model.length) {
        alert("Enter Name");
        return;
      }
      this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', [])
        .then(() => {
          alert('Row Inserted!');
          this.getRows();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }

  ngOnInit() {
    this.resetEvent();
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
  getRows() {
    this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
       
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.eventSource.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
 
  deleteRow(item) {
    this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.insertRow();
    this.resetEvent();
  }
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
   
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
   
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}