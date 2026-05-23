// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { shouldIgnore, detectProjectType, getSemanticLabel } = require('./semantics');

/**
 * @typedef {{ name: string, isDir: boolean, semanticLabel: string|null, children: TreeNode[] }} TreeNode
 */

/**
 * @param {string} dirPath
 * @returns {{ name: string, isDir: boolean }[]}
 */
function readDir(dirPath) {
	try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    return entries
        .filter(entry =>
            !shouldIgnore(entry.name) &&
            !entry.name.startsWith('.')
        )
        .map(entry => ({
            name: entry.name,
            isDir: entry.isDirectory()
        }))
        .sort((a, b) => {
            if (a.isDir !== b.isDir) {
                return a.isDir ? -1 : 1;
            }

            return a.name.localeCompare(b.name);
        });

} catch (err) {
    return [];
}
}

/**
 * @param {string} dirPath
 * @param {number} depth
 * @param {number} maxDepth
 * @param {boolean} showLabels
 * @returns {TreeNode[]}
 */
function buildTree(dirPath, depth, maxDepth, showLabels) {
	if (depth > maxDepth) { return []; }

	const entries = readDir(dirPath);
	/** @type {TreeNode[]} */
	const nodes = [];

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);
		const children = entry.isDir
			? buildTree(fullPath, depth + 1, maxDepth, showLabels)
			: [];
		const containedFiles = (entry.isDir && showLabels)
			? readDir(fullPath).map(e => e.name)
			: [];
		const semanticLabel = (entry.isDir && showLabels)
			? getSemanticLabel(entry.name, containedFiles)
			: null;

		nodes.push({ name: entry.name, isDir: entry.isDir, children, semanticLabel });
	}

	return nodes;
}

/**
 * @param {TreeNode[]} nodes
 * @param {string} prefix
 * @param {boolean} showLabels
 * @returns {string[]}
 */
function renderNodes(nodes, prefix, showLabels) {
	const lines = [];

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		const isLast = i === nodes.length - 1;
		const connector = isLast ? '└── ' : '├── ';
		const childPrefix = prefix + (isLast ? '    ' : '│   ');
		const suffix = (showLabels && node.semanticLabel) ? `  ← ${node.semanticLabel}` : '';
		const label = node.isDir ? node.name + '/' : node.name;

		lines.push(prefix + connector + label + suffix);

		if (node.children.length > 0) {
			lines.push(...renderNodes(node.children, childPrefix, showLabels));
		}
	}

	return lines;
}

/**
 * @param {TreeNode[]} nodes
 * @returns {number}
 */
function countDirs(nodes) {
	return nodes.reduce((acc, n) => n.isDir ? acc + 1 + countDirs(n.children) : acc, 0);
}

/**
 * @param {TreeNode[]} nodes
 * @returns {number}
 */
function countFiles(nodes) {
	return nodes.reduce((acc, n) => n.isDir ? acc + countFiles(n.children) : acc + 1, 0);
}

/**
 * @param {string} rootPath
 * @param {number} maxDepth
 * @param {boolean} showSemanticLabels
 * @returns {string}
 */
function generateMap(rootPath, maxDepth, showSemanticLabels) {
	const rootName = path.basename(rootPath);
	const rootFiles = readDir(rootPath).map(e => e.name);
	const projectType = showSemanticLabels ? detectProjectType(rootFiles) : null;
	const nodes = buildTree(rootPath, 1, maxDepth, showSemanticLabels);

	const header = projectType ? `${rootName}/  [${projectType}]` : `${rootName}/`;
	const tree = renderNodes(nodes, '', showSemanticLabels);
	const stats = `${countDirs(nodes)} directories, ${countFiles(nodes)} files`;
	const footer = projectType ? [`Project type: ${projectType}`] : [];

	return [header, ...tree, '', stats, ...footer].join('\n');
}

module.exports = { generateMap };