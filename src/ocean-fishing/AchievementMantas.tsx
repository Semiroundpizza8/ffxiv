import React from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import AchievementInformation from './AchievementInformation'
import RouteCardContainer from './RouteCardContainer'
import RouteCard from './RouteCard'
import BaitList from './BaitList'
import Tug from './Tug'
import { getStops, getBaitGroup } from './utils'
import * as maps from './maps'

type Props = {
  selectedRoute: maps.DestinationStopTime
}

const AchievementJellyfish = ({ selectedRoute }: Props) => {
  const stops = getStops(selectedRoute)

  return (
    <AchievementInformation achievement={2756} subtitle='catch 25 mantas (solo)'>
      <RouteCardContainer>
        <RouteCard index={0} stop={stops[0]}>
          <CardContent>
            <BaitList
              baitGroups={[{
                header: 'DH; DH-IC–DH post-spectral at 12-26s',
                baitGroupProps: { showDH: true, ...getBaitGroup(32058) }
              }, {
                header: 'DH at <3s',
                baitGroupProps: { showDH: true, ...getBaitGroup(32070) }
              }]}
            />
          </CardContent>
          <CardContent>
            <Typography variant='overline'>Pre-spectral</Typography>
            <Typography paragraph>
              IC or blind DH if capped, but save GP for spectral current.
            </Typography>
            <Typography variant='overline'>Spectral</Typography>
            <Typography paragraph>
              Only the instant <Tug strength={3} /> is Jetborne Manta. Callichthyid appears at 5s.
            </Typography>
            <Typography variant='overline'>Post-spectral</Typography>
            <Typography paragraph>
              Spend all remaining GP on mantas.
            </Typography>
          </CardContent>
        </RouteCard>
        <RouteCard index={1} stop={stops[1]}>
          <CardContent>
            <Typography paragraph>
              No mantas here.
            </Typography>
            <Typography paragraph>
              You may opt for no spectral here for an extended one in the next zone.
            </Typography>
          </CardContent>
        </RouteCard>
        <RouteCard index={2} stop={stops[2]}>
          {(() => {
            switch (stops[2]) {
              case 'BN':
                return (
                  <>
                    <CardContent>
                      <BaitList
                        baitGroups={[{
                          header: 'DH at ≥5s',
                          baitGroupProps: { showDH: true, ...getBaitGroup(32087) }
                        }]}
                      />
                    </CardContent>
                    <CardContent>
                      <Typography variant='overline'>Spectral</Typography>
                      <Typography paragraph>
                        Reel any <Tug strength={2} />. Beatific Vision and Gory Tuna go away at 5s. Go for IC–DH if it’s all you need, instead of hoping for more blind DHs.
                      </Typography>
                    </CardContent>
                  </>
                )
              case 'TD':
                return (
                  <>
                    <CardContent>
                      <BaitList
                        baitGroups={[{
                          header: 'IC–DH at 4-5s',
                          baitGroupProps: { showDH: true, ...getBaitGroup(32111) }
                        }]}
                      />
                    </CardContent>
                    <CardContent>
                      <Typography variant='overline'>Spectral</Typography>
                      <Typography paragraph>
                        Reel any <Tug strength={2} />. Panoptes can possibly be a blind DH (needs confirmation). Don’t mooch Rothlyt Mussels for Panoptes; recast instead.
                      </Typography>
                    </CardContent>
                  </>
                )
            }
          })()}
        </RouteCard>
      </RouteCardContainer>
    </AchievementInformation>
  )
}

export default AchievementJellyfish