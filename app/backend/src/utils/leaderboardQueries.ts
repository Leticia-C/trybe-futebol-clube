export const teamHomeQuery = `SELECT t.team_name AS name,
    SUM(
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalPoints,
    COUNT(m.home_team_id) AS totalGames,
    SUM(
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalVictories,
      SUM(
        CASE
            WHEN home_team_goals = away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN home_team_goals < away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
    ROUND( (
            SUM(
                CASE
                    WHEN m.home_team_goals > m.away_team_goals THEN 3
                    WHEN m.home_team_goals = m.away_team_goals THEN 1
                    ELSE 0
                END
            ) / (COUNT(m.home_team_id) * 3) * 100
        ),
        2
    ) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.matches AS m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.home_team_id = t.id
   WHERE in_progress = 0
  GROUP BY name
   ORDER BY 
   totalPoints DESC,
   totalVictories DESC,
   goalsBalance DESC,
   goalsFavor DESC,
   goalsOwn ASC ;`;

export const teamAwayQuery = ` SELECT t.team_name AS name,
    SUM(
        CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalPoints,
    COUNT(m.away_team_id) AS totalGames,
    SUM(
        CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalVictories,
      SUM(
        CASE
            WHEN home_team_goals = away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN home_team_goals > away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
    ROUND( (
            SUM(
                CASE
                    WHEN m.home_team_goals < m.away_team_goals THEN 3
                    WHEN m.home_team_goals = m.away_team_goals THEN 1
                    ELSE 0
                END
            ) / (COUNT(m.away_team_id) * 3) * 100
        ),
        2
    ) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.matches AS m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.away_team_id = t.id
   WHERE in_progress = 0
  GROUP BY away_team_id
   ORDER BY 
   totalPoints DESC,
   totalVictories DESC,
   goalsBalance DESC,
   goalsFavor DESC,
   goalsOwn ASC ;`;

export const awayAndHomeTeamsQuery = ` SELECT t.team_name AS name,
    SUM(
        CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalPoints,
    COUNT(m.away_team_id) AS totalGames,
    SUM(
        CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalVictories,
      SUM(
        CASE
            WHEN home_team_goals = away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN home_team_goals > away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
    ROUND( (
            SUM(
                CASE
                    WHEN m.home_team_goals < m.away_team_goals THEN 3
                    WHEN m.home_team_goals = m.away_team_goals THEN 1
                    ELSE 0
                END
            ) / (COUNT(m.away_team_id) * 3) * 100
        ),
        2
    ) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.matches AS m
  INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.away_team_id = t.id
   WHERE in_progress = 0
  GROUP BY away_team_id
   ORDER BY 
   totalPoints DESC,
   totalVictories DESC,
   goalsBalance DESC,
   goalsFavor DESC,
   goalsOwn ASC ;`;
