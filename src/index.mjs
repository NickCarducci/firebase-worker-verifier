
export default {
    async fetch(request, env /*, ctx*/) {
        //Response class must be a promise
        try {
            if (request.method === "OPTIONS") {
                var allowedOrigins = [
                    "https://i7l8qe.csb.app",
                    "https://vau.money",
                ];

                //const urlObject =  new URL(req.url); //.pathname;//path
                var origin = request.headers.get("Origin");// urlObject.origin; //
                console.log("options ", Object.keys(request), origin)
                if (allowedOrigins.indexOf(origin) === -1) return noaccess(origin);
                return new Response(`preflight response for POST`, {

                    status: 200,
                    message: `preflight response for POST`,
                    headers: {
                        "Accept": "Application/JSON",
                        "Access-Control-Allow-Origin":origin,//new URL(req.url),//
                        //https://developer.mozilla.org/en-US/docs/Glossary/Response_header
                        "Access-Control-Allow-Headers": [
                            "Content-Type",
                            "Allow", "Origin",
                        ],
                        "Access-Control-Allow-Methods": ["POST", "OPTIONS"]
                    }
                });
            }
            return await noException(request, env);
            // wrap the body of your callback in a try/catch block to ensure it cannot throw an exception.
            // is return, "the body?"
        } catch (e) {
            return new Response(e.message);
        }
    }
};
const noaccess = (origin) =>
    new Response(
        JSON.stringify(`{error: ${"no access for this origin- " + origin}}`),
        {
            status: 400,
            message: "no access for this origin: " + origin
            //headers: { "Content-Type": "application/json" }
        }
    );
async function noException(re, env) {
    // key => Object ID; return new Response(JSON.stringify(backbank));
    // boot instance, if necessary //https://<worker-name>.<your-namespace>.workers.dev/
    //https://linc.sh/blog/durable-objects-in-production
    //const clientId = request.headers.get("cf-connecting-ip");

    let req = new Request(re);
    console.log("post: noException ", JSON.stringify(req));
    const json = await req.body.json()
    console.log(json);
    const idToken = JSON.stringify(json.idToken);
    console.log(idToken);
    const dataHead = {
        //"Access-Control-Allow-Origin": req.headers.get("Origin"),
        "Content-Type": "application/json"
    };//https://developers.cloudflare.com/workers/examples/read-post/
    /*href = urlObject.searchParams.get("name"), */
    return new Response(R, {
        status: 200,
        message:
            await getAuth()
                .verifyIdToken(idToken)
                .then((decodedToken) => {
                    //const uid = decodedToken.uid;
                    //return uid ? "authenticated" : ""
                    return decodedToken;
                })
                .catch((error) => {
                    return "{}";
                }),
        headers: { ...dataHead }
    });
}

