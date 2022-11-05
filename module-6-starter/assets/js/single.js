var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function(){
    var queryString = document.location.search;
    var repoName =queryString.split("=")[1];

    getRepoIssues(repoName);
    repoNameEl.textContent = repoName;
};

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //confirms succesful fetch
        if (response.ok){
            response.json().then(function(data){
                displayIssues(data);

                if(response.headers.get("Link")){
                    displayWarning(repo)
                }
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

var displayWarning = function(repo){
    //add text to warning containter
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on Github";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();