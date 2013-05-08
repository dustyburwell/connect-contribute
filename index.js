module.exports = function(options) {
  options = options || {};

  if (options.repository && options.repository.url) {
    var repo = options.repository.url;
    options.contributeUrl  = options.contributeUrl || repo;
    options.issuesLocation = options.issuesLocation || repo.replace(/(\.git)?$/, "/issues");
  }

  return function contribute(req, res, next) {
    res.headers["X-ContributeUrl"]  = options.contributeUrl;
    res.headers["X-IssuesLocation"] = options.issuesLocation;
    next();
  }
}