
export default {
    async fetch(request, env /*, ctx*/) {
        //Response class must be a promise
        try {
            if (request.method === "OPTIONS")
                return new Response(`preflight response for POST`, {
                    status: 200,
                    message: `preflight response for POST`,
                    headers: {
                        "Access-Control-Allow-Headers": [
                            //"Access-Control-Allow-Origin",
                            "Access-Control-Allow-Methods",
                            "Content-Type"
                            //"Origin",
                            //"X-Requested-With",
                            //"Accept"
                        ],
                        "Access-Control-Allow-Methods": ["POST", "OPTIONS"]
                    }
                });
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
        JSON.stringify(`{error:${"no access for this origin- " + origin}}`),
        {
            status: 400,
            message: "no access for this origin: " + origin
            //headers: { "Content-Type": "application/json" }
        }
    );
async function noException(req, env) {
    // key => Object ID; return new Response(JSON.stringify(backbank));
    // boot instance, if necessary //https://<worker-name>.<your-namespace>.workers.dev/
    //https://linc.sh/blog/durable-objects-in-production
    //const clientId = request.headers.get("cf-connecting-ip");
    var allowedOrigins = [
        "https://sausage.saltbank.org",
        "https://i7l8qe.csb.app",
        "https://vau.money",
        "https://jwi5k.csb.app",
        "https://mastercard-backbank.backbank.workers.dev"
    ];

    const urlObject = new URL(req.url); //.pathname;//path
    var origin = urlObject.origin; // request.headers.get("Origin");

    if (allowedOrigins.indexOf(origin) === -1) return noaccess(origin);
    const /*href = urlObject.searchParams.get("name"), */dataHead = {
        "Content-Type": "application/json"
    };

    return new Response(R, {
        status: 200,
        message:
            getAuth()
                .verifyIdToken(req.body.idToken)
                .then((decodedToken) => {
                    const uid = decodedToken.uid;
                    return uid ? "authenticated" : ""
                    // ...
                })
                .catch((error) => {
                    return "";
                }),
        headers: { ...dataHead }
    });
}

