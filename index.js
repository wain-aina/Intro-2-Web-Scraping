const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});

    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com/')

    const quotes = await page.evaluate(() => {
        const quoteElements = document.querySelectorAll('.quote');
        const quoteArrays = []

        for(const quoteElement of quoteElements){
            const quoteText = quoteElement.querySelector('.text').innerText;
            const author = quoteElement.querySelector('.author').innerText

            const tags = quoteElement.querySelectorAll('.tags .tag')
            const tagsArray = []

            for(const tag of tags){
                const label = tag.innerText;
                tagsArray.push(label);
            }

            quoteArrays.push({
                quote: quoteText,
                author: author,
                tags: tagsArray
            });
        }

        return quoteArrays;
    });

    console.log(quotes)


    await browser.close();
})()