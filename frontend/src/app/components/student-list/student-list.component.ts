import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any[] = [];
  filteredStudents: any[] = [];

  searchText: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {

    this.studentService
      .getStudents()
      .subscribe((data: any) => {

        this.students = data;
        this.filteredStudents = data;
      });
  }

  searchStudent() {

    this.filteredStudents =
      this.students.filter((student) =>

        student.name
          ?.toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )

        ||

        student.course
          ?.toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )

        ||

        student.email
          ?.toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )
      );

    this.currentPage = 1;
  }

  get paginatedStudents() {

    const start =
      (this.currentPage - 1)
      * this.itemsPerPage;

    return this.filteredStudents.slice(
      start,
      start + this.itemsPerPage
    );
  }

  nextPage() {

    const totalPages =
      Math.ceil(
        this.filteredStudents.length /
        this.itemsPerPage
      );

    if (this.currentPage < totalPages) {

      this.currentPage++;
    }
  }

  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;
    }
  }

  deleteStudent(id: number) {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this student?'
      );

    if (!confirmDelete) {
      return;
    }

    this.studentService
      .deleteStudent(id)
      .subscribe({

        next: () => {

          alert(
            'Student deleted successfully'
          );

          this.loadStudents();
        },

        error: () => {

          alert(
            'Failed to delete student'
          );
        }
      });
  }
}
