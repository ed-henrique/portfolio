// Main application file

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

// Register compress plugin (global by default)
fastify.register(require('@fastify/compress'));

// START -- Register static files plugin --
const path = require('path');
const minifier = require('html-minifier');
const fastifyStatic = require('@fastify/static');

const minifierOptions = {
	caseSensitive: true,
	collapseBooleanAttributes: true,
	collapseInlineTagWhitespace: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	minifyCSS: true,
	minifyJS: true,
	minifyURLs: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeEmptyAttributes: true,
	removeEmptyElements: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
};

fastify.register(require('@fastify/view'), {
	engine: {
		pug: require('pug'),
	},
	root: path.join(__dirname, 'views'),
	includeViewExtension: true,
	options: {
		useHtmlMinifier: true,
		htmlMinifierOptions: minifierOptions,
	},
});

fastify.register(fastifyStatic, {
	root: path.join(__dirname, 'public/images'),
	prefix: '/images/',
});

fastify.register(fastifyStatic, {
	root: path.join(__dirname, 'public/javascripts'),
	prefix: '/javascripts/',
	decorateReply: false,
});

fastify.register(fastifyStatic, {
	root: path.join(__dirname, 'public/stylesheets'),
	prefix: '/stylesheets/',
	decorateReply: false,
});
// END -- Register static files plugin --

// START -- Register routes --
fastify.register(require(path.join(__dirname, 'routes/index')), {
	prefix: '/',
});
// END -- Register routes --

// Run the server!
const start = async () => {
	try {
		await fastify.listen({ port: 3000 }, (err, address) => {
			fastify.log.info(`server listening on ${address}`);
		});
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
