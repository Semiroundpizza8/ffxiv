import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { translate } from './weather'
import Section from '../Section'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import UpcomingWeatherTable from './UpcomingWeatherTable'
import { Region } from './weather/consts'
import PARTITION from './weather/regions-partition'
import { useTranslation } from '../i18n'

const REGIONS = [
  Region.LaNoscea,
  Region.TheBlackShroud,
  Region.Thanalan,
  Region.IshgardAndSurroundingAreas,
  Region.GyrAbania,
  Region.TheFarEast,
  Region.Norvrandt,
  Region.Others
]

const useStyles = makeStyles(theme => ({
  options: {
    marginBottom: theme.spacing(2)
  }
}))

type Props = {
  now?: Date
}

const UpcomingWeather = ({ now }: Props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('skywatcher')
  const router = useRouter()
  const [filter, setFilter] = useState<Region | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [showLocalTime, setShowLocalTime] = useState(false)
  const [showWeatherChance, setShowWeatherChance] = useState(false)
  const locale = i18n.language

  useEffect(() => {
    const queryFilter = String(router.query.filter)
    setFilter(Object.values(Region).includes(queryFilter as Region) ? queryFilter as Region : null)
  }, [router.query.filter])

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value === 'none' ? null : (event.target.value as Region)
    router.push({
      pathname: router.pathname,
      query: filter && { filter }
    })
  }

  const handleToggleLabels = () => { setShowLabels(!showLabels) }
  const handleToggleLocalTime = () => { setShowLocalTime(!showLocalTime) }
  const handleToggleWeatherChance = () => { setShowWeatherChance(!showWeatherChance) }

  return (
    <Section title={t('upcomingWeather')}>
      <Grid container spacing={1} className={classes.options}>
        <Grid item xs={12}>
          <FormControl variant='filled' fullWidth margin='dense'>
            <InputLabel>{t('selectRegion')}</InputLabel>
            <Select onChange={handleSelectFilter} value={filter || 'none'}>
              <MenuItem value='none'>{t('showAllRegions')}</MenuItem>
              {REGIONS.map(region =>
                <MenuItem key={region} value={region}>{translate('region', region, locale)}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showLabels}
                onChange={handleToggleLabels}
                color='primary'
              />
            }
            label={t('showLabels')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showLocalTime}
                onChange={handleToggleLocalTime}
                color='primary'
              />
            }
            label={t('showLocalTimes')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showWeatherChance}
                onChange={handleToggleWeatherChance}
                color='primary'
              />
            }
            label={<>Show <code>weatherChance</code></>}
          />
        </Grid>
      </Grid>
      <NoSsr>
        {(() => {
          if (!now) return null

          const sections = (filter ? [filter] : REGIONS).map(region => ({ region, zones: PARTITION[region] }))
          return sections.map(({ region, zones }) =>
            <Section key={region}>
              <Typography variant='h6' gutterBottom>{translate('region', region, locale)}</Typography>
              <UpcomingWeatherTable
                now={now}
                zones={zones}
                showLabels={showLabels}
                showLocalTime={showLocalTime}
                showWeatherChance={showWeatherChance}
              />
            </Section>
          )
        })()}
      </NoSsr>
    </Section>
  )
}

export default UpcomingWeather
