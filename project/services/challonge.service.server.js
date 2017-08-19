var request = require("sync-request");

var apiKey = 'x2S2RebBbkRLFRun7SvpdmgoulBp6VbUpkjy8MBc';
var frontUrl = "https://api.challonge.com/v1/tournaments/"
var endUrl = ".json?api_key=" + apiKey

module.exports = {getMatches: getMatches};

function getMatches(bracketId, tag) {
    var participantsUrl = frontUrl + bracketId + "/participants" + endUrl;

    var res = request('GET', participantsUrl);
    var tags = idToTag(JSON.parse(res.getBody()))
    var playerId = participantId(tag, tags);

    var endUrl2 = endUrl + "&participant_id=" + playerId;
    var matchesUrl = frontUrl + bracketId + "/matches" + endUrl2;
    res = request('GET', matchesUrl);
    return nameMatches(tags, JSON.parse(res.getBody()));
}

function idToTag(participants) {
    var tags = {};
    for (var p in participants) {
        tags[participants[p].participant.id] = participants[p].participant.display_name;
    }
    return tags;
}

function participantId(tag, participants) {
    for (var p in participants) {
        if (participants[p] === tag) {
            return p;
        }
    }
    return 0;
}

function nameMatches(tags, matches) {
    var cleanMatches = [];
    for (var m in matches) {var match = (matches[m])['match'];
        var smallMatch = {};
        smallMatch.player1 = tags[match["player1_id"]];
        smallMatch.player2 = tags[match["player2_id"]];
        smallMatch.score = match["scores_csv"];

        cleanMatches.push(smallMatch);
    }
    return cleanMatches;
}

console.log(getMatches("aliceAdmin", "Alice"));

