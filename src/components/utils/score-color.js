export const VoteColors = {
    UNKNOWN: '#999',
    BAD: '#d63737',
    OK: '#a7a7a7',
    GOOD: '#5fbb67',
    EXCELLENT: '#3bb33b'
}

export function getScoreColor(score) {
    let color = VoteColors.EXCELLENT
    if(!score || score === 0) color = VoteColors.UNKNOWN
    else if(score < 5.5) color = VoteColors.BAD
    else if(score < 6.5) color = VoteColors.OK
    else if(score < 7.25) color = VoteColors.GOOD

    return color
}
