const puppeteer = require('puppeteer');

const consultar = async (ced) => {
const browser = await puppeteer.launch({ headless: "new" })
const page = await browser.newPage();
const url = 'http://www.cne.gob.ve/web/registro_electoral/ce.php?nacionalidad=V&cedula='

await page.goto(`${url}${ced}`)

var datos = await page.evaluate(() => {
     const contenedor = document.querySelector('html')
   
    const selectorPart1 = 'body > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr:nth-child'

    const selectorPart2 = ' > td:nth-child(2)'
    const selectorPart3 = ' > b'
    const selectorPart4 = ' > font'
   
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
})

return datos
}
module.exports = consultar