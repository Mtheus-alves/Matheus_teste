import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DriverComponent } from './driver/driver.component';
import { PassangerComponent } from './passanger/passanger.component';
import { TripComponent } from './trip/trip.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'driver', component: DriverComponent },
    { path: 'passanger', component: PassangerComponent },
    { path: 'trip', component: TripComponent },
];
