import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormInputWidgetModule } from 'app/widget/components/form-input/form-input.widget.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { LogInPage } from './pages/log-in/log-in.page';
import { WelcomePage } from './pages/welcome/welcome.page';

@NgModule({
  declarations: [AuthComponent, AuthCardComponent, LogInPage, WelcomePage],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    FormInputWidgetModule,
  ],
  providers: [],
})
export class AuthDomainModule {}
