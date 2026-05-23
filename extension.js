// @ts-check
'use strict';

const vscode = require('vscode');
const path = require('path');
const { generateMap } = require('./tree.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	function getConfig() {
		const cfg = vscode.workspace.getConfiguration('mapify');
		return {
			maxDepth:           cfg.get('maxDepth', 4),
			showSemanticLabels: cfg.get('showSemanticLabels', true),
			copyToClipboard:    cfg.get('copyToClipboard', true),
		};
	}

	/**
	 * @param {string} rootPath
	 */
	async function runMapify(rootPath) {
		const { maxDepth, showSemanticLabels, copyToClipboard } = getConfig();

		const map = await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: 'Mapify: generating project map…',
				cancellable: false,
			},
			async () => generateMap(rootPath, maxDepth, showSemanticLabels)
		);

		if (copyToClipboard) {
			await vscode.env.clipboard.writeText(map);
		}

		const doc = await vscode.workspace.openTextDocument({
			language: 'plaintext',
			content: map,
		});
		await vscode.window.showTextDocument(doc, {
			preview: false,
			viewColumn: vscode.ViewColumn.Beside,
		});

		const label = path.basename(rootPath);
		const suffix = copyToClipboard ? ' and copied to clipboard.' : '.';
		vscode.window.showInformationMessage(`Mapify: map for "${label}" generated${suffix}`);
	}

	// Command palette → map the whole workspace
	context.subscriptions.push(
		vscode.commands.registerCommand('mapify.generateMap', async () => {
			const folders = vscode.workspace.workspaceFolders;
			if (!folders || folders.length === 0) {
				vscode.window.showErrorMessage('Mapify: no workspace folder is open.');
				return;
			}

			let rootPath;
			if (folders.length === 1) {
				rootPath = folders[0].uri.fsPath;
			} else {
				const picks = folders.map(f => ({
					label: f.name,
					description: f.uri.fsPath,
					fsPath: f.uri.fsPath,
				}));
				const choice = await vscode.window.showQuickPick(picks, {
					placeHolder: 'Select workspace root to map',
				});
				if (!choice) { return; }
				rootPath = choice.fsPath;
			}

			await runMapify(rootPath);
		})
	);

	// Right-click a folder in Explorer
	context.subscriptions.push(
		vscode.commands.registerCommand('mapify.generateMapFromFolder', async (uri) => {
			if (!uri) {
				vscode.window.showErrorMessage('Mapify: right-click a folder in the Explorer.');
				return;
			}
			await runMapify(uri.fsPath);
		})
	);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
};