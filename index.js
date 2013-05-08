var url  = require("url");
var path = require("path")

module.exports = function(options) {

  if (options.repository && options.repository.url) {
    var repo = options.repository.url;
    options.contributeUrl  = repo;
    options.issuesLocation = repo.replace(/(\.git)?$/, "/issues");
  }

  return function contribute(req, res, next) {
    res.headers["X-ContributeUrl"] = options.contributeUrl;
    res.headers["X-IssuesLocation"] = options.issuesLocation;
    next();
  }
}