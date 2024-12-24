class HttpMethods {
    async post(client: any, endpoint: string, data: any) {
        try{
        const response = await client.post(endpoint, { data });
        return response;
        }
        catch(error){
            console.log('Unable to create the resource:',error);
        }
    }

    async get(client: any, endpoint: string) {
        try{
        const response = await client.get(endpoint);
        return response;
        }
        catch(error){
            console.log('Unable to get the resource:',error);
        }
    }
}

export default new HttpMethods;