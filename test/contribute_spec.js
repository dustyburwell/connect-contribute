var spies  = require("spies");
var should = require("should");

var contribute = require("../");

describe("contribute()", function() {
  var req = {};
  var res = { headers: {} };

  var because = function(options, callback) {
    var sut = contribute(options);
    sut(req, res, callback);
  };

  describe("when no options are passed", function() {
    var options = null;

    it("should not set headers", function(done) {
      because(options, function() {
        should.not.exist(res.headers["X-ContributeUrl"]);
        should.not.exist(res.headers["X-IssuesLocation"]);
        done();
      });
    });
  });

  describe("when options are empty", function() {
    var options = {};

    it("should not set headers", function(done) {
      because(options, function() {
        should.not.exist(res.headers["X-ContributeUrl"]);
        should.not.exist(res.headers["X-IssuesLocation"]);
        done();
      });
    });
  });

  describe("when options are explicit", function() {
    var options = {
      contributeUrl: "http://example.com/contribute",
      issuesLocation: "http://example.com/issues"
    };

    it("should add X-ContributeUrl to response from options", function(done) {
      because(options, function() {
        res.headers["X-ContributeUrl"].should.equal("http://example.com/contribute");
        done();
      });
    });

    it("should add X-IssuesLocation to response from options", function(done) {
      because(options, function() {
        res.headers["X-IssuesLocation"].should.equal("http://example.com/issues");
        done();
      });
    });
  });

  describe("when package.json options are used", function() {
    var options = { repository: { url: "https://github.com/dustyburwell/connect-contribute.git" } };

    it("should add X-ContributeUrl to response from repository location", function(done) {
      because(options, function() {
        res.headers["X-ContributeUrl"].should.equal("https://github.com/dustyburwell/connect-contribute.git");
        done();
      });
    });

    it("should add X-IssuesLocation to response from repository location", function(done) {
      because(options, function() {
        res.headers["X-IssuesLocation"].should.equal("https://github.com/dustyburwell/connect-contribute/issues");
        done();
      });
    });
  });

  describe("when package.json options are used and overrides are specified", function() {
    var options = { 
      contributeUrl: "http://example.com/contribute",
      issuesLocation: "http://example.com/issues",
      repository: { 
        url: "https://github.com/dustyburwell/connect-contribute.git" 
      } 
    };

    it("should add X-ContributeUrl to response from options", function(done) {
      because(options, function() {
        res.headers["X-ContributeUrl"].should.equal("http://example.com/contribute");
        done();
      });
    });

    it("should add X-IssuesLocation to response from options", function(done) {
      because(options, function() {
        res.headers["X-IssuesLocation"].should.equal("http://example.com/issues");
        done();
      });
    });
  });
});