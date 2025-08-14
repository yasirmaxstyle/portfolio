const stats = `
-- stats.sql
-- Career Statistics Query

SELECT 
    'yasirmaxstyle' AS developer_name,
    9999 AS cups_of_coffee,
    'Go' AS favorite_backend,
    'React' AS favorite_frontend,
    'Always Learning' AS current_status,
    'Building Amazing Things' AS mission;

-- Skills Breakdown
SELECT 
    skill_category,
    skill_name,
    proficiency_level,
    years_of_experience
FROM skills 
WHERE developer_id = 'yasirmu77'
ORDER BY proficiency_level DESC;

-- Recent Achievements
SELECT 
    achievement,
    date_accomplished,
    impact_level
FROM achievements 
WHERE developer_id = 'yasirmu77'
    AND date_accomplished >= '2024-01-01'
ORDER BY date_accomplished DESC
LIMIT 10;

-- Coffee Consumption Analytics
SELECT 
    DATE_FORMAT(date, '%Y-%m') as month,
    SUM(cups_consumed) as total_cups,
    AVG(productivity_score) as avg_productivity
FROM daily_stats 
WHERE developer_id = 'yasirmu77'
GROUP BY DATE_FORMAT(date, '%Y-%m')
ORDER BY month DESC;
`

export default stats