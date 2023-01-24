const videoElement = document.getElementsByClassName("html5-main-video")[0];

export const getParticipants = () => {
  var participants = Array.from(
    document.querySelectorAll(
      '[role="listitem"] >div:first-child  >div >div:first-child'
    )
  ).map((e) => {
    return e.innerText;
  });

  var user = participants[0].substring(0, participants[0].length - 6);

  return {
    msg: "data extracted",
    info: {
      participants,
      user,
    },
  };
};
