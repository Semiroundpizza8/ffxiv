import React from 'react'
import { useTranslation } from 'next-i18next'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import translate from '../translate'
import { Stain, Color } from './ffxiv-chocobo-color'

interface Props {
  stain?: Stain
  color?: Color
  inline?: boolean
  selected?: boolean
  onClick?: () => void
}

const StainButton = ({ stain, color, inline = false, selected = false, onClick }: Props): React.ReactElement => {
  const { i18n } = useTranslation()
  const locale = i18n.language
  const stainColor = (stain !== undefined ? stain.color : color) as any as Color
  const title = stain !== undefined
    ? translate(locale, stain, 'name')
    : `(${String(color?.R)}, ${String(color?.G)}, ${String(color?.B)})`

  return (
    <Tooltip title={title}>
      <Paper component='span' square onClick={onClick} sx={{
        display: 'inline-block',
        width: inline ? '1em' : '2em',
        height: inline ? '1em' : '2em',
        backgroundColor: `rgb(${stainColor.R},${stainColor.G},${stainColor.B})`,
        borderStyle: 'solid',
        borderWidth: selected ? 3 : 1,
        borderColor: selected ? 'primary.light' : '#00000055',
        m: 0.5,
        lineHeight: '100%',
        verticalAlign: inline ? 'text-bottom' : 'middle',
        cursor: onClick === undefined ? undefined : 'pointer'
      }} />
    </Tooltip>
  )
}

export default StainButton
