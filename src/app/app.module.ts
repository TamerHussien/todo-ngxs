import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './containers';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodoState } from './store/todo.state';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { environment } from '../environments/environment';
const routes: Routes = [
    { path: '', component: TodoListComponent, pathMatch: 'full' },
    { path: ':filter', component: TodoListComponent }
];

@NgModule({
    declarations: [AppComponent, ...fromComponents.components, ...fromContainers.containers],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        NgxsModule.forRoot([TodoState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: false
        }),
        NgxsEmitPluginModule.forRoot(),
        NgxsDispatchPluginModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
