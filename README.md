<h1>Student Management System</h1>


<h2><b>Project Overview:</b></h2>
The Student Management System is a full-stack web application developed using Angular, Node.js, Express.js, and PostgreSQL. The application allows users to manage student records efficiently, including adding, updating, viewing, and deleting student information along with student photo uploads.


<h2>Technologies Used:</h2>
<h3>Frontend</h3>
Angular 16

<h3>Backend</h3>
Node.js <br>
Express.js<br>
Multer (File Upload)<br>
CORS<br>
dotenv<br>

<h3>Database</h3>
PostgreSQL<br>
Neon PostgreSQL (Cloud Database)

<h3>Deployment</h3>
Frontend: Netlify<br>
Backend: Render<br>
Database: Neon<br>

<h3>Version Control</h3>
Git<br>
GitHub


<h2>Setup Instructions:</h2>
<h3>Clone Repository</h3>
git clone https://github.com/kulkarnisoham30/Student-Management.git

cd Student-Management

<h3>Backend Setup</h3>
cd backend

npm install


<h3>Start Backend:</h3>

npm run dev

<h3>Backend URL:</h3>

http://localhost:5001
<h3>Frontend Setup</h3>
cd frontend

npm install

<h3>Start Angular Application:</h3>

ng serve

<h3>Frontend URL:</h3>

http://localhost:4200

<h2>API Endpoints:</h2>
<h3>Get All Students</h3>
GET /students
<h3>Get Student By ID</h3>
GET /students/:id
<h3>Add Student</h3>
POST /students
<h3>Update Student</h3>
PUT /students/:id
<h3>Delete Student</h3>
DELETE /students/:id

<h2>Project Structure:</h2>
StudentManagementSystem <br>

├── backend<br>
│   ├── config<br>
│   ├── controllers<br>
│   ├── routes<br>
│   ├── uploads<br>
│   └── server.js<br>
│<br><br>
├── frontend<br>
│   ├── src<br>
│   ├── app<br>
│   ├── components<br>
│   └── services<br>
│<br><br>
└── README.md<br>
<h2>Links:</h2>

<h3>GitHub:</h3>
https://github.com/kulkarnisoham30

<h3>Link:</h3>
https://verdant-cranachan-4904e0.netlify.app/
