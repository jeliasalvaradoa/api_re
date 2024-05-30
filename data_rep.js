const puppeteer = require('puppeteer');
require('dotenv').config();
const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const consultar = async (ced, config) => {
  // Intentar obtener los datos de la caché
  const cachedData = myCache.get(ced);
  if (cachedData) {
    return cachedData;
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = config.url;

  try {
    await page.goto(`${url}${ced}`, { waitUntil: 'domcontentloaded' });

    var datos = await page.evaluate((config) => {
      const selector = config.selector;
      const contenedor = document.querySelector(selector);

      if (!contenedor) {
        return { error: 'No encontrado' };
      }

      const selectorPart1 = config.selectorPart1;
      const selectorPart2 = config.selectorPart2;
      const selectorPart3 = config.selectorPart3;
      const selectorPart4 = config.selectorPart4;

      const cedula = contenedor.querySelector(`${selectorPart1}(1)${selectorPart2}`);
      const nombre = contenedor.querySelector(`${selectorPart1}(2)${selectorPart2}${selectorPart3}`) ?? '';
      const estado = contenedor.querySelector(`${selectorPart1}(3)${selectorPart2}`) ?? '';
      const municipio = contenedor.querySelector(`${selectorPart1}(4)${selectorPart2}`) ?? '';
      const parroquia = contenedor.querySelector(`${selectorPart1}(5)${selectorPart2}`) ?? '';
      const centro = contenedor.querySelector(`${selectorPart1}(6)${selectorPart2}${selectorPart4}`) ?? '';

      if (nombre && nombre.innerHTML) {
        return {
          cedula: cedula.innerHTML.replace(/[^0-9]+/g, ""),
          nombre: nombre.innerHTML,
          estado: estado.innerHTML,
          municipio: municipio.innerHTML,
          parroquia: parroquia.innerHTML,
          centro: centro.innerHTML
        };
      } else {
        return { error: 'No encontrado' };
      }
    }, config);

    // Almacenar los datos en la caché
    myCache.set(ced, datos);

    return datos;
  } catch (error) {
    console.error('Error durante el scraping:', error);
    return { error: 'Error durante el scraping' };
  } finally {
    await browser.close();
  }
};

module.exports = consultar;
