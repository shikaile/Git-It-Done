var userFormEL = document.querySelector("#user-form");
var nameInputEL = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {

    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response){
        
        if (response.ok){
        response.json().then(function(data) {        
            displayRepos(data, user);
        });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
        .catch(function(error){
        // Notice `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to GitHub");
    });

};

var formSubmitHandle = function(event) {
    event.preventDefault();

    var username = nameInputEL.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEL.value = "";
    } else {
        alert("please enter a Github username");
    }
    console.log(event);
};

userFormEL.addEventListener("submit", formSubmitHandle);

var displayRepos = function(repos, searchTerm) {
    //check is api returned repos 
    if (repos.length === 0){
        repoContainerEl.textContent= "No repos found.";
        return;
    }
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i =0; i< repos.length; i++){
        //format repo name
        var repoName =repos[i].owner.login + "/" + repos[i].name;

        //create container for each repo
        var repoEL = document.createElement("div");
        repoEL.classList = "list-item flex-row justify-space-between align-center";

        //create span el to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        
        //append to container
        repoEL.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //checkif current repo has issue
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML= 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"; 
        }

        //append to container
        repoEL.appendChild(statusEl);
        //append container to dom
        repoContainerEl.appendChild(repoEL);


    }
};