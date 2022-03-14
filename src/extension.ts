// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as open from "open";
import { accessSync } from "fs";

const {platform, arch} = process;

function offerDownload(): void {
	vscode.window.showInformationMessage("Studio 3T not installed!","Ok","Learn More","Download Now").then(answer => {
		if(answer==="Download Now") {
			vscode.env.openExternal(vscode.Uri.parse("https://studio3t.com/download"));
		} else if (answer==="Learn More") {
			vscode.env.openExternal(vscode.Uri.parse("https://studio3t.com/"));
		}
	});
}
export function activate(context: vscode.ExtensionContext): void {
  let launch = vscode.commands.registerCommand("s3t.launch", async () => {
	if(platform==="darwin") {
		try {
			var exists=accessSync("/Applications/Studio 3T.app");
		} catch (err:unknown) {
			if(isErrnoException(err) && err.code==='ENOENT') {
				offerDownload();
				return;
			}
		}
	} else {

	}

    var childprocess = await open.openApp("Studio 3T", { wait: false });
    
	vscode.window.showInformationMessage("Studio 3T launching!");

  });

  context.subscriptions.push(launch);
}

function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
	if ('code' in (e as any)) {
		return true;
	}
	else {
		return false;
	}
  }

// this method is called when your extension is deactivated
export function deactivate() {}
