import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Section from '../Section'
import NameAutocomplete from './NameAutocomplete'
import MyNameIs from './MyNameIs'
import { translate } from './names'
import { upperFirst } from './names/utils'
import { Clan, Gender } from './names/types'
import { FORENAMES, SURNAMES } from './names/generate-elezen'
import i18n from '../i18n'
import { I18n, TFunction } from 'next-i18next'

type Props = {
  t: TFunction,
  i18n: I18n
}

const DuskwightMale = ({ i18n }: Props) => {
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const name = `${upperFirst(forename)} ${upperFirst(surname)}`.trim()
  const locale = i18n.language

  return (
    <Section title={`${translate('clan', Clan.Duskwight, locale)} (${translate('gender', Gender.Male, locale)})`}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={[...FORENAMES[Gender.Male], ...SURNAMES[Clan.Wildwood], ...SURNAMES[Clan.Duskwight]]}
            value={forename}
            onChange={setForename}
            label='Forename'
            placeholder='Enter a forename'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Spelling and phonetic rules are similar to those of French. Male forenames are longer than female forenames and end in an “x” (e.g. “‑loix” and “‑aux”) or a silent “t” (e.g. “‑mont” and “‑geant”).
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NameAutocomplete
            options={SURNAMES[Clan.Duskwight]}
            value={surname}
            onChange={setSurname}
            label='Surname'
            placeholder='Enter a surname'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography paragraph>
            Duskwight and Wildwood Elezen will never share surnames.
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

export default i18n.withTranslation('name-generator')(DuskwightMale)