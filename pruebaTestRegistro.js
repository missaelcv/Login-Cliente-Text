
const webdriver = require('selenium-webdriver');
const assert = require("assert").strict;
const {Builder, By, Key, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function prueba() {
   describe('Pruebas de integracion', async function() {
      it('debe actualizar el resultado al presionar el boton de Registro', async function(){
        let tiempo = 10000;

        async function iniciarSesion() {

         await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
         
          //Opcion 2 
          var username = await driver.findElement(By.id('username'));
          var password = await driver.findElement(By.password('password'));
          var loginbutton = await driver.findElement(By.id('loginbutton'));
 
          await username.clear();
          await password.clear();
 
          await username.sendKey('JuanPerez');
          await password.sendKey('123456');
 
          loginbutton.click();

         await driver.sleep(tiempo);
         await driver.quit();
          }
      });
   });
}

prueba();