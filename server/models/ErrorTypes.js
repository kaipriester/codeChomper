const ErrorList = {};
ErrorList[0] = {
	Name: "no caller",
	Description:
		"usage of deprecated functions arguments.caller() and arguments.callee was detected, this could potentially allow access to call stack.",
	//OG Description: Bans usage of deprecated functions arguments.caller() and arguments.callee that could potentially allow access to call stack.
	Severity: 2, //4
};
ErrorList[1] = {
	Name: "no delete var",
	Description:
		"usage of delete on variables was detected, this could potentially lead to unexpected behavior.",
	//OG Description: Bans usage of operator delete on variables as it can lead to unexpected behavior.
	Severity: 2, //1
};
ErrorList[2] = {
	Name: "no eval",
	Description:
		"Usage of eval() was detected, which could potentially lead to code execution from string argument.",
	//OG Description: no-eval, Bans usage of eval() that allows code execution from string argument.
	Severity: 2, //10
};
ErrorList[3] = {
	Name: "no implied eval",
	Description:
		"Usage of setTimeout(), setInterval() or execScript() was detected. These functions are prone to code execution.",
	//OG Description: no-implied-eval, Bans usage of setTimeout(), setInterval() and execScript(). These functions are similar to eval() and prone to code execution.
	Severity: 2, //?
};
ErrorList[4] = {
	Name: "no new func",
	Description:
		"Usage of new Function() was detected, which is prone to code execution.",
	//OG Description: no-new-func, Bans calling new Function() as it's similar to eval() and prone to code execution.
	Severity: 2, //?
};
ErrorList[5] = {
	Name: "node/no deprecated api",
	Description: "Usage of deprecated API in Node was detected.",
	//OG Description: node/no-deprecated-api, Bans usage of deprecated APIs in Node.
	Severity: 2, //?
};
ErrorList[6] = {
	Name: "@microsoft/sdl/no angular bypass sanitizer",
	Description:
		"Call to bypassSecurityTrustHtml, bypassSecurityTrustScript or a similar method was detected, which could bypass DomSanitizer in Angular.",
	//OG Description: @microsoft/sdl/no-angular-bypass-sanitizer, Calls to bypassSecurityTrustHtml, bypassSecurityTrustScript and similar methods bypass DomSanitizer in Angular and need to be reviewed.
	Severity: 2, //?
};
ErrorList[7] = {
	Name: "@microsoft/sdl/no angularjs bypass sce",
	Description:
		"Call to $sceProvider.enabled(false), $sceDelegate.trustAs(), $sce.trustAs() or a relevant shorthand method was detected, which could bypass Strict Contextual Escaping (SCE) in AngularJS.",
	//OG Description: @microsoft/sdl/no-angularjs-bypass-sce, Calls to $sceProvider.enabled(false), $sceDelegate.trustAs(), $sce.trustAs() and relevant shorthand methods (e.g. trustAsHtml or trustAsJs) bypass Strict Contextual Escaping (SCE) in AngularJS and need to be reviewed.
	Severity: 2, //?
};
ErrorList[8] = {
	Name: "@microsoft/sdl/no angularjs enable svg",
	Description:
		"Call to $sanitizeProvider.enableSvg(true) was detected, which could increase attack surface of the application by enabling SVG support in AngularJS sanitizer",
	//OG Description: @microsoft/sdl/no-angularjs-enable-svg, Calls to $sanitizeProvider.enableSvg(true) increase attack surface of the application by enabling SVG support in AngularJS sanitizer and need to be reviewed.
	Severity: 2, //?
};
ErrorList[9] = {
	Name: "@microsoft/sdl/no angularjs sanitization whitelist",
	Description:
		"Call to $compileProvider.aHrefSanitizationWhitelist or $compileProvider.imgSrcSanitizationWhitelist was detected, which could configure whitelists in AngularJS sanitizer",
	//OG Description: @microsoft/sdl/no-angularjs-sanitization-whitelist, Calls to $compileProvider.aHrefSanitizationWhitelist or $compileProvider.imgSrcSanitizationWhitelist configure whitelists in AngularJS sanitizer and need to be reviewed.
	Severity: 2, //?
};
ErrorList[10] = {
	Name: "@microsoft/sdl/no cookies",
	Description:
		"HTTP cookies were detected, which are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other modern methods instead.",
	//OG Description: @microsoft/sdl/no-cookies, HTTP cookies are an old client-side storage mechanism with inherent risks and limitations. Use Web Storage, IndexedDB or other modern methods instead.
	Severity: 2, //?
};
ErrorList[11] = {
	Name: "@microsoft/sdl/no document domain",
	Description:
		"Write to document.domain property was detected, which must be reviewed to avoid bypass of same-origin checks, or usage of top level domains such as azurewebsites.net was detected.",
	//OG Description: @microsoft/sdl/no-document-domain, Writes to document.domain property must be reviewed to avoid bypass of same-origin checks. Usage of top level domains such as azurewebsites.net is strictly prohibited.
	Severity: 2, //?
};
ErrorList[12] = {
	Name: "@microsoft/sdl/no document write",
	Description:
		"Call to document.write or document.writeln was detected, which manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
	//OG Description: @microsoft/sdl/no-document-write, Calls to document.write or document.writeln manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.
	Severity: 2, //?
};
ErrorList[13] = {
	Name: "@microsoft/sdl/no electron node integration",
	Description:
		"Node.js Integration was detected, which must not be enabled in any renderer that loads remote content to avoid remote code execution attacks.",
	//OG Description: @microsoft/sdl/no-electron-node-integration, Node.js Integration must not be enabled in any renderer that loads remote content to avoid remote code execution attacks.
	Severity: 2, //?
};
ErrorList[14] = {
	Name: "@microsoft/sdl/no html method",
	Description:
		"Direct call to method html() was detected, which often manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
	//OG Description: @microsoft/sdl/no-html-method, Direct calls to method html() often (e.g. in jQuery framework) manipulate DOM without any sanitization and should be avoided. Use document.createElement() or similar methods instead.
	Severity: 2, //?
};
ErrorList[15] = {
	Name: "@microsoft/sdl/no inner html",
	Description:
		"Assignment to innerHTML or outerHTML properties was detected, which manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.",
	//OG Description: @microsoft/sdl/no-inner-html, Assignments to innerHTML or outerHTML properties manipulate DOM directly without any sanitization and should be avoided. Use document.createElement() or similar methods instead.
	Severity: 2, //?
};
ErrorList[16] = {
	Name: "@microsoft/sdl/no insecure url",
	Description:
		"Insecure protocols such as HTTP or FTP were detected, which should be replaced by their encrypted counterparts (HTTPS, FTPS) to avoid sending potentially sensitive data over untrusted networks in plaintext.",
	//OG Description: @microsoft/sdl/no-insecure-url, Insecure protocols such as HTTP or FTP should be replaced by their encrypted counterparts (HTTPS, FTPS) to avoid sending potentially sensitive data over untrusted networks in plaintext.
	Severity: 2, //?
};
ErrorList[17] = {
	Name: "@microsoft/sdl/no msapp exec unsafe",
	Description:
		"Call to MSApp.execUnsafeLocalFunction() was detected, which bypasses script injection validation and should be avoided.",
	//OG Description: @microsoft/sdl/no-msapp-exec-unsafe, Calls to MSApp.execUnsafeLocalFunction() bypass script injection validation and should be avoided.
	Severity: 2, //?
};
ErrorList[18] = {
	Name: "@microsoft/sdl/no postmessage star origin",
	Description:
		"Use of * instead of specific target origin was detected, which should be avoided when sending data to other windows using postMessage to avoid data leakage outside of trust boundary.",
	//OG Description: @microsoft/sdl/no-postmessage-star-origin, Always provide specific target origin, not * when sending data to other windows using postMessage to avoid data leakage outside of trust boundary.
	Severity: 2, //?
};
ErrorList[19] = {
	Name: "@microsoft/sdl/no unsafe alloc",
	Description:
		"Use of Buffer.allocUnsafe or Buffer.allocUnsafeSlow was detected. When calling Buffer.allocUnsafe and Buffer.allocUnsafeSlow, the allocated memory is not wiped-out and can contain old, potentially sensitive data.",
	//OG Description: @microsoft/sdl/no-unsafe-alloc, When calling Buffer.allocUnsafe and Buffer.allocUnsafeSlow, the allocated memory is not wiped-out and can contain old, potentially sensitive data.
	Severity: 2, //?
};
ErrorList[20] = {
	Name: "@microsoft/sdl/no winjs html unsafe",
	Description:
		"Call to WinJS.Utilities.setInnerHTMLUnsafe() or similar method was detected, which does not perform any input validation and should be avoided. Use WinJS.Utilities.setInnerHTML() instead.",
	//OG Description: @microsoft/sdl/no-winjs-html-unsafe, Calls to WinJS.Utilities.setInnerHTMLUnsafe() and similar methods do not perform any input validation and should be avoided. Use WinJS.Utilities.setInnerHTML() instead.
	Severity: 2, //?
};
ErrorList[21] = {
	Name: "@microsoft/sdl/react iframe missing sandbox",
	Description:
		"The sandbox attribute enables an extra set of restrictions for the content in the iframe and should always be specified.",
	//OG Description: @microsoft/sdl/react-iframe-missing-sandbox, The sandbox attribute enables an extra set of restrictions for the content in the iframe and should always be specified.
	Severity: 2, //?
};
ErrorList[22] = {
	Name: "react/no danger",
	Description:
		"Usage of dangerouslySetInnerHTML property in React was detected, which allows passing unsanitized HTML in DOM.",
	//OG Description: react/no-danger, Bans usage of dangerouslySetInnerHTML property in React as it allows passing unsanitized HTML in DOM.
	Severity: 2, //?
};
ErrorList[23] = {
	Name: "no implied eval",
	Description:
		"Usage of setTimeout(), setInterval(), setImmediate(), execScript() or new Function() was detected, which may allow code execution from string arguments.",
	//OG Description: @typescript-eslint/no-implied-eval, Similar to built-in ESLint rule no-implied-eval. Bans usage of setTimeout(), setInterval(), setImmediate(), execScript() or new Function() as they are similar to eval() and allow code execution from string arguments.
	Severity: 2, //?
};
//If it returns -1 then it is a normal ESLINT Error and not a Security Error
exports.convertRuleIDToErrorType = (ErrorID) => {
	if (!ErrorID) {
		return -1;
	}
	for (const [key, value] of Object.entries(ErrorList)) {
		if ("" + value == ErrorID.replace("-", " ")) {
			return key;
		}
	}
	return -1;
};
