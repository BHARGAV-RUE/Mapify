// @ts-check
'use strict';

/** @type {Record<string, string>} */
const FILE_SIGNALS = {
	'package.json':        'node project',
	'requirements.txt':    'python project',
	'pipfile':             'python project',
	'pyproject.toml':      'python project',
	'go.mod':              'go module',
	'cargo.toml':          'rust crate',
	'pom.xml':             'java / maven',
	'build.gradle':        'java / gradle',
	'gemfile':             'ruby project',
	'composer.json':       'php project',
	'next.config.js':      'next.js app',
	'next.config.ts':      'next.js app',
	'nuxt.config.ts':      'nuxt app',
	'vite.config.ts':      'vite app',
	'vite.config.js':      'vite app',
	'angular.json':        'angular app',
	'svelte.config.js':    'svelte app',
	'remix.config.js':     'remix app',
	'astro.config.mjs':    'astro site',
	'hardhat.config.ts':   'web3 / solidity',
	'foundry.toml':        'web3 / foundry',
	'docker-compose.yml':  'docker services',
	'docker-compose.yaml': 'docker services',
	'dockerfile':          'container',
	'main.tf':             'terraform',
	'serverless.yml':      'serverless',
	'serverless.yaml':     'serverless',
	'schema.prisma':       'prisma orm',
	'manage.py':           'django app',
};

/** @type {Array<[RegExp, string]>} */
const FOLDER_LABELS = [
	// Frontend
	[/^(components?|ui|widgets?)$/i,                           'UI components'],
	[/^(pages?|views?|screens?)$/i,                            'pages / views'],
	[/^(layouts?)$/i,                                          'layouts'],
	[/^(hooks?)$/i,                                            'React hooks'],
	[/^(context|contexts|store|redux|zustand|state)$/i,        'state management'],
	[/^(styles?|css|scss|sass|less|themes?)$/i,                'styles'],
	[/^(assets?|static|public|media|images?|icons?|fonts?)$/i, 'static assets'],
	// Backend
	[/^(api|apis|routes?|router|routers|endpoints?)$/i,        'API layer'],
	[/^(controllers?|handlers?)$/i,                            'request handlers'],
	[/^(services?|service-layer|business)$/i,                  'business logic'],
	[/^(models?|entities|domain)$/i,                           'data models'],
	[/^(repositories?|repo|repos|dal|data-access)$/i,          'data access'],
	[/^(middleware|middlewares?)$/i,                            'middleware'],
	[/^(graphql|gql)$/i,                                       'GraphQL layer'],
	[/^(events?|event-bus|pubsub|queues?)$/i,                  'event system'],
	[/^(jobs?|workers?|tasks?|cron|schedulers?)$/i,            'background jobs'],
	// Auth
	[/^(auth|authentication|authorization|oauth|jwt|sessions?)$/i, 'auth'],
	// Database
	[/^(db|database|databases?|data)$/i,                       'database'],
	[/^(migrations?|migrate)$/i,                               'DB migrations'],
	[/^(seeds?|seeders?|fixtures?)$/i,                         'DB seeds'],
	[/^(prisma|sequelize|typeorm|drizzle|mongoose)$/i,         'ORM layer'],
	// Infra
	[/^(infra|infrastructure|terraform|k8s|kubernetes|helm)$/i,'infrastructure'],
	[/^(docker|containers?)$/i,                                'containers'],
	[/^(ci|\.github|\.gitlab|\.circleci)$/i,                  'CI / CD'],
	[/^(config|configs?|configuration|settings?)$/i,           'config'],
	[/^(scripts?|tools?|bin|cli|cmd)$/i,                       'scripts / tooling'],
	[/^(deploy|deployment|release)$/i,                         'deployment'],
	[/^(monitoring|metrics?|logs?)$/i,                         'observability'],
	// Testing
	[/^(__tests?__|tests?|spec|specs?|e2e|cypress|playwright)$/i, 'tests'],
	[/^(mocks?|stubs?|fakes?|fixtures?)$/i,                    'test fixtures'],
	// Docs
	[/^(docs?|documentation|wiki|guides?)$/i,                  'documentation'],
	[/^(examples?|demo|demos?)$/i,                             'examples'],
	// Utilities
	[/^(utils?|utilities?|helpers?|lib|libs?|shared|common|core)$/i, 'utilities'],
	[/^(types?|typings?|interfaces?|dtos?|schemas?)$/i,        'types / schemas'],
	[/^(i18n|locales?|translations?)$/i,                       'internationalisation'],
	// ML
	[/^(ml|ai|training|inference|notebooks?)$/i,               'ML / AI'],
	// Monorepo
	[/^(packages?|apps?|modules?|workspaces?)$/i,              'monorepo packages'],
];

const IGNORE_SET = new Set([
	'node_modules', '.git', '.svn',
	'dist', 'build', 'out', '.next', '.nuxt', '.output',
	'__pycache__', '.pytest_cache', '.mypy_cache',
	'.venv', 'venv',
	'vendor', 'bower_components',
	'.DS_Store', 'Thumbs.db',
	'coverage', '.nyc_output',
	'.turbo', '.cache',
	'.idea',
	'target',
]);

/**
 * @param {string} name
 * @returns {boolean}
 */
function shouldIgnore(name) {
	if (IGNORE_SET.has(name)) { return true; }
	if (name.endsWith('.egg-info')) { return true; }
	return false;
}

/**
 * @param {string[]} rootFiles
 * @returns {string|null}
 */
function detectProjectType(rootFiles) {
	const lower = rootFiles.map(f => f.toLowerCase());
	for (const f of lower) {
		if (FILE_SIGNALS[f]) { return FILE_SIGNALS[f]; }
	}
	return null;
}

/**
 * @param {string} folderName
 * @param {string[]} containedFiles
 * @returns {string|null}
 */
function getSemanticLabel(folderName, containedFiles) {
	for (const f of containedFiles) {
		const base = f.toLowerCase().split('/').pop() || '';
		if (FILE_SIGNALS[base]) { return FILE_SIGNALS[base]; }
	}
	for (const [pattern, label] of FOLDER_LABELS) {
		if (pattern.test(folderName)) { return label; }
	}
	return null;
}

module.exports = { shouldIgnore, detectProjectType, getSemanticLabel };