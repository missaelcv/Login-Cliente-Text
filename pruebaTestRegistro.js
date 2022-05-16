
const webdriver = require('selenium-webdriver');
const assert = require("assert").strict;
const {Builder, By, Key, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function iniciarSesion() {
   describe('Pruebas de integracion', async function() {
    
      it('1- Al Intentar iniciar sesion con credenciales no validas.',async function() {
         this.timeout(30000);
         await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
         
          var username = await driver.findElement(By.id('username'));
          var password = await driver.findElement(By.password('password'));
          var loginbutton = await driver.findElement(By.id('loginbutton'));
          var validaCredenciales = await driver.findElement(By.xpath("//strong[contains( text (),'Credenciales no Validos')]"));
 
          await username.clear();
          await password.clear();
 
          await username.sendKey('JuanPerez');
          await password.sendKey('123456');
 
          loginbutton.click();

         await driver.sleep(1000);
         console.log(validaCredenciales);
       

          });

          it('2-Al Intentar iniciar sesion con credenciales no validas.',async function() {
            this.timeout(3000);
             await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
              iniciarSesion();
             });
                       
               var username = await driver.findElement(By.id('username'));
               var password = await driver.findElement(By.password('password'));
               var loginbutton = await driver.findElement(By.id('loginbutton'));
               var validaCredenciales = await driver.findElement(By.xpath("//strong[contains( text (),'Credenciales no Validos')]"));

               
               await username.sendKey('JuanPerez');
               await password.sendKey('1234');
               loginbutton.click();

               await driver.sleep(1000);

              console.log(validaCredenciales);
                     
       
});
}
iniciarSesion();