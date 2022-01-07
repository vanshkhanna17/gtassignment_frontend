import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule 
  ],
  entryComponents: [DialogBoxComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
