const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.all("/api", (req, res2) => {
  res2.header('Access-Control-Allow-Origin', '*');
  res2.setHeader("Content-Type", "application/json");
  let finalData = null;
  const puppeteer = require("puppeteer");
  let { PythonShell } = require("python-shell");
  let pyshell = new PythonShell("./server/test.py");

  (async () => {
    pyshell.on("message", function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log("The exit code was: " + code);
      console.log("The exit signal was: " + signal);
      console.log("finished");
    });
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const data = require("./demofile3.json");
    
    const refinedData = [];
    for (var x in data) {
      var res = data[x].split("##");
      // console.log(res[1])
      await page.goto(res[1]);
      const source = await page.evaluate((arr) => {
        // console.log("hi");
        // console.log(document.querySelector("source").src);
        return document.querySelector("source") != null
          ? document.querySelector("source").src
          : null;
      });
      // data[x] = source;
      // console.log(data[x]);
      const temp = {
        url: source,
        channel: res[0],
      };
      refinedData.push(temp);
    }
    const fs = require("fs");

    const jsonString = JSON.stringify(refinedData);
    finalData = jsonString;
    fs.writeFile("./server/data.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
    res2.end(finalData);
    await browser.close();
  })();
});

// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//   app.get('/', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })

// }

// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }


// app.use(express.static(path.join(__dirname, './client/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/build'))
// })
app.listen(port, () =>
  console.log(` app listening on port 
${port}!`)
);
