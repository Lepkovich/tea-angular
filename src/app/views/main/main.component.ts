import { Component, TemplateRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>(); // Subject для отмены подписок
  private observable: Observable<string>;
  private contentTemplate!: TemplateRef<any>;

  @ViewChild('content', { static: true }) set content(content: TemplateRef<any>) {
    this.contentTemplate = content;
  }

  constructor(private modalService: NgbModal) {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
        observer.complete(); // Завершаем Observable после отправки события
      }, 10000); // 10 секунд
    });
  }

  ngOnInit() {
    this.observable
      .pipe(takeUntil(this.destroy$)) // Отписываемся при сигнале от destroy$
      .subscribe(() => {
        this.openSm(this.contentTemplate);
      });
  }

  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'sm' });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
