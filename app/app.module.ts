import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [BrowserModule,FormsModule, HttpModule,
        JsonpModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        AppService
    ]
})
export class AppModule { }
