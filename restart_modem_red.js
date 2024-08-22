const pptr = require('puppeteer');
var fs = require('fs');


(async ()=>{
    const date = new Date();
    const browser = await pptr.launch({
        headless: false,
        // slowMo : 100,
        devtools: true
    });
    const page = await browser.newPage(); //membuka tab baru di browser
    do{
      await page.goto('http://192.168.100.1/', {waitUntil:'networkidle2'}); //membuka url

      await page.type('#txt_Username' , 'Admin', {delay: 50});
      await page.type('#txt_Password' , 'admin', {delay: 50});
      await page.click('#button');
      await page.waitForTimeout(2000); //delay 2 detik
      await page.click('div[class="tabBtnCenter"][name="maindiv_waninfo"]');
      await page.waitForTimeout(1000); //delay 2 detik
      await page.click('div[name="subdiv_waninfo"]');
      await page.waitForTimeout(3000); //delay 2 detik
      
      await page.waitForTimeout(2000); //delay 2 detik
      const elementHandle = await page.waitForSelector('#frameContent');
      const frame = await elementHandle.contentFrame();
      const text = await frame.$$eval('#record_0', rows => {
        return Array.from(rows, row => {
          const columns = row.querySelectorAll('td');
          return Array.from(columns, column => column.innerText);
        });
      });
      
      const split = text[0][2].split(".");
      var ipDepan = split[0];
      // var ipDepan = 37;
      console.log("["+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+"] : "+text[0][2]);

      if(ipDepan == 125 || ipDepan == 36 || ipDepan == 180){
        console.log('berhasil IP public');
        break;
      }else{
            await page.click('div[name="maindiv_reset"]');
        await page.waitForTimeout(2000); //delay 2 detik
        await page.click('div[name="subdiv_reset"]');
        await page.waitForTimeout(2000); //delay 2 detik
        
        await frame.evaluate( function(){
          setDisable('btnReboot', 1);
          
          var Form = new webSubmitForm();
          
          Form.setAction('set.cgi?x=' + 'InternetGatewayDevice.X_HW_DEBUG.SMP.DM.ResetBoard' +
          '&RequestFile=html/ssmp/reset/reset.asp');
          Form.addParameter('x.X_HW_Token', getValue('onttoken'));
          Form.submit();
        }); //restart modem
        console.log('restarting');
        await page.waitForTimeout(150000); //delay 2 detik
      console.log("restart");
      }

    }while(ipDepan != '36' || ipDepan != '180' || ipDepan != '125') // script baris ini sebenarnya salah, tapi karena ada break didalam if yang diatas jadi aman
    await browser.close();
  
    })();




// await page.screenshot({path:'web.png'}); //screenshoot browser
// await page.reload(); //reload browser

// await page.goBack();//untuk kembali ke halaman sebelumnmya