let {PythonShell} = require('python-shell')

exports.runBandit = async ()=> {

    let options = {
    mode: 'text',
    //pythonPath: 'path/to/python',
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: __dirname,
    args: ["C:\\Users\\Dryan\\Desktop\\SRPROJtests\\pythonTests"],
    };


    const shellOutput = await new Promise((resolve, reject) => {
        //dir actually at index.js  (codechomper root)
        PythonShell.run('/main.py', options, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
        });
    });
    //console.log(shellOutput.stdout);
    return shellOutput;
};

