module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const APP_ID = '{AppId}';
    const APP_SECERET = '{AppSecret}';
    const TOKEN_ENDPOINT = 'https://login.microsoftonline.com/{TenantId}/oauth2/token';
    const Resource = '{ResourceName}';

    const axios = require('axios');
    const qs = require('qs');

    const postData = {
        client_id: APP_ID,
        resource: Resource,
        client_secret: APP_SECERET,
        grant_type: 'client_credentials'
    };

    axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded';

    async function axiosTest() {
        const response = await axios.post(TOKEN_ENDPOINT, qs.stringify(postData))
        return response.data
    }

    
    let token = await axiosTest();

    let bearer = token.access_token;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: bearer
    };
}