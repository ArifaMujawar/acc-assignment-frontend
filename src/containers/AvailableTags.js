import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
)

export default function AvailableTags({ tags, handleChange, newTags }) {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Tags</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={newTags} onChange={handleChange}>
        {tags &&
          tags.map((tag, index) => (
            <MenuItem key={index} value={tag}>
              {tag}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
