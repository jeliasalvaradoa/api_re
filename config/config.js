require("dotenv").config();

const config = {
    url: process.env.URL,
    selector: process.env.SELECTOR,
    selectorPart1: process.env.SELECTOR_PART1,
    selectorPart2: process.env.SELECTOR_PART2,
    selectorPart3: process.env.SELECTOR_PART3,
    selectorPart4: process.env.SELECTOR_PART4,
};
module.exports = { config };
