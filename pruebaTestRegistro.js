const webdriver = require('selenium-webdriver');
const assert = require("assert").strict;
const {Builder, By, Key, until} = webdriver;
const chrome = require('selenium-webdriver/chrome');
let options = new chrome.Options();
let driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function ejecutarPruebas() {
   describe('Pruebas de integracion', async function() {
    
      it('1- 	A intentar iniciar sesión con credenciales no válidas, el sistema lo notifica y no permite el acceso.',async function() {
         this.timeout(50000);

         await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
         
          var username = await driver.findElement(By.id('usuario'));
          var password = await driver.findElement(By.id('password'));
          var botonIniciarSesion = await driver.findElement(By.id('botonIniciarSesion'));
   
          await username.clear();
          await password.clear();
          await username.sendKeys('JuanPerez');
          await password.sendKeys('123456');
          botonIniciarSesion.click();

         await driver.sleep(1000);
      
          });

          it('2-Al intentar iniciar sesión con credenciales válidas, el sistema permite el acceso.',async function() {
            this.timeout(30000);
             await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
                      
               var username = await driver.findElement(By.id('usuario'));
               var password = await driver.findElement(By.id('password'));
               var botonIniciarSesion = await driver.findElement(By.id('botonIniciarSesion'));
                    
               await username.sendKeys('JuanPerez');
               await password.sendKeys('1234');
               botonIniciarSesion.click();

               await driver.sleep(1000);

               var validaCredenciales = await driver.findElement(By.xpath("//strong[contains( text (),'Credenciales no válidos')]"));
              
               assert.equal(await validaCredenciales.isDisplayed(),true);

            it('Al pulsar la pestaña Registro de Clientes se debe mostrar el formulario de Registro de Clientes.',async function() {
               this.timeout(30000);
               iniciarSesion();
               await driver.get('http://127.0.0.1:5500/registrodeClientes.html');
               
               var botonRegistro = await drive.findElement(By.xpath("//a[contains( text (), 'Registro)]"));
               var formularioRegistro = await driver.findElement(By.css("#contenedor-formulario-de-cleintes>form"));

               botonRegistro.click();
               var seEstaMostrado = await formularioRegistro.isDisplayed();
               assert.equal(seEstaMostrado,true);
               await drive.sleep(1000);
               
               });
               await quit();
            });
         });
}
ejecutarPruebas();
