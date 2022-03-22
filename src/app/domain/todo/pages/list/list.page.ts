import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KeyLists } from 'app/domain/todo/services/tasks/task.service.models';
import { TasksService } from 'app/domain/todo/services/tasks/tasks.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FirebaseService } from './../../../../shared/firebase';
import { Task } from './../../services/tasks/task.service.models';

@UntilDestroy()
@Component({
  selector: 'aopa-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  currentList: KeyLists;

  constructor(
    private firebase: FirebaseService,
    public tasksService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.firebase.hasLogin();
    this.firebase.user$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((details) => {
        const darkTheme = details.user.darkThemePreference;
        this.toggleDarkTheme(darkTheme);
      });

    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => (this.currentList = params.mode));

    this.tasksService.setTasks(this.currentList);
  }

  get listTasks$(): Observable<Task[]> {
    return this.tasksService.tasks$;
  }

  addTask(taskDescription: string) {
    this.tasksService.addTask(taskDescription);
    this.tasksService.getPercentageTasks();
  }

  toggleDarkTheme(darkTheme: boolean): void {
    const $html = document.documentElement;
    if (darkTheme) {
      $html.classList.add('dark-mode');
      return;
    }
    $html.classList.remove('dark-mode');
  }
}
