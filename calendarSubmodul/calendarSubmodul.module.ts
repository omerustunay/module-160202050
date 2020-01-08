import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 
import { CalendarSubmodulPage } from './calendarSubmodul.page';
import { NgCalendarModule  } from 'ionic2-calendar';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarSubmodulPage
      }
    ]),
    NgCalendarModule
  ],
  declarations: [CalendarSubmodulPage]
})
export class CalendarSubmodulPageModule {}