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
        repository(owner:"sunfmin", name:"notebook") {
            issues(last:20) {
                edges {
                    node {
                        title
                        url
                    }
                }
            }
        }
    }`)

    console.log(r.data.viewer.login)
    console.log("---")
    for (let issue of r.data.repository.issues.edges) {
        console.log(`${issue.node.title} | href=${issue.node.url}`)
    }

})();
