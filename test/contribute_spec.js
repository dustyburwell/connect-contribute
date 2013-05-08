var spies  = require("spies");
var should = require("should");

var contribute = require("../");

describe("contribute()", function() {
  var req = {};
  var res = { headers: {} };

  describe("when options are explicit", function() {
    it("should add X-ContributeUrl to response from options", function(done) {
      var sut = contribute({ "contributeUrl": "http://example.com/contribute" })

      sut(req, res, function() {
        res.headers["X-ContributeUrl"].should.equal("http://example.com/contribute");
        done();
      });
    });

    it("should add X-IssuesLocation to response from options", function(done) {
      var sut = contribute({ "issuesLocation": "http://example.com/issues" })

      sut(req, res, function() {
        res.headers["X-IssuesLocation"].should.equal("http://example.com/issues");
        done();
      });
    });
  });

  it("should not set headers if the options aren't present", function(done) {
    var sut = contribute({ })

    sut(req, res, function() {
      should.not.exist(res.headers["X-ContributeUrl"]);
      should.not.exist(res.headers["X-IssuesLocation"]);
      done();
    });
  });

  describe("when package.json options are used", function() {
    it("should add X-ContributeUrl to response from repository location", function(done) {
      var sut = contribute({ repository: { url: "https://github.com/dustyburwell/connect-contribute.git" } })

      sut(req, res, function() {
        res.headers["X-ContributeUrl"].should.equal("https://github.com/dustyburwell/connect-contribute.git");
        done();
      });
    });

    it("should add X-IssuesLocation to response from repository location", function(done) {
      var sut = contribute({ repository: { url: "https://github.com/dustyburwell/connect-contribute.git" } })

      sut(req, res, function() {
        res.headers["X-IssuesLocation"].should.equal("https://github.com/dustyburwell/connect-contribute/issues");
        done();
      });
    });
  });
});