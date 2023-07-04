const routes = async (fastify, options) => {
	fastify.get('/', async (req, reply) => {
		return reply.view('index', { title: 'Index' });
	});
};

module.exports = routes;
