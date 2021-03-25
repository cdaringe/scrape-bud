// deno-lint-ignore-file no-explicit-any
import puppeteer from "https://deno.land/x/puppeteer@5.5.1/mod.ts";
declare var document: {
  querySelector: (queryString: string) => any;
};

const browser = await puppeteer.launch({
  devtools: true,
});
const page = await browser.newPage();
await page.goto("https://google.com", {
  waitUntil: "networkidle0",
});

const result: (number | string)[][] = await page.evaluate(() => {
  // uncomment me to interact with the browser
  // debugger;
  return [
    ["logo_url", document.querySelector("img[alt=Google]").src],
    ["promo", document.querySelector('[class*="promo"]').textContent],
  ];
});
Deno.writeTextFileSync(
  "output.csv",
  "field,value" +
  result.map((row) => row.map(String).join(",")).join("\n")
);
await browser.close();
