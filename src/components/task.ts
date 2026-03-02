import { Component, input, output } from '@angular/core';
import { TaskData } from '../app/app'

@Component({
  selector: 'task',
  template: `
    <div class="task">
      @if (task().important) {
        <div class="task-important">!</div>
      }
      <div class="task-content">
        <p class="task-text">
          {{ task().task }}
        </p>
        <div class="task-actions">
          <button class="task-delete" (click)="onDelete()">X</button>
          @if (!completed()) {
            <button class="task-complete" (click)="onComplete()">✔</button>
          }
        </div>
      </div>

    </div>
  `,
  styles: `
    .task {
      display: flex;
      align-items: stretch;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background-color: rgba(255, 255, 255, 0.05);
      min-height: 50px;
      overflow: hidden;
    }

    .task-important {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: orangered;
      width: 20px;
      font-size: 30px;
    }

    .task-content {
      display: flex;
      height: 100%;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      flex: 1;
    }

    .task-text {
      margin: 0;
      white-space: normal;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    .task-actions {
      display: flex;
      flex-direction: row;
      margin-left: auto;
      gap: 3px;
    }

    button {
      background: none;
      border: none;
      border-radius: 5px;
      font-size: 20px;
      color: white;
      width: 30px;
      aspect-ratio: 1;
      cursor: pointer;
      transition: all 0.1s;
    }

    button.task-complete:hover {
      box-shadow: 
        0 0 5px rgba(46, 139, 87, 0.5),
        0 0 10px rgba(46, 139, 87, 0.5),
        0 0 20px rgba(46, 139, 87, 0.5);
    }

    button.task-delete:hover {
      box-shadow: 
        0 0 5px rgba(205, 92, 92, 0.5),
        0 0 10px rgba(205, 92, 92, 0.5),
        0 0 20px rgba(205, 92, 92, 0.5);
    }

    button.task-delete {
      background-color: indianred;
      color: #f3d6d6;
    }

    button.task-complete {
      background-color: seagreen;
      color: #cbe2d5;
    }
  `
})

export class Task {
  task = input.required<TaskData>();
  completed = input(false);

  delete = output<number>();
  complete = output<number>();

  onDelete() {
    this.delete.emit(this.task().id);
  }

  onComplete() {
    this.complete.emit(this.task().id);
  }
}
