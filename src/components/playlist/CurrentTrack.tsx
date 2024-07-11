'use client'

import { useTrackContext } from "@/lib/TrackWrapper";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import { convertSlugUrl } from "@/utils/API";

interface IProps {
    track: IShareTrack;
}
const CurrentTrack = (props: IProps) => {
    const { track } = props;

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    return (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Typography sx={{ py: 2 }}>
                <Link
                    style={{ textDecoration: "none", color: "unset" }}
                    href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                >
                    {track.title}
                </Link>
            </Typography>

            <Box sx={{ display: "flex", "alignItems": "center" }}>
                {
                    (track._id !== currentTrack._id ||
                        track._id === currentTrack._id && currentTrack.isPlaying === false
                    )
                    &&
                    <IconButton aria-label="play/pause"
                        onClick={(e) => {
                            setCurrentTrack({ ...track, isPlaying: true });
                        }}
                    >
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                }

                {track._id === currentTrack._id && currentTrack.isPlaying === true
                    &&
                    <IconButton aria-label="play/pause"
                        onClick={(e) => {
                            setCurrentTrack({ ...track, isPlaying: false });
                        }}
                    >
                        <PauseIcon sx={{ height: 38, width: 38 }}
                        />
                    </IconButton>
                }
            </Box>
        </Box>
    )
}

export default CurrentTrack;
