// http.js
const http = require("http");
const fs = require("fs");

const app = http
    .createServer((req, res) => {
        const { method, url } = req;
        if (method == "GET" && url == "/") {
            fs.readFile("./index.html", (err, data) => {
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            });

        } else if (method === "GET" && url === "/api/download") {        
            fs.readFile("./file.pdf", (err, data) => {
                res.setHeader("Content-Type", "application/pdf");
                const fileName = encodeURI('中文')
                // Content-Disposition sContent-Disposition响应标头是一个标头，
                // 指示是否希望在浏览器中以内联方式显示内容，即作为网页或Web页面的一部分，还是作为附件下载并显示在浏览器中。保存在本地。
                // 指示应下载
                res.setHeader('Content-Disposition' ,`attachment; filename="${fileName}.pdf"`)
                res.end(data);
            });

        }


    })
// module.exports = app
app.listen(3000)