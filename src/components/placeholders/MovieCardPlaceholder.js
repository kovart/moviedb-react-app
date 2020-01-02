import {Box} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import React from "react"


export default function MovieCardPlaceholder() {
    return (
        <Box>
            <Skeleton variant="rect" width={'100%'} height={270}/>
            <Skeleton variant="rect" style={{marginTop: 15}} width='100%'/>
            <Skeleton variant="rect" style={{marginTop: 8}} width='70%'/>
        </Box>
    )
}
