const webdriver = require("selenium-webdriver");
const assert = require("assert").strict;
const { Builder, By, Key, until } = webdriver;
const chrome = require("selenium-webdriver/chrome");
let options = new chrome.Options();
let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

async function iniciarSesion() {
  await driver.get("http://127.0.0.1:5500/registrodeClientes.html");

  var username = await driver.findElement(By.id("usuario"));
  var password = await driver.findElement(By.id("password"));
  var botonIniciarSesion = await driver.findElement(
    By.id("botonIniciarSesion"));

  await username.sendKeys("JuanPerez");
  await password.sendKeys("123456");
  await botonIniciarSesion.click();

  await driver.sleep(1000);
}

async function ejecutarPruebas() {
  describe("Pruebas de integracion", async function () {
     after(async function (){
        await driver.quit();
     });
    it("1-A intentar iniciar sesión con credenciales no válidas, el sistema lo notifica y no permite el acceso.", async function () {
      this.timeout(50000);

      await driver.get("http://127.0.0.1:5500/registrodeClientes.html");

      var username = await driver.findElement(By.id("usuario"));
      var password = await driver.findElement(By.id("password"));
      var botonIniciarSesion = await driver.findElement(By.id("botonIniciarSesion"));

      await username.clear();
      await password.clear();
      await username.sendKeys("JuanPerez");
      await password.sendKeys("1234");
      await botonIniciarSesion.click();
      await driver.sleep(1000);

      var validaCredenciales = await driver.findElement(
        By.xpath("//strong[contains( text (),'Credenciales no válidos')]"));
      assert.equal(await validaCredenciales.isDisplayed(), true);
    });

    it("2-Al intentar iniciar sesión con credenciales válidas, el sistema permite el acceso.", async function () {
      this.timeout(30000);

      iniciarSesion();
      await driver.sleep(3000);

      var botonRegistro = await driver.findElement( By.xpath("//a[contains( text(), 'Registro')]"));

      assert.equal(await botonRegistro.isDisplayed(), true);  
    });
  
  it("3-Al pulsar la pestaña Registro de Clientes se debe mostrar el formulario de Registro de Clientes.", async function () {
    this.timeout(30000);

    iniciarSesion();
    await driver.sleep(3000);

    var botonRegistro = await driver.findElement(By.xpath("//a[contains( text(), 'Registro')]"));
    
    await botonRegistro.click();
    await driver.sleep(1000);
    var formularioRegistro = await driver.findElement(By.css("#contenedor-formulario-de-clientes>form"));

    var validaCredenciales = await formularioRegistro.isDisplayed();
    assert.equal(await validaCredenciales, true);
    await driver.sleep(3000);
   });

   it("4-Al crear un nuevo cliente (o sea, no existente), el mismo se puede crear correctamente y los campos se muestran vacíos.", async function () {
    this.timeout(30000);

    iniciarSesion();
    await driver.sleep(3000);

    var botonRegistro = await driver.findElement(By.xpath("//a[contains( text(), 'Registro')]"));

    botonRegistro.click();

    await driver.sleep(3000);

    var cedula = await driver.findElement(By.id('txtCedula'));
    var nombre = await driver.findElement(By.id('txtNombre'));
    var apellido = await driver.findElement(By.id('txtApellido'));
    var direccion = await driver.findElement(By.id('txtDireccion'));

    await cedula.sendKeys("1230");
    await nombre.sendKeys("Missael");
    await apellido.sendKeys("Caceres");
    await direccion.sendKeys("Direccion Correcta");

    var botonAgrega = await driver.findElement(By.id('agrega'));

    await driver.sleep(3000);
    var botonRegistro = await driver.findElement(By.xpath("//a[contains( text(), 'Registro')]"));
    await botonAgrega.click();

    await driver.sleep(3000);

    var campoCedulaVacio = await cedula.getAttribute("value");
    var campoNombreVacio = await nombre.getAttribute("value");
    var campoApellidoVacio = await apellido.getAttribute("value");
    var campoDireccionVacio = await direccion.getAttribute("value");

    assert.equal(campoCedulaVacio, '');
    assert.equal(campoNombreVacio, '');
    assert.equal(campoApellidoVacio, '');
    assert.equal(campoDireccionVacio,'');

    var botonListado = await driver.findElement(By.xpath("//a[contains( text(), 'Listado')]"));
    await botonListado.click();

    await driver.sleep(3000);
  });

  it("5-Al agregar un nuevo cliente (presionando el botón Agregar), se debe mostrar el listado de clientes.", async function () {
    this.timeout(30000);

   // await driver.get("http://127.0.0.1:5500/registrodeClientes.html");

    iniciarSesion();
    await driver.sleep(3000);
    
    var ventanaDeRegistro = await driver.findElement(By.xpath("//a[contains( text(), 'Registro')]"));
    ventanaDeRegistro.click();

    var campoCedula = await driver.findElement(By.id('txtCedula'));
    var campoNombre = await driver.findElement(By.id('txtNombre'));
    var campoApellido = await driver.findElement(By.id('txtApellido'));
    var campoDireccion = await driver.findElement(By.id('txtDireccion'));

    await campoCedula.sendKeys("1234")
    await campoNombre.sendKeys("missael");
    await campoApellido.sendKeys("Caceres");
    await campoDireccion.sendKeys("Santiago");

    var botonAgrega = await driver.findElement(By.id('agrega'));
    botonAgrega.click();

    await driver.sleep(3000);
    
    var listadoClientes = await driver.findElement(By.xpath("//th[contains( text(), 'Datos')]"));
    await driver.sleep(3000);
    listadoClientes.click();
  });

  it("6-Al intentar crear un cliente existente (o sea, el número de cedula ya estaba registrado), el sistema no lo permite y muestra un mensaje notificando que el cliente ya existe.", async function () {
    this.timeout(30000);

    await driver.get("http://127.0.0.1:5500/registrodeClientes.html");

    iniciarSesion();

    await driver.sleep(3000);

    var botonRegistrar = await driver.findElement(By.xpath("//a[contains( text(), 'Registro')]"));
    botonRegistrar.click();

    await driver.sleep(3000);

    var campoCedulaUsado = await driver.findElement(By.id('txtCedula'));
    var campoNombreUsado = await driver.findElement(By.id('txtNombre'));
    var campoApellidoUsado = await driver.findElement(By.id('txtApellido'));
    var campoDireccionUsado = await driver.findElement(By.id('txtDireccion'));

    await campoCedulaUsado.sendKeys("1234");
    await campoNombreUsado.sendKeys("Missael");
    await campoApellidoUsado.sendKeys("Villar");
    await campoDireccionUsado.sendKeys("Santiago");

    await driver.sleep(3000);

    var botonAñadir2 = await driver.findElement(By.id('agrega'))
    botonAñadir2.click();

    botonRegistrar.click();

    await campoCedulaUsado.sendKeys("1234");
    await campoNombreUsado.sendKeys("Missael");
    await campoApellidoUsado.sendKeys("Villar");
    await campoDireccionUsado.sendKeys("Santiago"); 

    await driver.sleep(3000);

    botonAñadir = await driver.findElement(By.id('agrega'));

   var listadoClientes = await driver.findElement(By.css('div.alert.alert-danger.fade.show'));
   //await listadoClientes.click();

    await driver.sleep(3000)
  });

  it("7.	Al pulsar la pestaña Listado de Clientes se debe mostrar la tabla de clientes..", async function () {
    this.timeout(30000);

    await driver.get("http://127.0.0.1:5500/registrodeClientes.html");
    iniciarSesion();
    
    await driver.sleep(3000);

    var botonRegistrar = await driver.findElement(By.xpath("//a[contains( text(), 'Registro')]"));
    botonRegistrar.click();

    await driver.sleep(3000);

    var botonListado = await driver.findElement(By.xpath("//a[contains( text(), 'Listado')]"));
    botonListado.click();

    await driver.sleep(3000);

    var listadoClientes =await driver.findElement(By.xpath("//th[contains( text(), 'Datos')]"));
   // listadoClientes.click();
    
    await driver.sleep(3000);
    


  });



 

   });
}
ejecutarPruebas();