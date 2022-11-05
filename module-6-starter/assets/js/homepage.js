var userFormEL = document.querySelector("#user-form");
var nameInputEL = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonEl = document.querySelector("#language-buttons");

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
};

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
        var repoEL = document.createElement("a");
        repoEL.classList = "list-item flex-row justify-space-between align-center";
        repoEL.setAttribute("href", "./single-repo.html?repo=" + repoName);
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

var getFeaturedRepos = function(language){
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
            displayRepos(data.items, language);
            });
        } else {
            alert('Error: Github User Not Found');
        }
    });
};

var buttonClickHandler = function(event){
    var language = event.target.getAttribute("data-language");
    
    if(language){
        getFeaturedRepos(language);

        //clear old content
        repoContainerEl.textContent = "";
    }
};

userFormEL.addEventListener("submit", formSubmitHandle);
languageButtonEl.addEventListener("click", buttonClickHandler);