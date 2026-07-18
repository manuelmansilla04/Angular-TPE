import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-repo-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss']
})
export class RepoSearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();

  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value.query);
    }
  }

  get query() {
    return this.searchForm.get('query');
  }
}
