import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent {

  selectedFile: any;

  student: any = {
    name: '',
    course: '',
    year: '',
    dob: '',
    email: '',
    mobile: '',
    gender: '',
    address: ''
  };

  constructor(
    private studentService: StudentService
  ) {}

  onFileSelected(event: any) {

    this.selectedFile =
      event.target.files[0];
  }

  saveStudent() {

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
  
    if (this.selectedFile) {
  
      formData.append(
        'photo',
        this.selectedFile
      );
    }
  
    this.studentService
      .addStudent(formData)
      .subscribe({
  
        next: () => {
  
          alert(
            'Student Added Successfully'
          );
  
          window.location.reload();
        },
  
        error: (err) => {
  
          alert(
            err.error.message
          );
        }
      });
  }
}
