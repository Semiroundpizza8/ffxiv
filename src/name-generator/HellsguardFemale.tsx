import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Section from '../Section'
import NameAutocomplete from './NameAutocomplete'
import MyNameIs from './MyNameIs'
import names from './ffxiv-name-generator/data/chara-make-names.json'
import { translate, Clan, Gender } from './ffxiv-name-generator'
import { formatName } from './ffxiv-name-generator/src/utils'
import { useTranslation } from '../i18n'

const HellsguardFemale = () => {
  const { t, i18n } = useTranslation('name-generator')
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const name = formatName(forename, surname)
  const locale = i18n.language

  return (
    <Section title={`${translate('clan', Clan.Hellsguard, locale)} (${translate('gender', Gender.Female, locale)})`}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={names.RoegadynHellsguardFirstName}
            value={forename}
            onChange={setForename}
            label={t('forename')}
            placeholder={t('enterForename')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Hellsguard names are formed from two words translated to modern Eorzean, typically a descriptor and a noun. They tend to draw heavily from nature, whether it’s a vegetable, an animal, animate, inanimate, abstract, or concrete. For female names, the second word tends to plant imagery (e.g. “Lily”, “Orchid”), though there are many that do not, and it is not exclusive to female names.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={names.RoegadynHellsguardFemaleLastName}
            value={surname}
            onChange={setSurname}
            label={t('surname')}
            placeholder={t('enterSurname')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Highly independent in nature, Hellsguard who leave their mountain homes for the city-states of Eorzea will often drop their family names.
          </Typography>
        </Grid>
        {name && (
          <Grid item xs={12}>
            <MyNameIs name={name} />
          </Grid>
        )}
      </Grid>
    </Section>
  )
}

export default HellsguardFemale
