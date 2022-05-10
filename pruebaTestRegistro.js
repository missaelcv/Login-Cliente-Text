
const webdriver = require('selenium-webdriver');
const assert = require("assert").strict;
const {Builder, By, Key, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function prueba() {
   describe('Pruebas de integracion', async function() {
      it('debe actualizar el resultado al presionar el boton sumar', async function(){
         this.timeout(10000);
         await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
               
         await driver.sleep(1000);
         await driver.quit();
      });
   });
}

prueba();