const puppeteer = require('puppeteer')
const expect = require('chai').expect
const assert = require('assert')

const config = require('./lib/config')
const helpers = require('./lib/helpers')
const utils = require('./lib/utils')
const objects = require('./lib/objects')

describe('BOT: Automatizador de Productos para La Pulga.com.do', () =>{
let browser
let page

before(async function () {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: config.slowMo,
        devtools: config.devtools,
        timeout: config.launchTimeout
    })

    page = await browser.newPage()
    await page.setDefaultNavigationTimeout(config.waitingTimeout)
    await page.setViewport({
        width: config.viewportWidth,
        height: config.viewportHeight
    })


})

  // after(async function (){
     //   await browser.close()
   // })

describe('Primera Fase',() =>{
    it('Entrando en la pagina web', async () =>{

        await helpers.loadUrl(page,config.baseUrl)
        await helpers.shouldExist(page,'.navbar-brand')

    })

    it('Loguearse en La Pulga', async () =>{
       await helpers.shouldExist(page,'ul[class="nav navbar-nav navbar-right"]')
       await helpers.click(page,'a[href="/login"]')
      
    })
    it('Escribiendo Creedenciales e iniciando Sesion', async () =>{
        await helpers.shouldExist(page,'input[id="login"]')
        await helpers.typeText(page,objects.EMAIL_FORM,'input[id="login"]')
        await helpers.shouldExist(page,'#password')
        await helpers.typeText(page,objects.PASSWORD_FORM,'input[name="password"]')
        await helpers.shouldExist(page,'#Enviar')
        await helpers.click(page,'button[name="Enviar"]')
    })

    describe('Segunda Fase: Publicando Un Producto' , () => {
        it('Click Boton Publicar', async () => {
            await helpers.shouldExist(page,'.btnpub')
            await helpers.click(page,'a[href="/publicar"]')
        })

        it('Seleccionando Categoria', async () =>{
            await helpers.shouldExist(page,'.panel-body')
            await helpers.click(page,'#categoria')
            await page.select('#categoria', '10-144')
        })
        
        it('Seleccionando Marca', async () =>{
            await helpers.shouldExist(page,'#marca')
            await page.select('#marca','10')
            
        })

        it('Seleccionando Modelo', async () =>{
          await helpers.shouldExist(page,'#modelo')
          await page.select('#modelo','10')
            
        })
        
        it('Seleccionando Año', async () =>{
            await helpers.shouldExist(page,'#anio')
            await page.select('#anio','2013')
              
          })

          it('Seleccionando Combustible', async () =>{
            await helpers.shouldExist(page,'#combustible')
            await page.select('#combustible','4')
              
          })

          it('Seleccionando Tipo', async () =>{
            await helpers.shouldExist(page,'label[for="venta"]')
            await helpers.click(page,'#venta')
              
          })
          it('Seleccionando Condicion', async () =>{
            await helpers.shouldExist(page,'label[for="nuevo"]')
            await helpers.click(page,'#nuevo')
              
          })

          it('Escribiendo Titulo', async () =>{
              await helpers.shouldExist(page,'#articulo')
              await helpers.typeText(page,' OFERTA LIGERAMENTE NEGOCIABLE', '#articulo')
          })

          it('Escribiendo Precio', async () =>{
              await helpers.shouldExist(page,'#precio')
              await helpers.typeText(page,'20000','#precio')
          })
          it('Escogiendo Moneda', async () =>{
            await helpers.shouldExist(page,'label[for="dolar"]')
            await helpers.click(page,'#dolar')
        })

        it('Escribiendo Descripcion', async () =>{
            await helpers.shouldExist(page,'textarea[id="descripcion"]')
            await helpers.typeText(page,' *FAVOR ESCRÍBAME SI ESTÁ INTERESADO* Trataré de ayudarle lo mejor posible  Este vehículo está en óptimas condiciones Motor, Transmisión, y Carrocería en PERFECTAS condiciones. Precio: US$20,000 -Ligeramente Negociable -Traspaso Incluido  -Financiamiento Disponible   Mas información:  Abraham Mella 829-341-7006 Telefono y Whatsapp','#descripcion')
        } )

        it('Subiendo Imagenes', async () =>{
           

            
            const fileSelector = '[type=file]';
            const element = await page.waitForSelector(fileSelector);
            const files = ['./test_LaPulga/imgs/1.jpg','./test_LaPulga/imgs/2.jpg','./test_LaPulga/imgs/3.jpg','./test_LaPulga/imgs/4.jpg','./test_LaPulga/imgs/5.jpg'];
            for (let index = 0; index < files.length; index++) {
            const filePath = files[index];
            await element.uploadFile(filePath);
            }

            await page.waitFor(4000)
          
        })

        it('Presionando Boton Publicar', async () =>{
           
            //page.on('dialog', async dialog => {
              //  await dialog.accept();
           // });
            await helpers.shouldExist(page,'input[name="Publicar"]')
            await helpers.click(page,'#Publicar')
            
           
            })

            it('ScreenShot de la Publicacion', async() =>{
                await page.screenshot({path:'./test_LaPulga/result.png', type:'png',fullPage: true});
            })
        })

        
        

    })


})




