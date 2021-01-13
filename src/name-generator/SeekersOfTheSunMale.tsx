import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Section from '../Section'
import NameAutocomplete from './NameAutocomplete'
import MyNameIs from './MyNameIs'
import { translate } from './names'
import { upperFirst } from './names/utils'
import { Clan, Gender } from './names/types'
import { FORENAMES } from './names/generate-miqote'
import miqoteTribes from './names/data/miqote-tribes.json'
import i18n from '../i18n'
import { I18n, TFunction } from 'next-i18next'

type Props = {
  t: TFunction,
  i18n: I18n
}

const SeekersOfTheSunMale = ({ i18n }: Props) => {
  const [forename, setForename] = useState('')
  const [tribe, setTribe] = useState('')
  const [surname, setSurname] = useState('')
  const name = `${upperFirst([tribe, forename].filter(x => x).join('’'))} ${upperFirst(surname)}`.trim()
  const locale = i18n.language

  return (
    <Section title={`${translate('clan', Clan.SeekersOfTheSun, locale)} (${translate('gender', Gender.Male, locale)})`}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={
              FORENAMES[Clan.SeekersOfTheSun][Gender.Male]
                .map(name => upperFirst(name.replace(/^.*’/, '')))
                .filter((name, index, array) => array.indexOf(name, index + 1) === -1)
            }
            value={forename}
            onChange={setForename}
            label='Forename'
            placeholder='Enter a forename'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Most males have simple names. The extra “h”s (e.g. “B<b>h</b>ee”, “Kuz<b>h</b>”, and “Pa<b>h</b>sh”) represent a slight hissing/spitting sound that are pronounced by the Miqo’te and ignored by the other races.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={Object.keys(miqoteTribes)}
            getOptionLabel={tribe => `${tribe} - ${miqoteTribes[tribe]}`}
            value={tribe}
            onChange={setTribe}
            label='Tribe'
            placeholder='Enter a tribe'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            The forename is always preceeded by a letter representing their tribe.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={['Tia', 'Nunh']}
            value={surname}
            onChange={setSurname}
            label='Position'
            placeholder='Tia or Nunh'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Males do not have surnames, and will instead take on “Tia” or “Nunh” denoting their position within the tribe.
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

export default i18n.withTranslation('name-generator')(SeekersOfTheSunMale)
