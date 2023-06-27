import { useState, useEffect } from 'react';
import '../styles/DisplayRank.css';

let ghostTimer = 0;
//Broken 
function DisplayRank({ currentWord, currentTime, sampleAmount, ghostFinish}) {
  const [ghostProgress, setGhostProgress] = useState(0.0);
  const [winner, setWinner] = useState(0);

  useEffect (() => {
    ghostTimer = performance.now();
  }, []);

  useEffect(()=>{
      if (ghostProgress < 1) {
        let myInterval = setInterval(() => {
              //55 is the Ghost wpm
              //60 is 60 seconds in a minute
              console.log('before' + ghostProgress);
              setGhostProgress(((55/60)/sampleAmount) + ghostProgress); 
              console.log(ghostProgress);
              if (ghostProgress > (1 - ((55/60)/sampleAmount))) {
                setGhostProgress(1);
                let ghostTimerDone = performance.now();
                console.log('DisplayRank ghostTime:  ' + ghostTimerDone - ghostTimer);
                ghostFinish(ghostTimerDone - ghostTimer);
                if (ghostProgress > ((currentWord) / (sampleAmount))) {
                  setWinner(-1);
                }
                else {
                  setWinner(1);
                }
              }
              console.log(ghostProgress);
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
            };
      }
  });

  console.log ('currentWord: ' + currentWord);
  console.log( 'current time: ' + currentTime);
  console.log('outside' + ghostProgress);
  console.log(((currentWord) / (sampleAmount)));
  if (ghostProgress > 1) {
    setGhostProgress(1);
    let ghostTimerDone = performance.now();
    console.log('DisplayRank ghostTime:  ' + ghostTimerDone - ghostTimer);
    ghostFinish(ghostTimerDone - ghostTimer);
    if (ghostProgress > ((currentWord) / (sampleAmount))) {
      setWinner(-1);
    }
    else {
      setWinner(1);
    }
    console.log('here');

    //ghostFinish(currentTime);
  }
  return (
    <div className="rankingBox">
      { ((currentWord) / (sampleAmount)) > ghostProgress || winner === 1
        ? 
        <div className="displayRanksBox">
          <div className="playerStatsBoxUser">
            <div className="playerTitle">You</div>
            <div className="playerCompletion">{(Math.floor((currentWord / (sampleAmount)) * 100) > 100)
                 ? 100
                 : Math.floor((currentWord / (sampleAmount)) * 100)
            }%</div>
            <div className="playerWPM">{currentWord === 0
            ? 0
            : Math.floor((currentWord / (currentTime / 1000)) * 60)} WPM</div>
          </div>
          <div className="playerStatsBoxGhost">
            <div className="playerTitle">Ghost</div>
            <div className="playerCompletion">{Math.floor(ghostProgress * 100) > 100
                  ? 100 
                  : Math.floor(ghostProgress * 100)}%</div>
            <div className="playerWPM">55 WPM</div>
          </div>
        </div>
        :
        <div className="displayRanksBox">
          <div className="playerStatsBoxGhost">
            <div className="playerTitle">Ghost</div>
            <div className="playerCompletion">{Math.floor(ghostProgress * 100) > 100
                  ? 100 
                  : Math.floor(ghostProgress * 100)}%</div>
            <div className="playerWPM">55 WPM</div>
          </div>
          <div className="playerStatsBoxUser">
            <div className="playerTitle">You</div>
            <div className="playerCompletion">{(Math.floor((currentWord / (sampleAmount)) * 100) > 100)
                 ? 100
                 : Math.floor((currentWord / (sampleAmount)) * 100)
            }%</div>
            <div className="playerWPM">{currentWord === 0
            ? 0
            : Math.floor((currentWord / (currentTime / 1000)) * 60)} WPM</div>
          </div>
        </div>
      }
      <div className="ranksBox">
        <div className="placement">1</div>
        <div className="placement">2</div>
      </div>
    </div>
  );
}

export default DisplayRank;