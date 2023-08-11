    // In collaboration with Kenny Ramondo
    const inquirer = require('inquirer');
    const fs = require('fs');
    
    const { Triangle, Square, Circle } = require('./lib/shapes');
    
    function userPrompt() {
      inquirer
      .prompt([
        {
          type: "input",
          message: "Enter up to three characters for logo display.",
          name: "text",
        },
  
        {
          type: "input",
          message:
            "Choose a text color (Enter color keyword OR a hexadecimal number)",
          name: "textColor",
        },
  
        {
          type: "list",
          message: "What shape would you like the logo to be?",
          choices: ["Triangle", "Square", "Circle"],
          name: "shape",
        },
  
        {
          type: "input",
          message:
            "Choose shapes color (Enter color keyword OR a hexadecimal number)",
          name: "shapeColor",
        },
    ])
    .then((answers) => {
        // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
        if (answers.text.length > 3) {
          console.log("Must enter a value of no more than 3 characters");
          promptUser();
        } else {
          let shape = "";
          if (answers.shape === "Triangle") {
            shape = new Triangle();
          } else if (answers.shape === "Square") {
            shape = new Square();
          } else {
            shape = new Circle();
          }
          shape.setColor(answers.shapeColor);
          // creating svg code
          const svgString = `
          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shape.render()}
            <text x="50%" y="50%" text-anchor= "middle" fill="${
              answers.textColor
            }">${answers.text}</text>
          </svg>
          `;
  
          // Calling write file function to generate SVG file
          fs.writeFile("logo.svg", svgString, (err) =>
            err ? console.error(err) : console.log("Generated logo.svg")
          );
        }
      });
    };
  
  // Calling userPrompt function
  userPrompt();