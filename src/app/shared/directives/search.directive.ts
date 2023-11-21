import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {HeaderComponent} from "../layout/header/header.component";

@Directive({
  selector: '[teaSearch]'
})


export class SearchDirective implements OnInit{

  searchQuery: string = ''

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private headerComponent: HeaderComponent
  ) {}


  ngOnInit() {
    // this.headerComponent.getSearchQueryObservable()
    //   .subscribe((searchQuery: string) => {
    //     // Handle the search query change in your directive
    //     console.log('Search query changed in directive:', searchQuery);
    //   });
    // console.log(this.headerComponent.onSearchChange)
      // .subscribe((query:string) => {
      //   console.log('привет из директивы')
      // this.searchQuery = query.toLowerCase();
      // this.updateView();
    // });
}


  @Input()
  set teaSearch(description: string) {
    if(description.toLowerCase().includes('')) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }


  // Метод для обновления представления
  // private updateView() {
  //   // Получаем текст из description (который теперь должен быть передан через атрибут директивы)
  //
  //   const description = this.viewContainer.get(0)?.nativeElement!.textContent.trim();
  //
  //   // Сравниваем строки в одинаковом регистре
  //   if (description.toLowerCase().includes(this.searchQuery.toLowerCase())) {
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   } else {
  //     this.viewContainer.clear();
  //   }
}
