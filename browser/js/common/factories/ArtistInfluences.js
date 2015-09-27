app.factory('ArtistInfluences', function ($http) {
    var influenceTimeLine = [];

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    function getDirectInfluences(artistName) {
        return $http.get('/api/artistInfluences/' + artistName)
            .then(function(response) {
                return response.data;
            })
            .catch(function(err) {
                return err;
            });
    };

    function getInfluenceTimeLine(artistName) {
        return getDirectInfluences(artistName).then(function(influences) {
            console.log('Direct Influences: ', influences);
            var randomInfluencer;
            influences = shuffleArray(influences);

            if (influences.length === 0) {
                return influenceTimeLine;
            } else if (influences.length === 1) {
                randomInfluencer = influences.pop();
                influenceTimeLine.push(randomInfluencer);
            } else if (influenceTimeLine.length <= 9) {
                // influenceTimeLine.push(influences.pop());
                randomInfluencer = influences.pop();
                influenceTimeLine.push(randomInfluencer);
            }

            if (influenceTimeLine.length > 9) {
                return influenceTimeLine;
            } else {
                return getInfluenceTimeLine(randomInfluencer);
            }
        });   
    };

    return {
        getArtistInfluences: function(artistName) {
            influenceTimeLine = [];
            return getInfluenceTimeLine(artistName);
        }
    };

});
