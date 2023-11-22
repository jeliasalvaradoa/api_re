const puppeteer = require('puppeteer');
require('dotenv').config();

const consultar = async (ced, config) => {
const browser = await puppeteer.launch({ headless: "new" })
const page = await browser.newPage();
const url = config.url;

await page.goto(`${url}${ced}`)

var datos = await page.evaluate((config) => {
   console.log('funciona >>>>',config)
   const selector = config.selector
    const contenedor = document.querySelector(selector)
   
    const selectorPart1 = config.selectorPart1
    const selectorPart2 = config.selectorPart2
    const selectorPart3 = config.selectorPart3 
    const selectorPart4 = config.selectorPart4
   
   const cedula = contenedor.querySelector(`${selectorPart1}(1)${selectorPart2}`)
   const nombre = contenedor.querySelector(`${selectorPart1}(2)${selectorPart2}${selectorPart3}`) ?? ''
   const estado = contenedor.querySelector(`${selectorPart1}(3)${selectorPart2}`) ?? ''
   const municipio = contenedor.querySelector(`${selectorPart1}(4)${selectorPart2}`) ?? ''
   const parroquia = contenedor.querySelector(`${selectorPart1}(5)${selectorPart2}`) ?? ''
   const centro = contenedor.querySelector(`${selectorPart1}(6)${selectorPart2}${selectorPart4}`) ?? ''
    if (nombre.innerHTML) {return {
   cedula: cedula.innerHTML.replace(/[^0-9]+/g,""),
   nombre: nombre.innerHTML ?? 'No encontrado',
   estado: estado.innerHTML ?? 'No encontrado',
   municipio: municipio.innerHTML ?? 'No encontrado',
   parroquia: parroquia.innerHTML ?? 'No encontrado',
   centro: centro.innerHTML ?? 'No encontrado'
}
} else {
   return {
      
      error: 'No encontrado'
   }
}
}, config)

return datos
}
module.exports = consultar