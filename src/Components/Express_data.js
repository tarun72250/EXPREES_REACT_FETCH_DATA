// var exp = require('express');
// var mysql = require('mysql2');
// var cors = require('cors');

// var app = exp();
// app.use(cors());
// app.use(exp.json())


// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root@321",
//     database: "dac"
// })

// con.connect(function (err) {
//     if (!err)
//         console.log('db connected');
//     else
//         console.log('db connection failed');
// })

// app.get('/product', function (req, res) {
//     con.query('select * from employee ', function (err, result) {
//         if (!err) 
//         {
//             // res.write("<h1>Using Product API Fetch Employee Data From MySQL db</h1>");
//             // res.write("<table border=1>");
//             // res.write("<th>Employee no</th>");
//             // res.write("<th>Employee name</th>");
//             // res.write("<th>Employee job</th>");
//             // res.write("<th>Employee deptno</th>");

//             // result.forEach(function (v) {
//             //     res.write("<tr>");

//             //     res.write("<td>" + v.EMPNO + "</td>");
//             //     res.write("<td>" + v.ENAME + "</td>");
//             //     res.write("<td>" + v.JOB + "</td>");
//             //     res.write("<td>" + v.DEPTNO + "</td>");
//             //     res.write("</tr>");
//             // });
//             // res.write("</table>");
//             res.send(JSON.stringify(result));
//             res.end();
//         }
//         else {
//             console.log('Error fetching data:', err);
//             res.status(500).send('Error fetching data');
//         }
//     })
// });

// app.all('*', function (req, res) {
//     res.send("URL incorrect")
// })


// app.listen(8080, function () {
//     console.log("exp server started at 8080");
// })

const express = require('express');
const mysql = require('mysql2/promise'); // Using promises for cleaner async/await

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root@321",
  database: "dac"
});

// Connect to database (consider using a separate connection function)
(async () => {
  try {
    await pool.getConnection();
    console.log('db connected');
  } catch (err) {
    console.error('db connection failed:', err);
    process.exit(1); // Exit process on connection failure
  }
})();

app.get('/product', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee'); // Use backticks for table and column names
    res.json(rows); // Send data as JSON response
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data'); // Send error response
  }
});

app.all('*', function (req, res) {
  res.send("URL incorrect");
})

app.listen(8080, function () {
  console.log("exp server started at 8080");
})

  
