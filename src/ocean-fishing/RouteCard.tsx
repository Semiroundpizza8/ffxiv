import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { fishingSpots } from './gists/data'
import * as maps from './maps'
import { translate } from './utils'
import { useTranslation } from '../i18n'

const useStyles = makeStyles(() => ({
  routeCard: {
    height: '100%'
  }
}))

type Props = {
  index: number,
  stop: maps.StopTime,
  children?: React.ReactNode
}

const RouteCard = ({ index, stop, children }: Props) => {
  const classes = useStyles()
  const { i18n } = useTranslation()
  const locale = i18n.language

  return (
    <Grid item xs={12} md={4}>
      <Card variant='outlined' className={classes.routeCard}>
        <CardHeader
          title={
            <Typography variant='h6'>
              {index + 1}. {translate(locale, fishingSpots[maps.STOP_MAP[stop[0]]], 'place_name_sub')} {maps.TIME_MAP[stop[1]]}
            </Typography>
          }
          disableTypography
        />
        {children}
      </Card>
    </Grid>
  )
}

export default RouteCard
