# codeChomper

## Senior Project Fall 2022 University of Florida
Ryan Dembo

Kai Priester

Claudia Rubio

Daniel Fernandes

## Abstract
Whether we realize it or not, software impacts our daily lives in almost every aspect. Therefore when software fails to operate as expected, we can greatly suffer the effects. Many software failures root from insecure coding practices. Newly graduated software engineers are often found making these types of mistakes while coding. University professors are looking to introduce secure coding practices earlier in the undergraduate curriculum. It is important that professors can identify which insecure coding practices are most commonly seen in their student’s code so that professors can quickly and dynamically address these issues throughout the school year. Static code analysis tools are designed to detect these types of vulnerabilities. codeChomper is a web platform that will allow professors to efficiently run student’s code through static code analysis tools and effectively draw conclusions on what insecure coding practices are most common among their students. codeChomper will be tailored to computer science professors with a large number of students. Unlike running standalone static code analysis tools, codeChomper will streamline the process to work with multiple different scripting languages and automatically perform data analytics afterwards.

## Technical Documentation 
### For Local Development
1. Clone this repo
2. Work on your own dev branch
3. Add .env (contact developers for values)
4. In root `$: npm install`
5. cd into client and `$: npm install` then `$: npm run build`
6. Return to root and `$: node index.js`
7. Should see ` Example app listening at http://localhost:8080
Database connection open`