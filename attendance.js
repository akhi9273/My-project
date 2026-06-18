let total = 0;
let present = 0;
let absent = 0;
let students = [];

function showPage(page) {
  let content = document.getElementById("content");

  if (page === "dashboard") {
    content.innerHTML = `
      <h1>Dashboard</h1>
      <p>Total Students: ${total}</p>
      <p>Present: ${present}</p>
      <p>Absent: ${absent}</p>
    `;
  }

  else if (page === "attendance") {
    content.innerHTML = `
      <h1>Attendance</h1>

      <input id="name" placeholder="Student Name">

      <select id="status">
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onclick="addStudent()">Add</button>
    `;
  }

  else if (page === "students") {
    let list = "<h1>Students</h1>";

    students.forEach(student => {
      list += `<p>${student.name} - ${student.status}</p>`;
    });

    content.innerHTML = list;
  }

  else if (page === "reports") {
    let percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2);

    content.innerHTML = `
      <h1>Reports</h1>
      <p>Attendance Percentage: ${percentage}%</p>
    `;
  }
}

function addStudent() {
  let name = document.getElementById("name").value;
  let status = document.getElementById("status").value;

  if (name === "") {
    alert("Please enter student name");
    return;
  }

  students.push({ name, status });
  total++;

  if (status === "Present") {
    present++;
  } else {
    absent++;
  }

  alert("Student Added Successfully!");
}

showPage("dashboard");