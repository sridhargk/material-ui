import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintManagementComponent } from './pages/complaint-management/complaint-management.component';

const routes: Routes = [
  { path: 'complaints', component: ComplaintManagementComponent },
  { path: '', redirectTo: '/complaints', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
