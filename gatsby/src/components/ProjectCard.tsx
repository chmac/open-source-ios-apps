import {
  Card,
  CardContent,
  createStyles,
  Divider,
  GridList,
  GridListTile,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import Star from '@material-ui/icons/Star'
import FsLightbox from 'fslightbox-react'
import React, { useState } from 'react'
import { Project } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: '1.2em',
    },
  }),
)

const urlToReaddable = (url: string) => {
  if (url.indexOf('https://github.com/') === 0) {
    return `@${url.substr('https://github.com/'.length)}`
  } else if (url.indexOf('http://github.com/') === 0) {
    return `@${url.substr('http://github.com/'.length)}`
  } else return url
}

const starCountToIconCount = (githubStars: number): number => {
  if (githubStars > 2000) {
    return 5
  } else if (githubStars > 1000) {
    return 4
  } else if (githubStars > 500) {
    return 3
  } else if (githubStars > 200) {
    return 2
  } else if (githubStars > 100) {
    return 1
  } else return 0
}

const RepeatingStars = ({ count }: { count: number }) => {
  return (
    <span>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} />
      ))}
    </span>
  )
}

const ProjectCard = ({ project }: { project: Project }) => {
  const classes = useStyles()
  const [toggler, setToggler] = useState(false)
  const [slide, setSlide] = useState(1)

  const showStarCount = starCountToIconCount(project.stars)

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h2">
          {project.title}
        </Typography>
        {showStarCount > 0 ? <RepeatingStars count={showStarCount} /> : null}
        <Typography className={classes.description}>
          {project.description}
        </Typography>
        <Divider />
        <Typography>Lang: {project.lang || 'en'}</Typography>
        <Typography>Added: {project.date_added}</Typography>
        <Typography>GitHub Stars: {project.stars}</Typography>
        <Typography>
          Code:{' '}
          {project.source ? (
            <a href={project.source} target="_blank" rel="noreferrer">
              {urlToReaddable(project.source)}
            </a>
          ) : (
            'n/a'
          )}
        </Typography>
        <Typography>
          iTunes:{' '}
          {project.itunes ? (
            <a href={project.itunes} target="_blank" rel="noreferrer">
              {project.itunes}
            </a>
          ) : (
            'n/a'
          )}
        </Typography>
        <Typography>
          Homepage:{' '}
          {project.homepage ? (
            <a href={project.homepage} target="_blank" rel="noreferrer">
              {project.homepage}
            </a>
          ) : (
            'n/a'
          )}
        </Typography>
        {project.screenshots && project.screenshots.length > 0 ? (
          <>
            <GridList cellHeight={160} cols={4}>
              {project.screenshots.map((url, i) => {
                return (
                  <GridListTile key={url} cols={1}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={event => {
                        event.preventDefault()
                        setSlide(i + 1)
                        setToggler(true)
                      }}
                    >
                      <img src={url} alt={`Screenshot ${i + 1}`} />
                    </a>
                  </GridListTile>
                )
              })}
            </GridList>
            <FsLightbox
              toggler={toggler}
              sources={project.screenshots}
              slide={slide}
              onClose={() => setToggler(false)}
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default ProjectCard
