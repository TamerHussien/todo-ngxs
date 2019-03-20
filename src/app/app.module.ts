import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import * as fromComponents from './components';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TodoState } from './store/todo.state';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

const routes: Routes = [
    { path: '', component: TodoListComponent, pathMatch: 'full' },
    { path: ':filter', component: TodoListComponent }
];

@NgModule({
    declarations: [AppComponent, ...fromComponents.components],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        NgxsModule.forRoot([TodoState]),
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
