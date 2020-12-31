import Client from './client';
const client = new Client();

try {
    const errors = [];
    const requiredEnvs = [
        'BOT_TOKEN',
        'API_KEY',
    ];

    for (const env of requiredEnvs) {
        if (!process.env.hasOwnProperty(env)) {
            errors.push(env);
        }
    }

    if (errors.length > 0) throw new Error(
        `${errors.join(', ')} ${errors.length > 1 ? 'are' : 'is'} required`
    );

    client.init();
} catch (err) {
    throw new Error(err);
}
