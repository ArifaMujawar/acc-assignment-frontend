import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    //maxWidth: 345,
    height: 330,
    width: 315,
    padding: 20,
    margin: 20,
  },
  media: {
    height: 140,
  },
})

export default function PlaceCards({ place }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={place.description.images.length > 0 && place.description.images[0].url}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {place.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {place.address}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {place.info ? 'OPEN' : 'CLOSE'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
