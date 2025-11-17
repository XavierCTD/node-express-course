const http = require('http');
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      const key = partArray[0]
      const value = decodeURIComponent(partArray[1].replace(/\+/g, " "));
      resultHash[key] = value;
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter item here";
let intro = "Welcome to the coffee shop!"

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <header>
  <h1 id="color1">${intro}</h1>
  <p class="center">From here you will find the finest drink we can offer you.</p>
  </header>
  <body>
  <ul>
  <li>Coffee cup</li>
  <li>Mocha</li>
  <li>Frappe</li>
  </ul>
  <p class="center">${item}.</p>

  <form method="POST">
  <input name="item"></input>
  <button type="submit">Submit</button>
  <p id="page"></p> 
  </form>
  
  <footer id="thanks"></footer>

  <script>

  const formElement = document.querySelector("form");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    setTimeout(() => {
      document.getElementById("page").innerText = "Your drink has been added.";
    }, 1500)

    setTimeout(() => {
      document.getElementById("thanks").innerText = "Thank you for visiting our coffee shop! See you soon!"
    }, 3000)

    setTimeout(() => {
      formElement.submit();
    }, 3500)
    });
  </script>
  
  <style>
    * {
      color: light green;
     }
    .center {
      text-align: center;
      color: gray;
    }
    #color1 {
      text-align: center;
      color: gray;
    }
  </style>

  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["item"]) {
        item = body["item"];
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
