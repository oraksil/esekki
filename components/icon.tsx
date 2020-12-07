import dynamic from 'next/dynamic'

type Props = {
  name?: string
  svg?: any
  width?: any
  height?: any
  fill?: string
  className?: string
  style?: any
  onClick?: (event: any) => void
}

const Icon = (props: Props) => {
  if (props.name === undefined && props.svg === undefined) {
    throw Error('name or svg must be provided')
  }
  // this is a workaround to import module by variable
  // https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
  const IconFromSvg = props.svg
    ? props.svg
    : dynamic(() => import('../public/assets/icons/' + props.name + '.svg'))

  return (
    <span className={props.className} style={props.style} onClick={props.onClick}>
      <IconFromSvg width={props.width} height={props.height} fill={props.fill} />
    </span>
  )
}

export default Icon
