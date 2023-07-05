const routes = async (fastify, options) => {
	fastify.get('/', async (req, reply) => {
		return reply.view('index', { title: 'Home', name: 'Ed Pizza' });
	});
};

module.exports = routes;
