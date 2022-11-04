var issueContainerEl = document.querySelector("#issues-container");
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //confirms succesful fetch
        if (response.ok){
            response.json().then(function(data){
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues){
    if(issues.length === 0){
        issueContainerEl.textContent = "No open issues with this repo!";
        return;
    }
    for (var i = 0; i < issues.length; i++){
        //create link element 
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
         //create span to hold issue title 
        var titleEl = document.createElement("span");
            titleEl.textContent = issues[i].title;
        //append title issue
            issueEl.appendChild(titleEl);
        //create type element 
        var typeEl = document.createElement("span");

        //issue check or pull check
        if (issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        } else{
            typeEl.textContent = "(Issue)"
        }
        //append to container
        issueEl.appendChild(typeEl);
        //append to html page
        issueContainerEl.appendChild(issueEl);

    }
}

getRepoIssues("shikaile/Challenge-5");