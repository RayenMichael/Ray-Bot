module.exports = async (client) => {
  await client.user.setActivity("The Leaderboard", {
    type: "WATCHING",//can be LISTENING, WATCHING, PLAYING, STREAMING
  });
};