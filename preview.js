let { chromium, devices, defineConfig } = require('@playwright/test');


async function preview(query){
    let browser = await chromium.launch({headless: true});
    let page = await browser.newPage();
    await page.goto("https://www.google.com/search?q="+query.split(" ").join("+"));
    let temp = await page.content();
    return temp;
  
  }
  
  
  
  process.on("message", async(message) => {
    let query = await preview(message.query);
    // send the results back to the parent process
    process.send(query);
    // kill the child process
    process.exit();
  })
  