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
1. `~$ git clone [repository URL] && git switch [name]-dev`
2. Supply values to `codeChomper/.env.template` and save as `codeChomper/.env`
3. `~/codeChomper$ npm install`
4. `~/codeChomper/client$ npm install && npm run build` (production, static) or `~/codeChomper/client$ npm install && npm start` (development, dynamic)
5. `~/codeChomper$ node index.js` (in separate terminal if latter method of (4) was used)
6. On success, console will output `Example app listening at http://localhost:8080
Database connection open`

### Updating/Recompiling Bandit
1. Download and install [Python](https://www.python.org/downloads/)
2. Using pip, download and install PyInstaller and Bandit (`pip install pyinstaller` and `pip install bandit`)
3. `~/codeChomper/bandit/update$ pyinstaller -F --additional-hooks-dir=hooks bandit.py`
4. Overwrite `codeChomper/bandit/bandit.exe` with `codeChomper/bandit/update/dist/bandit.exe`
5. Any newly generated directories or files within `codeChomper/bandit/update`, such as the `dist`, `build`, and `hooks/__pycache__` directories as well as any `.spec` files, should be deleted
6. If desired, PyInstaller and Bandit may be uninstalled (`pip uninstall pyinstaller` and `pip uninstall bandit`)
7. If desired, Python may also be uninstalled