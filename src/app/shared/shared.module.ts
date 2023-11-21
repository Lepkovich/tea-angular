import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {SearchDirective} from "./directives/search.directive";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductCardComponent,
    SearchDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    SearchDirective,
  ]
})
export class SharedModule {
}
