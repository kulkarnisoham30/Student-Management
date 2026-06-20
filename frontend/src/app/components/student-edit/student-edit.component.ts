import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  student: any = {};

  id: number = 0;

  selectedFile: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.studentService
      .getStudent(this.id)
      .subscribe((data: any) => {

        this.student = data;
      });
  }

  onFileSelected(event: any) {

    this.selectedFile =
      event.target.files[0];
  }

  updateStudent() {

    const formData =
      new FormData();

    formData.append(
      'name',
      this.student.name
    );

    formData.append(
      'course',
      this.student.course
    );

    formData.append(
      'year',
      this.student.year
    );

    formData.append(
      'dob',
      this.student.dob
    );

    formData.append(
      'email',
      this.student.email
    );

    formData.append(
      'mobile',
      this.student.mobile
    );

    formData.append(
      'gender',
      this.student.gender
    );

    formData.append(
      'address',
      this.student.address
    );

    formData.append(
      'photo',
      this.student.photo || ''
    );

    if (this.selectedFile) {

      formData.append(
        'photo',
        this.selectedFile
      );
    }

    this.studentService
      .updateStudent(
        this.id,
        formData
      )
      .subscribe({

        next: () => {

          alert(
            'Student Updated Successfully'
          );

          this.router.navigate(['/']);
        },

        error: (err) => {

          alert(
            err.error?.message ||
            'Update Failed'
          );
        }
      });
  }
}
