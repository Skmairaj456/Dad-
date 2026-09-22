const siteUrl = "https://www.deutscheautoden.com";
const key = process.env.INDEXNOW_KEY?.trim();
const paths = process.argv.slice(2);
const urls = (paths.length ? paths : ["/"]).map((path) => new URL(path, siteUrl).toString());

if (!key) {
  console.error("INDEXNOW_KEY is required.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "www.deutscheautoden.com",
    key,
    keyLocation: `${siteUrl}/indexnow-key.txt`,
    urlList: urls,
  }),
});

const body = await response.text();
console.log(`IndexNow response: ${response.status} ${body}`);

if (!response.ok) process.exit(1);
