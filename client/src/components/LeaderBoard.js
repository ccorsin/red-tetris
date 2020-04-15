import React, { useState, useEffect } from "react";
import { StyledLeaderBoardBoard, StyledLeaderBoardTitle, StyledLeaderBoardRank, StyledLeaderBoardTable, StyledLeaderBoardPlayers, StyledLeaderBoardDetail } from './styles/StyledLeaderBoard';
import API from '../utils/API';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const getLeaderBoard = async () => {
    const tmp = (await API.get('/leaderboard/')).data;
    setLeaderboard(tmp);
  }
  useEffect(() => {
    getLeaderBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledLeaderBoardTable>
      <StyledLeaderBoardTitle>
        LEADERBOARD
      </StyledLeaderBoardTitle>
      <StyledLeaderBoardBoard>
        <StyledLeaderBoardRank>
          <StyledLeaderBoardDetail>rank</StyledLeaderBoardDetail>
          <StyledLeaderBoardDetail>player</StyledLeaderBoardDetail>
          <StyledLeaderBoardDetail>score</StyledLeaderBoardDetail>
        </StyledLeaderBoardRank>
        <StyledLeaderBoardPlayers>
          {leaderboard.map((e, i) => (
            <StyledLeaderBoardRank key={i}>
              <StyledLeaderBoardDetail>{i + 1}</StyledLeaderBoardDetail>
              <StyledLeaderBoardDetail>{e.player_name}</StyledLeaderBoardDetail>
              <StyledLeaderBoardDetail>{e.score}</StyledLeaderBoardDetail>
            </StyledLeaderBoardRank>
          ))}
        </StyledLeaderBoardPlayers>
      </StyledLeaderBoardBoard>
    </StyledLeaderBoardTable>
  )
};

export default LeaderBoard;