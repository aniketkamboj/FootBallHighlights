
const puppeteer = require("puppeteer");
let {PythonShell} = require('python-shell')
let pyshell = new PythonShell('./test.py');

(async () => {
    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
      });
      
      // end the input stream and allow the process to exit
      pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
      });  
  //   const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const data = require("./demofile3.json");
  //   await page.goto("https://streamja.com/21rk6");
  const refinedData = []
  for (var x in data) {
    var res = data[x].split("##");
    // console.log(res[1])
    await page.goto(res[1]);
    const source = await page.evaluate((arr) => {
      // console.log("hi");
      // console.log(document.querySelector("source").src);
      return document.querySelector("source")!=null?document.querySelector("source").src:null;
    });
    // data[x] = source;
    // console.log(data[x]);
    const temp = {
        "url" : source,
        "channel" : res[0]
    }
    refinedData.push(temp)
  }
  const fs = require("fs");
  
  const jsonString = JSON.stringify(refinedData);
  fs.writeFile("./data.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  await browser.close();
})();

