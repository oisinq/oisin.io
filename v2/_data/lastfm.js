module.exports = async function () {
  const fetch = require("node-fetch");

  const lastfmApiKey = process.env.LASTFM_API_KEY;

  if (!lastfmApiKey) {
    console.warn("You need to supply a lastfm API key to fetch album info.");
    return [];
  }

  // GitHub API: https://developer.github.com/v3/repos/#get
  return fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=oisin1001&api_key=${lastfmApiKey}&format=json&period=7day&limit=7`
  )
    .then((res) => res.json()) // node-fetch option to transform to json
    .then((json) => {
      // prune the data to return only what we want
      const albums = json.topalbums.album;

      const formattedAlbums = albums.map((album) => ({
        artist: album.artist.name,
        title: album.name,
        imageSrc: album.image.find((image) => image.size === "extralarge")[
          "#text"
        ],
        alt: `Album art for the album "${album.name}" by ${album.artist.name}`,
        url: album.url,
      }));

      return formattedAlbums;
    });
};
