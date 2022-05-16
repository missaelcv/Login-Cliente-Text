const webdriver = require('selenium-webdriver');
const assert = require("assert").strict;
const {Builder, By, Key, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function iniciarSesion() {
   describe('Pruebas de integracion', async function() {
    
      // it('1- 	A intentar iniciar sesión con credenciales no válidas, el sistema lo notifica y no permite el acceso.',async function() {
      //    this.timeout(30000);
      //    iniciarSesion();
      //    await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
         
          var username = await driver.findElement(By.id('username'));
          var password = await driver.findElement(By.password('password'));
          var bottonLogin = await driver.findElement(By.id('buttonLogin'));
   
          await username.clear();
          await password.clear();
          await username.sendKey('JuanPerez');
          await password.sendKey('123456');
 
          //buttonLogin.click();

         await driver.sleep(1000);
      
          });

          it('2-Al intentar iniciar sesión con credenciales válidas, el sistema permite el acceso.',async function() {
            this.timeout(3000);
             await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
              iniciarSesion();
             });
                       
               var username = await driver.findElement(By.id('username'));
               var password = await driver.findElement(By.password('password'));
               var buttonLogin = await driver.findElement(By.id('buttonLogin'));
               var validaCredenciales = await driver.findElement(By.xpath("//strong[contains( text (),'Credenciales no Validos')]"));
               
               await username.sendKey('JuanPerez');
               await password.sendKey('1234');
               buttonLogin.click();

               await driver.sleep(1000);

              console.log(validaCredenciales);


            // it('3-Al Intentar iniciar sesion con credenciales no validas.',async function() {
            //    this.timeout(3000);
            //    await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
            //    iniciarSesion();
            //    });
            //    await quit();
}
