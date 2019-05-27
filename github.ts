async function gql(query: String): Promise<any> {
    const env = Deno.env()
    const githubToken = env["GITHUB_TOKEN"]
    const auth = `bearer ${githubToken}`

    // console.log("auth", auth)
    const r = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: [
            ["Authorization", auth],
            ["User-Agent", "deno"],
        ],
        body: JSON.stringify({
            query: query
        })
    })
    return r.json();
}

(async () => {

    const r = await gql(`{
        viewer {
            login
        }
    }`)

    console.log(r.data.viewer.login)
})();
