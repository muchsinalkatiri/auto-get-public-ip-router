const pptr = require('puppeteer');
var fs = require('fs');


(async () => {
  const date = new Date();
  const browser = await pptr.launch({
    headless: false,
    // slowMo : 100,
    // devtools: true
  });
  const page = await browser.newPage(); //membuka tab baru di browser
  do {
    await page.goto('http://192.168.2.1/', { waitUntil: 'networkidle2' }); //membuka url
    await page.type('#Frm_Username', 'admin', { delay: 50 });
    await page.type('#Frm_Password', 'Telkomdso123', { delay: 50 });
    await page.click('#LoginId');
    await page.waitForTimeout(1000); //delay 2 detik
    await page.click('#internet');
    await page.waitForTimeout(1000); //delay 2 detik
    await page.click('#internetStatus');
    await page.waitForTimeout(1000); //delay 2 detik
    await page.click('#ethWanStatus');
    await page.waitForTimeout(1000); //delay 2 detik
    const ip = await page.$eval('span[id="cIPAddress:2"][class="w250"]', el => el.textContent);
    const split = ip.split(".");
    var ipDepan = split[0];
    console.log(ip);
    if (ipDepan != '36') {
        await page.waitForTimeout(1000); //delay 2 detik
        await page.click('#mgrAndDiag');
        await page.waitForTimeout(1000); //delay 2 detik
        await page.click('#devMgr');
        await page.waitForTimeout(1000); //delay 2 detik
        await page.click('#Btn_restart');
        await page.waitForTimeout(1000); //delay 2 detik
        console.log('restarting');
        await page.click('#confirmOK'); await page.waitForTimeout(150000); //delay 2 detik
    } else {
      console.log('berhasil IP public 36');
    }
} while (ipDepan != '36')
await browser.close();
})();




// await page.screenshot({path:'web.png'}); //screenshoot browser
// await page.reload(); //reload browser

// await page.goBack();//untuk kembali ke halaman sebelumnmya