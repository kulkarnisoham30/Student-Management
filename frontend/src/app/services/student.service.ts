import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl =
  'http://localhost:5001/students';

  constructor(
    private http: HttpClient
  ) {}

  getStudents() {
    return this.http.get(this.apiUrl);
  }

  getStudent(id: number) {
    return this.http.get(
      `${this.apiUrl}/${id}`
    );
  }

  addStudent(formData: FormData) {

    return this.http.post(
      this.apiUrl,
      formData
    );
  }

  updateStudent(id: number, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  deleteStudent(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
