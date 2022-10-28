exports.PYErrorList = {};
exports.PYErrorList[B101] = {
	
	Name: "Test for use of assert",
	Description:
		"Use of assert detected. The enclosed code will be removed when compiling to optimised byte code.",
   // Severity:  1, //low
    CWE: "https://cwe.mitre.org/data/definitions/703.html",
    MoreInfo: "https://bugs.launchpad.net/juniperopenstack/+bug/1456193",
    Group: "Misc tests"   
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B102] = {
	
	Name: "Test for the use of exec",
	Description:
		"Use of exec detected, which can allow for dynamically generated code to be run (possibly based on user input).",
   // Severity:  4, //med
    CWE: "https://cwe.mitre.org/data/definitions/78.html",
    MoreInfo: "https://www.python.org/dev/peps/pep-0551/#background", 
    Group: "Misc tests" 
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B103] = {
	
	Name: "Test for setting permissive file permissions",
	Description:
		"Looks for the use of chmod and will alert when it is used to set particularly permissive control flags. A MEDIUM warning is generated if a file is set to group write or executable and a HIGH warning is reported if a file is set world write or executable. ",
    //Severity:  can be MED or HIGH
    CWE: "https://cwe.mitre.org/data/definitions/732.html",
    MoreInfo: "https://security.openstack.org/guidelines/dg_apply-restrictive-file-permissions.html",
    Group: "Misc tests"    
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B104] = {
	
	Name: "Test for binding to all interfaces",
	Description:
		"Binding to all network interfaces can potentially open up a service to traffic on unintended interfaces, that may not be properly documented or secured. This plugin test looks for a string pattern “0.0.0.0” that may indicate a hardcoded binding to all network interfaces.",
    //Severity:  MED
    CWE: "https://cwe.mitre.org/data/definitions/605.html",
    MoreInfo: "https://nvd.nist.gov/vuln/detail/CVE-2018-1281" ,
    Group: "Misc tests"  
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B105] = {
	
	Name: "Test for use of hard-coded password strings",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. Note: this can be noisy and may generate false positives.",
    //Severity:  LOW for some reason
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b105_hardcoded_password_string.html" ,
    Group: "Misc tests"  
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B106] = {
	
	Name: "Test for use of hard-coded password function arguments",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. This test looks for all function calls being passed a keyword argument that is a string literal. It checks that the assigned local variable does not look like a password. Note: this can be noisy and may generate false positives.",
    //Severity:  LOW for some reason
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b106_hardcoded_password_funcarg.html" ,
    Group: "Misc tests"  
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B107] = {
	
	Name: "Test for use of hard-coded password argument defaults",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. This test looks for all function definitions that specify a default string literal for some argument. It checks that the argument does not look like a password. Note: this can be noisy and may generate false positives.",
    //Severity:  LOW for some reason
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b107_hardcoded_password_default.html" ,
    Group: "Misc tests"  
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};
exports.PYErrorList[B108] = {
	
	Name: "Test for insecure usage of tmp file/directory",
	Description:
		"The use of hard-coded passwords increases the possibility of password guessing tremendously. This test looks for all function definitions that specify a default string literal for some argument. It checks that the argument does not look like a password. Note: this can be noisy and may generate false positives.",
    //Severity:  MED
    CWE: "https://cwe.mitre.org/data/definitions/259.html",
    MoreInfo: "https://bandit.readthedocs.io/en/latest/plugins/b107_hardcoded_password_default.html" ,
    Group: "Misc tests"  
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
};