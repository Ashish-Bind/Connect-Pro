import { keyframes, Skeleton, styled } from '@mui/material'
import { Link as LinkComponent } from 'react-router-dom'
import { gray } from '../../constants/color'

export const VisuallyHiddenInput = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
})

export const Link = styled(LinkComponent)({
  textDecoration: 'none',
  color: 'black',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
})

export const InputBox = styled('input')`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${gray};
`

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}))
